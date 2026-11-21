// For Validation in contact feedback page (page 6).
(function (global) {
  "use strict";

  function isEmpty(value) {
    return String(value == null ? "" : value).trim() === "";
  }

  function minLength(value, min) {
    return String(value == null ? "" : value).trim().length >= min;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
  }

  global.Validation = {
    isEmpty: isEmpty,
    minLength: minLength,
    isValidEmail: isValidEmail
  };
})(window);