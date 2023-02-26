import message from "./components/message.js";

export function setMenuEvents() {
  const hamburgerButton = document.querySelector(".hamburger-button");
  hamburgerButton.addEventListener("click", showMenu);
}

export function showMenu() {
  const menu = document.querySelector("nav");
  const line2 = document.querySelector(".hamburger-line-2");
  const line1 = document.querySelector(".hamburger-line-1");
  const line3 = document.querySelector(".hamburger-line-3");
  line2.classList.toggle("close-line-2");
  line1.classList.toggle("close-line-1");
  line3.classList.toggle("close-line-3");
  menu.classList.toggle("displayed");

  // add or remove a backdrop when the menu is opened/closed
  const documentBody = document.querySelector("body");
  if (document.querySelector(".backdrop")) {
    document.querySelector(".backdrop").remove();
  } else {
    const backdrop = document.createElement("div");
    documentBody.appendChild(backdrop);
    backdrop.classList.add("backdrop");
  }
}

export function toggleLoader() {
  const loader = document.querySelector(".loadingContainer");
  loader.classList.toggle("hide");
}

export function saveToWatchList(movie) {
  let favList = localStorage.getItem("favList")
    ? JSON.parse(localStorage.getItem("favList"))
    : [];
  if (favList.find((favMovie) => favMovie.imdbid === movie.imdbid)) {
    favList = favList.filter((favMovie) => favMovie.imdbid !== movie.imdbid);
  } else {
    favList.push(movie);
  }
  localStorage.setItem("favList", JSON.stringify(favList));
}

export function watchListMovies() {
  const favList = localStorage.getItem("favList")
    ? localStorage.getItem("favList")
    : [];

  return favList.length > 0 ? JSON.parse(favList) : [];
}

export function showError(err) {
  const messageContainer = document.querySelector(".message-container");
  const errorMessage = message(
    "error",
    "An error occurred while calling the API."
  );
  messageContainer.appendChild(errorMessage);
  toggleLoader();
}
