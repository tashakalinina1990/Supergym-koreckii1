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
