const BaseApi = "https://api.thecatapi.com/v1"


const endPoints = {
    images: {
        getPublicImage: `${BaseApi}/images/search`,
        getPublicImages: `${BaseApi}/images/search?limit=5&page=1`,
        getUploadedImages: `${BaseApi}/images`,
        getImage: (id) => `${BaseApi}/v1/images/${id}`,
        uploadImage: `${BaseApi}/images/upload`
    },
    favorites:{
      getFavorites: `${BaseApi}/favourites`,
      getImageFavorite: `${BaseApi}/favourites`,
      saveImageFavorites: `${BaseApi}/favourites`,
      deleteImageFavorites:(id)=> `${BaseApi}/favourites/${id}`
    }
};

const api = axios.create({
  baseURL: BaseApi,
  headers: {'X-API-KEY': 'live_dwp9lskyr4ziYOJlRjxJrG6MXZAKRmAGziKL0XrL3fjb9a5dH1opr0ZXibwZ1fUI'}
});

/**--------------load random Kittys------------ */

async function loadPictures() {
    const collageRandomContainer = document.querySelector('.collage__random')
    let {data, status} = await api.get(endPoints.images.getPublicImages)

    removeCards(collageRandomContainer)
    let collageRandom = []
    let typeIcon = 'like'
    const error = errorEstatus(status,data)

    if(!error)
      await data.forEach(kitty => {
        collageRandom.push(createCardImage(kitty.url,typeIcon,kitty.id))
      });
    else
      collageRandom.push(createCardImage("./imgs/no-image.png",typeIcon))

    collageRandomContainer.append(...collageRandom)
    newSwiper('.galery')
    await AsignarEventLiked(saveFavorites)
}

/**--------------load Favorites------------ */

async function loadFavorites(){
  const collageFavoritesContainer = document.querySelector('.collage__favorites')
  let {data, status} = await api.get(endPoints.favorites.getFavorites)

  removeCards(collageFavoritesContainer)
  let collageFavorites = []
  let typeIcon = 'dislike'
  const error = errorEstatus(status,data)

  if(!error && data.length){
    await data.forEach(kitty =>{
      collageFavorites.push(createCardImage(kitty.image.url,typeIcon,kitty.id))
    })
  }
  else
    collageFavorites.push(createCardImage("./imgs/no-image.png",typeIcon))
  
  collageFavoritesContainer.append(...collageFavorites)
  await AsignarEventDislike(deleteFavourites)
}
/**-------------- Save Favorites------------ */

async function saveFavorites(id){
    const { data, status } = await api.post(endPoints.favorites.saveImageFavorites, {
        image_id: id,
      });
    
    errorEstatus(status)
    console.log('Save');
    if(!errorEstatus(status,data)){
      loadFavorites()
  }
}

/**-------------- Delete Favorites------------ */

async function deleteFavourites(id) {
  console.log('porque')
  const {data, status} = await api.delete(endPoints.favorites.deleteImageFavorites(id))
  
  if(!errorEstatus(status,data)){
    loadFavorites()
  }
}


/** --------------- Upload Cat---------------*/

async function uploadCat() {
  const form = document.getElementById('uploadForm')
  const formData = new FormData(form);

  console.log(formData.get('file'))
  subiendoImagen(true)
  let {data,status} = await api.post(endPoints.images.uploadImage,formData)
  const error = errorEstatus(status,data)
  subiendoImagen(false)
  

  if(!error)
    saveFavorites(data.id);
}

/**----------------Error status------------- */

function errorEstatus(status,data){

    if (status < 200 || status > 300) {
        console.log("Hubo un error: " + status + data.message);
        return true
      } else {
        console.log('No hay errores bien')
        return false
      }
}


/** -------------------Create Cards---------*/

function createCardImage(url, typeIcon,imageId){
    let icon = 'ri-heart-fill'

    const container = document.createElement('div');
    const image = document.createElement('img');
    const i = document.createElement('i')

    image.src = url;
    image.id = imageId;
    container.classList.add('cat__random');
    container.classList.add('swiper-slide')
    i.classList.add(icon)
    i.classList.add('heart')
    i.classList.add(typeIcon)

    container.append(image, i)
    return container
}

/**-----------delete Cards----------- */
function removeCards(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**-----------NEW SWIPER-------------- */
function newSwiper(className){
    let newSwiper = new Swiper(className,{
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 10,
      loop: 'true',
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  }
  


/** Function Calls */
const functionCalls = async() =>{

    await loadPictures()
    await loadFavorites()
}

functionCalls()
    .then(() => console.log("SUCCESFULY ALL"))
