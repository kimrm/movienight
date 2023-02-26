import { options, IMDB_API_URL } from "../config.js";
import { showError, toggleLoader } from "../functions.js";
import movieDetails from "../components/movieDetails.js";

const detailsDivElement = document.querySelector(".movieDetails");

export default function detailsPage(id) {
  // tell screen readers that the list is loading
  detailsDivElement.ariaBusy = true;

  displayMovie(id);
}

export function displayMovie(movieId) {
  fetch(`${IMDB_API_URL}${movieId}`, options)
    .then((response) => response.json())
    .then((data) => handleMovieDetailsData(data))
    .catch((error) => showError(error));
}

export function handleMovieDetailsData(data) {
  document.title = data.title;
  const item = movieDetails(data);
  detailsDivElement.appendChild(item);
  detailsDivElement.classList.toggle("hide");
  toggleLoader();
  detailsDivElement.ariaBusy = false;
}
