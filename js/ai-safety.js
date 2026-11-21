(function () {
  "use strict";

  var form = document.getElementById("ai-checklist");
  var summary = document.getElementById("checklist-summary");
  if (!form || !summary) return;

  var boxes = form.querySelectorAll('input[type="checkbox"]');

  function update() {
    var done = form.querySelectorAll('input[type="checkbox"]:checked').length;
    summary.textContent = done + " of " + boxes.length + " steps completed";
    if (done === boxes.length) {
      summary.textContent += " \u2713 Checklist complete";
    }
  }

  form.addEventListener("change", update);
  form.addEventListener("reset", function () {
    setTimeout(update, 0);
  });
  update();
})();