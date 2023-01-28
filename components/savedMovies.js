export function saveToList(movie) {
  const favList = localStorage.getItem("favList")
    ? JSON.parse(localStorage.getItem("favList"))
    : [];
  favList.push(movie);
  localStorage.setItem("favList", JSON.stringify(favList));
}
