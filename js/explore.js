// grabs the elements we need from the page
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll("#topicGrid .card");
const noResults = document.getElementById("noResults");
const resetButton = document.getElementById("resetFiltersBtn");

// tells which category is selected right now
let selectedCategory = "all";

// shows or hides each card
function filterCards() {
  const searchText = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach(function (card) {
    const category = card.dataset.category;
    const cardText = (
      card.textContent +
      " " +
      card.dataset.keywords
    ).toLowerCase();

    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;
    const matchesSearch = cardText.includes(searchText);

    if (matchesCategory && matchesSearch) {
      card.hidden = false;
      visibleCount++;
    } else {
      card.hidden = true;
    }
  });

  // this means no topics match the description
  noResults.hidden = visibleCount > 0;
}

//this checks if one button is highlighted the rest become non highlighted
function setActiveButton(activeButton) {
  filterButtons.forEach(function (button) {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
  });
  activeButton.classList.add("active");
  activeButton.setAttribute("aria-pressed", "true");
}

// this filters and checks using the filterCards function
searchInput.addEventListener("input", filterCards);

// this just activates or dis activates a button based on whatever the user clicked
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedCategory = button.dataset.category;
    setActiveButton(button);
    filterCards();
  });
});

// this resets all the filters
resetButton.addEventListener("click", function () {
  searchInput.value = "";
  selectedCategory = "all";
  setActiveButton(filterButtons[0]);
  filterCards();
  searchInput.focus();
});
