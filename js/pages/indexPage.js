import { options, IMDB_API_URL } from "../config.js";
import { showError, toggleLoader } from "../lib.js";
import movieCard from "../components/movieCard.js";
import { favMovies } from "../components/savedMovies.js";

export default function indexPage() {
  placeGenreSelect();
  listMovies();
  const tabSavedList = document.querySelector("#tabSavedList");
  const tabTopList = document.querySelector("#tabTopList");
  tabSavedList.addEventListener("click", (event) => {
    tabSavedList.classList.toggle("inactive");
    tabTopList.classList.toggle("inactive");
    listSavedMovies();
  });
  tabTopList.addEventListener("click", (event) => {
    tabSavedList.classList.toggle("inactive");
    tabTopList.classList.toggle("inactive");
    listMovies();
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

window.addEventListener("resize", function (event) {
  placeGenreSelect();
});

function listSavedMovies() {
  const moviesUlElement = document.querySelector(".movieList");
  moviesUlElement.innerHTML = "";
  favMovies().forEach((movie) => {
    const item = document.createElement("li");
    item.appendChild(movieCard(movie));
    moviesUlElement.appendChild(item);
  });
}

function listMovies() {
  toggleLoader();
  const moviesUlElement = document.querySelector(".movieList");
  moviesUlElement.innerHTML = "";
  fetch(IMDB_API_URL, options)
    .then((response) => response.json())
    .then((data) => {
      handleMovieListData(data);
    })
    .catch((err) => showError(err));
}

function handleMovieListData(data) {
  const pickRandomMovieButton = document.querySelector("#surpriseMeButton");
  const moviesUlElement = document.querySelector(".movieList");
  const genreFormSelectElement = document.querySelector("#genreSelect");
  let genreList = [];

  pickRandomMovieButton.addEventListener("click", () => {
    // make as function?

    const selectedGenre = genreFormSelectElement.value;
    const filteredArray =
      selectedGenre === "All"
        ? data
        : data.filter((item) => item.genre.includes(selectedGenre));

    const randomId = Math.floor(Math.random() * filteredArray.length);
    const randomMovie = filteredArray[randomId];

    window.location.href = `/details.html?id=${randomMovie.id}`;
  });

  // writes out the movies
  data.forEach((movie) => {
    const item = document.createElement("li");
    item.appendChild(movieCard(movie));
    moviesUlElement.appendChild(item);
  });

  // construct sorted list of genres
  data.forEach((movie) => {
    // filter out genres already in the list
    const genresToAddToList = movie.genre.filter(
      (genre) => !genreList.includes(genre)
    );
    genreList = genreList.concat(genresToAddToList);
  });
  genreList = genreList.sort();
  genreList.forEach((genre) => {
    genreFormSelectElement.innerHTML += `<option value="${genre}">${genre}</option>`;
  });

  // stops the loader
  toggleLoader();
}
