"use strict";

(function() {
  // any module-globals (limit the use of these when possible)
  window.addEventListener("load", init);

  /**
   * Initializes all functions
   */
  function init() {
    id("all-photos-text").addEventListener("mouseover", function() {
      id("all-photos-banner").classList.add("hover");
    });
    id("all-photos-text").addEventListener("mouseout", function() {
      id("all-photos-banner").classList.remove("hover");
    });
    hover();
  }

  /**
   * Adds hover class to all the shoot banners when mousing over and removes when mouse is out.
   */
  function hover() {
    let shoots = qsa("#shoots img");

    for (let i = 0; i < shoots.length; i++) {
      shoots[i].addEventListener("mouseover", function() {
        shoots[i].classList.add("hover");
      });
      shoots[i].addEventListener("mouseout", function() {
        shoots[i].classList.remove("hover");
      });
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

})();