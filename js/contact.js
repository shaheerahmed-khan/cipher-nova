(function () {
  "use strict";

  var form = document.getElementById("feedback-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var hint = document.getElementById("message-hint");
  var V = window.Validation;
  var MIN_MESSAGE = 20;

  // Do not allow the form to submit if the validation helper is missing.
  if (!V) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.dataset.state = "error";
      status.textContent = "Error: Validation is unavailable. Please reload the page.";
      status.focus();
    });
    return;
  }

  var rules = {
    fullName: function (el) {
      if (V.isEmpty(el.value)) return "Full name is required.";
      if (!V.minLength(el.value, 2)) return "Full name must be at least 2 characters.";
      return "";
    },

    email: function (el) {
      if (V.isEmpty(el.value)) return "Email is required.";
      if (!V.isValidEmail(el.value)) return "Enter a valid email, for example name@example.com.";
      return "";
    },

    category: function (el) {
      return V.isEmpty(el.value) ? "Please choose a feedback category." : "";
    },

    subject: function (el) {
      if (V.isEmpty(el.value)) return "Subject is required.";
      if (!V.minLength(el.value, 3)) return "Subject must be at least 3 characters.";
      return "";
    },

    message: function (el) {
      var length = el.value.trim().length;

      if (length === 0) return "Message is required.";
      if (length < MIN_MESSAGE) {
        return "Message needs " + (MIN_MESSAGE - length) + " more character(s).";
      }

      return "";
    },

    consent: function (el) {
      return el.checked ? "" : "You must tick the consent box to continue.";
    }
  };

  var names = Object.keys(rules);

  function field(name) {
    return document.getElementById(name);
  }

  function validateField(name) {
    var element = field(name);
    var error = rules[name](element);
    var errorOutput = document.getElementById(name + "-error");

    errorOutput.textContent = error ? "Error: " + error : "";
    element.setAttribute("aria-invalid", error ? "true" : "false");

    return error === "";
  }

  function updateHint() {
    var length = field("message").value.trim().length;

    hint.textContent = length >= MIN_MESSAGE
      ? length + " characters ✓"
      : length + " / " + MIN_MESSAGE + " characters minimum";
  }

  function clearFields() {
    names.forEach(function (name) {
      field(name).removeAttribute("aria-invalid");
      document.getElementById(name + "-error").textContent = "";
    });
  }

  // Validate when a field is left, then update it as the user edits.
  names.forEach(function (name) {
    var element = field(name);
    var liveEvent = element.type === "checkbox" || element.tagName === "SELECT"
      ? "change"
      : "input";

    element.addEventListener("blur", function () {
      validateField(name);
    });

    element.addEventListener(liveEvent, function () {
      if (element.hasAttribute("aria-invalid")) {
        validateField(name);
      }
    });
  });

  field("message").addEventListener("input", updateHint);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    status.textContent = "";
    status.removeAttribute("data-state");

    var firstInvalid = null;
    var invalidCount = 0;

    names.forEach(function (name) {
      if (!validateField(name)) {
        invalidCount++;

        if (!firstInvalid) {
          firstInvalid = field(name);
        }
      }
    });

    if (invalidCount > 0) {
      status.dataset.state = "error";
      status.textContent = "Error: Please fix " + invalidCount + " field(s) below.";
      firstInvalid.focus();
      return;
    }

    status.dataset.state = "success";
    status.textContent = "Your feedback passed local validation. No message has been sent or stored.";
    status.focus();

    form.reset();
    clearFields();
    updateHint();
  });
})();