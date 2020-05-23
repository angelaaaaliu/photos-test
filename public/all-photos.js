/**
 * Name: Angela Liu
 * Date: May 22, 2020
 * Section: CSE 154 AL
 *
 * This is the all-photos.js page for my all-photos.html page. It fetches all images from my
 * API and adds them to the page
 */

"use strict";

(function() {
  // any module-globals (limit the use of these when possible)

  const URL = "http://localhost:8000/allimages";

  window.addEventListener("load", init);

  /**
   * Initializes all functions.
   */
  function init() {
    fetchPhotos();
  }

  /**
   * Retrieves all images dynamically using AJAX. If something goes wrong with the
   * request, will display an error message on the console.
   */
  function fetchPhotos() {
    fetch(URL)
      .then(checkStatus)
      .then(data => data.json())
      .then(processPhotos)
      .catch(console.error);
  }

  /**
   * Adds all images to the body of the page.
   * @param {object} data - JSON object containing data on all images
   */
  function processPhotos(data) {
    for (let i = 0; i < data.length; i++) {
      let section = gen("section");
      let img = gen("img");
      img.src = "img/" + data[i]["src"];
      img.alt = data[i]["cap"];
      section.appendChild(img);
      id("photos").appendChild(img);
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
   * Creates and returns a new empty DOM node of a type that matches the given element type.
   * @param {string} elType - node type
   * @return {Node} New empty DOM node that matches the given type.
   */
  function gen(elType) {
    return document.createElement(elType);
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