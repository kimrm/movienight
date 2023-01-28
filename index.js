import { options, RAPID_LIST_URL } from "./js/config.js";
import { errorMessage } from "./components/errorMessage.js";
import movieCard from "./components/movieCard.js";

async function getMoviesRank() {
  return await fetch(RAPID_LIST_URL, options)
    .then((response) => response.json())
    .catch((err) => showError(err));
}

function showError(err) {
  const errorContainer = document.querySelector(".error");
  errorContainer.innerHTML = errorMessage(
    "An error occured while calling the API."
  );
  errorContainer.classList.toggle("hide");
  toggleLoader();
}

const hamburgerButton = document.querySelector(".hamburger-button");
hamburgerButton.addEventListener("click", showMenu);

function showMenu() {
  const menu = document.querySelector("nav");
  menu.classList.toggle("displayed");
}

function toggleLoader() {
  const loader = document.querySelector(".loadingContainer");
  loader.classList.toggle("hide");
}

getMoviesRank().then((data) => {
  const movieList = document.querySelector(".movieList");
  data.forEach((movie) => {
    const item = document.createElement("li");
    item.innerHTML = movieCard(movie);
    movieList.appendChild(item);
  });
  toggleLoader();
});
