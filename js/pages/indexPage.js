import { options, IMDB_API_URL } from "../config.js";
import { showError, toggleLoader } from "../lib.js";
import movieCard from "../components/movieCard.js";

export default function indexPage() {
  listMovies();
}

function listMovies() {
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
    item.innerHTML = movieCard(movie);
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
