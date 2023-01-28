import { options, RAPID_DETAILS_URL } from "./js/config.js";
import movieInformation from "./components/movieInformation.js";
import { saveToList } from "./components/savedMovies.js";

let params = new URLSearchParams(window.location.search);
const query_id = params.get("id");
const hamburgerButton = document.querySelector(".hamburger-button");
hamburgerButton.addEventListener("click", showMenu);
// uriDecode the stringified object to get the object back from the data attribute
// Ref: https://stackoverflow.com/questions/8542746/store-json-object-in-data-attribute-in-html-jquery
const movieDetails = document.querySelector(".movieDetails");
movieDetails.addEventListener("click", (e) => {
  if (e.target.classList.contains("save-button")) {
    const movieObj = JSON.parse(decodeURIComponent(e.target.dataset.movie));
    saveToList(movieObj);
    e.target.children[0].classList.toggle("fa-regular");
    e.target.children[0].classList.toggle("fa-solid");
    e.target.children[1].textContent = "In your list";
  }
});

async function getMovieByListRank(id) {
  return await fetch(`${RAPID_DETAILS_URL}${id}`, options)
    .then((response) => response.json())
    .catch((err) => showError(err));
}

// fix this. make global for both pages
function showError(err) {
  console.log(err);
}

// fix this. make global for both pages
function toggleLoader() {
  const loader = document.querySelector(".loadingContainer");
  loader.classList.toggle("hide");
}

// fix this. make global for both pages
function showMenu() {
  const menu = document.querySelector("nav");
  menu.classList.toggle("displayed");
}

getMovieByListRank(query_id).then((data) => {
  const movieDetails = document.querySelector(".movieDetails");
  const item = document.createElement("div");
  document.title = data.title;
  item.innerHTML = movieInformation(data);
  movieDetails.appendChild(item);
  toggleLoader();
});
