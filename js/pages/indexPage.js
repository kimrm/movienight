import { options, RAPID_LIST_URL } from "../config.js";
import { showError, toggleLoader } from "../lib.js";
import movieCard from "../components/movieCard.js";

let genres = [];

export default function indexPage() {
  listMovies();
}

function listMovies() {
  fetch(RAPID_LIST_URL, options)
    .then((response) => response.json())
    .then((data) => {
      handleMovieListData(data);
      toggleLoader();
      // use event when data loaded instead?
    })
    .catch((err) => showError(err));
}

function handleMovieListData(data) {
  console.log(data);
  const pickRandomMovieButton = document.querySelector("#surpriseMeButton");
  const genreSelect = document.querySelector("#genreSelect");
  pickRandomMovieButton.onclick = () => {
    const filteredArray = data.filter((item) =>
      item.genre.includes(genreSelect.value)
    );
    const randomId = Math.floor(Math.random() * filteredArray.length);
    const randomMovie = filteredArray[randomId];
    window.location.href = `/details.html?id=${randomMovie.id}`;
  };
  const movieList = document.querySelector(".movieList");
  data.forEach((movie) => {
    const genresArray = movie.genre.filter((genre) => !genres.includes(genre));
    genres = genres.concat(genresArray);
    const item = document.createElement("li");
    item.innerHTML = movieCard(movie);
    movieList.appendChild(item);
  });
  genres = genres.sort();
  genres.forEach((genre) => {
    genreSelect.innerHTML += `<option value="${genre}">${genre}</option>`;
  });
}
