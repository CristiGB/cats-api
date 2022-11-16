const iconsHeart = [...document.querySelectorAll('.dislike')]
const dropZoneElement = document.getElementById("container__input");
const inputElement = document.querySelector('.uploadInput');

/**------------------------------------- */
/**----------------EVENTS-------------- */
/**------------------------------------- */

/**---------chance icon------------- */

console.log(iconsHeart)
iconsHeart.forEach(iconHeart =>{
    iconHeart.addEventListener('mouseenter',(event) => {
        event.target.classList.remove('ri-heart-fill')
        event.target.classList.add('ri-dislike-fill')
    }) 
})
iconsHeart.forEach(iconHeart =>{
    iconHeart.addEventListener('mouseleave',(event) => {
        event.target.classList.remove('ri-dislike-fill')
        event.target.classList.add('ri-heart-fill')
    }) 
})
  

/**----------- Drag File----------- */

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

