/**
 * Name: Angela Liu
 * Date: May 22, 2020
 * Section: CSE 154 AL
 *
 * This is the shoot.js for my various shoot HTML pages. It fetches images for the given shoot
 * from my API and adds them to the page
 */

"use strict";

(function() {
  // any module-globals (limit the use of these when possible)
  window.addEventListener("load", init);
  const URL = "http://localhost:8000/shoot/";

  /**
   * Initializes all functions
   */
  function init() {
    fetchPhotos();
  }

  /**
   * Retrieves images of the given shoot dynamically using AJAX. If something goes wrong with the
   * request, will display an error message on the console.
   */
  function fetchPhotos() {
    let shoot = qs(".photos").id;
    fetch(URL + shoot)
      .then(checkStatus)
      .then(data => data.json())
      .then(processPhotos)
      .catch(console.error);
  }

  /**
   * Adds images of the given shoot to the body of the page.
   * @param {object} data - JSON object for data of photos for given shoot
   */
  function processPhotos(data) {
    for (let i = 0; i < data.length; i++) {
      let section = gen("section");
      let img = gen("img");
      img.src = "img/" + data[i]["src"];
      img.alt = data[i]["cap"];
      let para = gen("p");
      para.textContent = data[i]["title"] + ". " + data[i]["cap"];
      section.appendChild(img);
      section.appendChild(para);
      qs(".photos").appendChild(section);
    }
  }

  /**
   * Creates and returns a new empty DOM node of a type that matches the given element type.
   * @param {string} elType - node type
   * @return {Node} New empty DOM node that matches the given type.
   */
  function gen(elType) {
    return document.createElement(elType);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }

})();