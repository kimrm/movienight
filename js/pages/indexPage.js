import { options, RAPID_LIST_URL } from "../config.js";
import { showError, toggleLoader } from "../lib.js";
import movieCard from "../components/movieCard.js";

export default function indexPage() {
  listMovies();
}

function listMovies() {
  fetch(RAPID_LIST_URL, options)
    .then((response) => response.json())
    .then((data) => {
      handleMovieListData(data);
      toggleLoader();
    })
    .catch((err) => showError(err));
}

function handleMovieListData(data) {
  const movieList = document.querySelector(".movieList");
  data.forEach((movie) => {
    const item = document.createElement("li");
    item.innerHTML = movieCard(movie);
    movieList.appendChild(item);
  });
}
