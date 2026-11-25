(function () {
  "use strict";

  let form = document.getElementById("ai-checklist");
  let summary = document.getElementById("checklist-summary");
  if (!form || !summary) return;

  let boxes = form.querySelectorAll('input[type="checkbox"]');

  function update() {
    let done = form.querySelectorAll('input[type="checkbox"]:checked').length;
    summary.textContent = done + " of " + boxes.length + " steps completed";
    if (done === boxes.length) {
      summary.textContent += " \u2713 Checklist complete";
    }
  }

  form.addEventListener("change", update);
  update();
})();
