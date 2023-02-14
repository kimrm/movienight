export function saveToList(movie) {
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

export function favMovies() {
  const favList = localStorage.getItem("favList")
    ? localStorage.getItem("favList")
    : [];

  return favList.length > 0 ? JSON.parse(favList) : [];
}