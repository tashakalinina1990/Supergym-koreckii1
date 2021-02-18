'use strict';
/* global Swiper */
(() => {
  new Swiper(`.trainers__swiper-container`, {
    slidesPerView: 4,
    spaceBetween: -30,
    slidesPerGroup: 40,
    speed: 1000,
    autoHeight: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    navigation: {
      nextEl: `.trainers__button-next`,
      prevEl: `.trainers__button-prev`,
    },
    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: -30,
        slidesPerGroup: 1,
        speed: 500,
      },
      1199: {
        slidesPerView: 2,
        spaceBetween: -30,
        slidesPerGroup: 2,
      }
    }
  });
})();

'use strict';

(() => {
  window.addEventListener(`DOMContentLoaded`, () => {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        const range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd(`character`, pos);
        range.moveStart(`character`, pos);
        range.select();
      }
    }

    function mask(evt) {
      const matrix = `+7 (___) ___-__-__`;
      let m = 0;
      const def = matrix.replace(/\D/g, ``);
      let val = input.value.replace(/\D/g, ``);
      if (def.length >= val.length) {
        val = def;
      }
      input.value = matrix.replace(/./g, function (a) {

        if (/[_\d]/.test(a) && m < val.length) {
          return val.charAt(m++);
        } else if (m >= val.length) {
          return ``;
        } else {
          return a;
        }
      });
      if (evt.type === `blur`) {
        if (input.value.length === 2) {
          input.value = ``;
        }
      } else {
        setCursorPosition(input.value.length, input);
      }
    }
    const input = document.querySelector(`[name="phone"]`);
    if (input) {
      input.addEventListener(`input`, mask, false);
      input.addEventListener(`focus`, mask, false);
      input.addEventListener(`blur`, mask, false);
    }
  });
})();

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

'use strict';

(() => {

  const anchors = document.querySelectorAll(`a[href*=\\#]:not([href=\\#])`);

  for (let anchor of anchors) {
    anchor.addEventListener(`click`, function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute(`href`).substring(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: `smooth`,
        block: `start`
      });
    });
  }

})();

'use strict';

(() => {
  const tabs = document.querySelector(`.tabs`);

  if (tabs) {
    const toggleTabs = (event) => {
      if (String(event.target.className) === `tabs__link`) {
        const dataTab = event.target.getAttribute(`data-tab`);
        const tabH = document.getElementsByClassName(`tabs__link`);
        for (let i = 0; i < tabH.length; i++) {
          tabH[i].classList.remove(`tabs__link--current`);
          tabH[i].removeAttribute(`tabindex`);
        }
        event.target.classList.add(`tabs__link--current`);
        event.target.setAttribute(`tabindex`, `-1`);
        const tabBody = document.getElementsByClassName(`tab-body`);
        for (let j = 0; j < tabBody.length; j++) {
          if (Number(dataTab) === j) {
            tabBody[j].classList.add(`tab-body--current`);
          } else {
            tabBody[j].classList.remove(`tab-body--current`);
          }
        }
      }
    };
    tabs.addEventListener(`click`, toggleTabs);
  }

})();
