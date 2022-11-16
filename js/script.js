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
    let {data, status} = await api.get(endPoints.images.getPublicImages)
    let collageRandom = []

    if(data)
      await data.forEach(kitty => {
        collageRandom.push(createCardImage(kitty.url,'ri-heart-fill'))
      });
    else
      collageRandom.push(createCardImage("",'ri-heart-fill'))

    collageRandomContainer.append(...collageRandom)
    newSwiper('.galery')
}

/**--------------load Favorites------------ */

async function loadFavorites(){
  const collageFavoritesContainer = document.querySelector('.collage__favorites')
  let {data, status} = await api.get(endPoints.favorites.getFavorites)
  let collageFavorites = []
  
  if(data.length)
    await data.forEach(kitty =>{
      collageFavorites.push(createCardImage(kitty.url,'ri-dislike-fill'))
    })
  else
    collageFavorites.push(createCardImage("./imgs/no-image.png",'ri-dislike-fill'))
  
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

function createCardImage(url, icon){
    const container = document.createElement('div');
    const image = document.createElement('img');
    const i = document.createElement('i')

    image.src = url;
    container.classList.add('cat__random');
    container.classList.add('swiper-slide')
    i.classList.add(icon)
    i.classList.add('heart')

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

/**----------- Drag File----------- */

const dropZoneElement = document.getElementById("container__input");
const inputElement = document.querySelector('.uploadInput');

dropZoneElement.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
}, false);

dropZoneElement.addEventListener("dragenter", (event) => {
  // highlight potential drop target when the draggable element enters it
  if (event.target.classList.contains("container__input")) {
    event.target.classList.add("dragover");
  }
});

//reset background of potential drop target when the draggable element leaves it
["dragleave", "dragend"].forEach((type) => {
  dropZoneElement.addEventListener(type, (event) => {
    dropZoneElement.classList.remove("dragover");
  });
});

dropZoneElement.addEventListener("drop", (event) => {
  event.preventDefault();

  if (event.dataTransfer.files.length) {
    inputElement.files = event.dataTransfer.files; // at position 0 is the file
    updateThumbnail(dropZoneElement, inputElement.files[0])
  }

  dropZoneElement.classList.remove("dragover");
});

// Show miniature

async function updateThumbnail(dropZone, file){
  
  let thumbnailElement = dropZone.querySelector(".zone__thumb");
  // First time - remove titles
  if (dropZone.querySelector(".zone__prompt")) {
    console.log('nooo')
    dropZone.querySelector(".zone__prompt").remove();
  }
  // there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("zone__thumb");
    dropZone.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  //all containers ready

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    console.log(reader)
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }

}


loadPictures()
  .then(() => console.log("SUCCESFULY"))

loadFavorites()
  .then(()=> console.log('succesfuly'))

