const navMenu = document.getElementById('nav__menu'),
      navToggle = document.getElementById('nav__toggle'),
      navClose = document.getElementById('nav__close')


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
  navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
  })
}
/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
  navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
  })
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]') //section con id
    
const scrollActive = () =>{
  //Las propiedades pageXOffset y pageYOffset son iguales a las propiedades scrollx y scrolly.
  //para saber cuanto se ha desplazado en el scroll en pixeles
  	const scrollY = window.pageYOffset

	  sections.forEach(current =>{
		const sectionHeight = current.offsetHeight, //alto del section
			  sectionTop = current.offsetTop - 58,    //el top de cada section
			  sectionId = current.getAttribute('id'), //id de cada section
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']') //los links

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)
