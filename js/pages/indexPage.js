import { options, IMDB_API_URL } from "../config.js";
import { showError, toggleLoader } from "../lib.js";
import movieCard from "../components/movieCard.js";
import { favMovies } from "../components/savedMovies.js";
import HtmlElement from "../components/htmlElement.js";

const moviesUlElement = document.querySelector(".movieList");
const pickRandomMovieButton = document.querySelector("#movieSuggestionButton");
const genreFormSelectElement = document.querySelector("#genreSelect");

export default function indexPage() {
  moviesUlElement.ariaBusy = true;
  placeGenreSelect();
  listMovies();
  const tabSavedList = document.querySelector("#tabSavedList");
  const tabTopList = document.querySelector("#tabTopList");
  tabSavedList.addEventListener("click", (event) => {
    tabSavedList.classList.remove("inactive");
    tabTopList.classList.add("inactive");
    listSavedMovies();
  });
  tabTopList.addEventListener("click", (event) => {
    moviesUlElement.ariaBusy = true;
    tabSavedList.classList.add("inactive");
    tabTopList.classList.remove("inactive");
    listMovies();
  });
  window.addEventListener("resize", function (event) {
    placeGenreSelect();
  });
}

function placeGenreSelect() {
  const genreSelect = document.querySelector(".genre-select-controller");
  const genreSelectContainer = document.querySelector(
    ".controllers-small-screen"
  );
  const controllers = document.querySelector(".controllers");
  if (window.innerWidth < 600) {
    if (!genreSelectContainer.contains(genreSelect)) {
      genreSelectContainer.appendChild(genreSelect);
      genreSelectContainer.classList.add("p-1");
    }
  } else {
    if (!controllers.contains(genreSelect)) {
      controllers.appendChild(genreSelect);
      genreSelectContainer.classList.remove("p-1");
    }
  }
}

function listSavedMovies() {
  moviesUlElement.innerHTML = "";
  favMovies().forEach((movie) => {
    const item = document.createElement("li");
    item.appendChild(movieCard(movie));
    moviesUlElement.appendChild(item);
  });
}

function listMovies() {
  toggleLoader();
  moviesUlElement.innerHTML = "";
  fetch(IMDB_API_URL, options)
    .then((response) => response.json())
    .then((data) => {
      handleMovieListData(data);
    })
    .catch((err) => showError(err));
}

function getRandomMovieSuggestion(data) {
  const selectedGenre = genreFormSelectElement.value;
  const filteredArray =
    selectedGenre === "All"
      ? data
      : data.filter((item) => item.genre.includes(selectedGenre));

  const randomId = Math.floor(Math.random() * filteredArray.length);
  const randomMovie = filteredArray[randomId];

  window.location.href = `/details.html?id=${randomMovie.id}`;
}

function handleMovieListData(data) {
  pickRandomMovieButton.addEventListener("click", () => {
    getRandomMovieSuggestion(data);
  });

  data.forEach((movie) => {
    const item = document.createElement("li");
    item.appendChild(movieCard(movie));
    moviesUlElement.appendChild(item);
  });

  // we will add the genres to this list and use it for the select element
  let genreList = [];

  // construct sorted list of genres to use in the select element
  data.forEach((movie) => {
    // genres is listed on each movie so we need to filter out genres that is
    // already in the list we are building
    const genresToAddToList = movie.genre.filter(
      (genre) => !genreList.includes(genre)
    );
    genreList = genreList.concat(genresToAddToList);
  });
  // sort the list alphabetically
  genreList = genreList.sort();

  genreList.forEach((genre) => {
    const optionElement = new HtmlElement("option")
      .setValue(genre)
      .setText(genre);
    genreFormSelectElement.appendChild(optionElement.element);
  });

  // stops the loader
  toggleLoader();

  moviesUlElement.ariaBusy = false;
}
