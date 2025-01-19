var swiperjourney = new Swiper(".swiperjourney", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiperportfolio = new Swiper(".swiperportfolio", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".swipermyblog", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".swiperaboutme", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var scroll = window.requestAnimationFrame ||
function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.show-scroll'); 
var lineToAnima = document.querySelectorAll('.card__line');
var imageToAnima = document.querySelectorAll('.card__image');
var contentToAnima = document.querySelectorAll('.card__content');
function loop() {

  Array.prototype.forEach.call(elementsToShow, function(element){
    if (isElementInViewport(element)) {
      element.classList.add('scroll-visible');
    } else {
      element.classList.remove('scroll-visible');
    }
  });

  Array.prototype.forEach.call(lineToAnima, function(element){
    if (isElementInViewport(element)) {
      element.classList.add('card__line__anima');
    } else {
      element.classList.remove('card__line__anima');
    }
  });

  Array.prototype.forEach.call(imageToAnima, function(element){
    if (isElementInViewport(element)) {
      element.classList.add('card__image__anima');
    } else {
      element.classList.remove('card__image__anima');
    }
  });

  Array.prototype.forEach.call(contentToAnima, function(element){
    if (isElementInViewport(element)) {
      element.classList.add('card__content__anima');
    } else {
      element.classList.remove('card__content__anima');
    }
  });

  scroll(loop);
}
loop();

function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
}