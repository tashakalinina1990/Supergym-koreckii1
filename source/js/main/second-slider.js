'use strict';
/* global Swiper */
(() => {
  new Swiper(`.reviews__swiper-container`, {
    navigation: {
      nextEl: `.reviews__button-next`,
      prevEl: `.reviews__button-prev`,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    speed: 500
  });
})();
