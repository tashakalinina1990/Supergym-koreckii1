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
