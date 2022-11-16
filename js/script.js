// import hola from "./hola.js";

// hola()

const BaseApi = "https://api.thecatapi.com/v1"


const endPoints = {
    images: {
        getPublicImage: `${BaseApi}/images/search`,
        getPublicImages: `${BaseApi}/images/search?limit=3&page=1`,
        getImage: (id) => `${BaseApi}/v1/images/${id}`,
        uploadImage: `${BaseApi}/images/upload`
    },
    favorites:{
      getFavorites: `${BaseApi}/favourites`
    }
};

const api = axios.create({
  baseURL: BaseApi,
  headers: {'X-API-KEY': 'live_dwp9lskyr4ziYOJlRjxJrG6MXZAKRmAGziKL0XrL3fjb9a5dH1opr0ZXibwZ1fUI'}
});


async function loadPictures() {
    const collageRandomContainer = document.querySelector('.collage__random')
    // let {data, status} = await api.get(endPoints.images.getPublicImages)
    
    let collageRandom = []
    let typeIcon = 'like'

    if(false)
      await data.forEach(kitty => {
        collageRandom.push(createCardImage(kitty.url,typeIcon))
      });
    else
      collageRandom.push(createCardImage("./imgs/no-image.png",typeIcon))

    collageRandomContainer.append(...collageRandom)
    newSwiper('.galery')
}

/**--------------load Favorites------------ */

async function loadFavorites(){
  const collageFavoritesContainer = document.querySelector('.collage__favorites')
  // let {data, status} = await api.get(endPoints.favorites.getFavorites)

  let collageFavorites = []
  let typeIcon = 'dislike'
  
  if(false)
    await data.forEach(kitty =>{
      collageFavorites.push(createCardImage(kitty.url,typeIcon))
    })
  else
    collageFavorites.push(createCardImage("./imgs/no-image.png",typeIcon))
  
  collageFavoritesContainer.append(...collageFavorites)
}

/** --------------- Upload Cat---------------*/

async function uploadCat() {
  const form = document.getElementById('uploadForm')
  const formData = new FormData(form);

  console.log(form)
  // let response = await api.post(endPoints.images.uploadImage,{body: formData})

  // console.log(response.data)
}

/** -------------------Create Cards---------*/

function createCardImage(url, typeIcon){
    let icon = 'ri-heart-fill'
    
    const container = document.createElement('div');
    const image = document.createElement('img');
    const i = document.createElement('i')

    image.src = url;
    container.classList.add('cat__random');
    container.classList.add('swiper-slide')
    i.classList.add(icon)
    i.classList.add('heart')
    i.classList.add(typeIcon)

    container.append(image, i)
    return container
}



/**-----------NEW SWIPER-------------- */
function newSwiper(className){
  let newSwiper = new Swiper(className,{
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 10,
    loop: 'true',
  })
}
/** Function Calls */


loadPictures()
  .then(() => console.log("SUCCESFULY"))

loadFavorites()
  .then(()=> console.log('succesfuly'))

