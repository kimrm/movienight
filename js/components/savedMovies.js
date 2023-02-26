export function saveOrRemoveFromList(movie) {
  let ret = true;
  let favList = localStorage.getItem("favList")
    ? JSON.parse(localStorage.getItem("favList"))
    : [];
  if (favList.find((favMovie) => favMovie.imdbid === movie.imdbid)) {
    // removes the movie from the array by filtering out the movie with the same imdbid
    favList = favList.filter((favMovie) => favMovie.imdbid !== movie.imdbid);
    ret = false;
  } else {
    favList.push(movie);
  }
  localStorage.setItem("favList", JSON.stringify(favList));
  return ret;
}

export function favMovies() {
  const favList = localStorage.getItem("favList")
    ? localStorage.getItem("favList")
    : [];

  return favList.length > 0 ? JSON.parse(favList) : [];
}
