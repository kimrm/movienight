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
  const detailsDivElement = document.querySelector(".movieDetails");
  const item = document.createElement("div");
  document.title = data.title;
  item.innerHTML = movieDetails(data);
  detailsDivElement.appendChild(item);
  toggleLoader();
}

/* uriDecode the stringified object to get the object back from the data attribute
Ref: https://stackoverflow.com/questions/8542746/store-json-object-in-data-attribute-in-html-jquery
using event bubbling up to parent DIV to catch click event 
from button in movieInformation component
*/
export function setSaveButtonClickEvent() {
  const movieDetails = document.querySelector(".movieDetails");
  movieDetails.addEventListener("click", (event) => {
    if (event.target.classList.contains("save-button")) {
      const movieObj = JSON.parse(
        decodeURIComponent(event.target.dataset.movie)
      );
      saveToWatchList(movieObj);
      const fontAwesome = event.target.children[0];
      const buttonText = event.target.children[1];
      fontAwesome.classList.toggle("fa-regular");
      fontAwesome.classList.toggle("fa-solid");
      buttonText.textContent = "In your list";
    }
  });
}
