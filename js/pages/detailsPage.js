import { options, IMDB_API_URL } from "../config.js";
import { showError, toggleLoader } from "../lib.js";
import movieDetails from "../components/movieDetails.js";

export default function detailsPage(id) {
  displayMovie(id);
  setSaveButtonClickEvent();
}

export function displayMovie(movieId) {
  fetch(`${IMDB_API_URL}${movieId}`, options)
    .then((response) => response.json())
    .then((data) => handleMovieDetailsData(data))
    .catch((error) => showError(error));
}

export function handleMovieDetailsData(data) {
  document.title = data.title;
  const detailsDivElement = document.querySelector(".movieDetails");
  const item = movieDetails(data);
  detailsDivElement.appendChild(item);
  toggleLoader();
}
