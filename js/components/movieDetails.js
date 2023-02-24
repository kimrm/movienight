import { favMovies } from "./savedMovies.js";
import HtmlElement from "./htmlElement.js";

// This function is used to create the movie details html using method chaining
// ref. https://www.geeksforgeeks.org/method-chaining-in-javascript/
export default function Movie(movie) {
  const moviePosterImage = new HtmlElement("img")
    .setClasses("moviePoster")
    .setSrc(movie.image)
    .setAltText(movie.title);
  const moviePropertiesDiv = new HtmlElement("div").setClasses(
    "movieProperties"
  );
  const movieH1 = new HtmlElement("h1").setText(movie.title);
  const fontAwesomeI = new HtmlElement("i").setClasses(
    favMovies().find((favMovie) => favMovie.imdbid === movie.imdbid)
      ? "fa-solid"
      : "fa-regular",
    "fa-star"
  );
  const buttonTextSpan = new HtmlElement("span").setText(
    favMovies().find((favMovie) => favMovie.imdbid === movie.imdbid)
      ? "In your list"
      : "Save to your list"
  );
  /* uriDecode the stringified movie object to get the object back from the data attribute
  Ref: https://stackoverflow.com/questions/8542746/store-json-object-in-data-attribute-in-html-jquery
  */
  const saveButton = new HtmlElement("button")
    .setClasses("save-button")
    .appendChild(fontAwesomeI.element)
    .appendChild(buttonTextSpan.element)
    .setDataset("movie", encodeURIComponent(JSON.stringify(movie))) // maybe dont need this anymore?
    .setEventListener("click", (event) => {
      const movieObj = JSON.parse(
        decodeURIComponent(event.target.dataset.movie)
      );
      saveToWatchList(movieObj);
      const fontAwesome = event.target.children[0];
      const buttonText = event.target.children[1];
      fontAwesome.classList.toggle("fa-regular");
      fontAwesome.classList.toggle("fa-solid");
      buttonText.textContent = "In your list";
    });

  const movieDescriptionP = new HtmlElement("p")
    .setClasses("movieDescription")
    .setText(movie.description);
  const ratingSpan = new HtmlElement("span")
    .setText(movie.rating)
    .setClasses("rating");
  const ratingP = new HtmlElement("p")
    .setText("IMDb rating: ")
    .appendChild(ratingSpan.element);
  const yearP = new HtmlElement("p").setText(`Year: ${movie.year}`);
  const genreP = new HtmlElement("p")
    .setClasses("movieDescription")
    .setText(`Genre: ${movie.genre.join(", ")}`);
  const directorP = new HtmlElement("p")
    .setClasses("movieDescription")
    .setText(`Director: ${movie.director.join(", ")}`);
  const writerP = new HtmlElement("p")
    .setClasses("movieDescription")
    .setText(`Writer: ${movie.writers.join(", ")}`);
  const imdbIdP = new HtmlElement("p").setText(`imbdId: ${movie.imdbid}`);
  const youtubeIframe = new HtmlElement("iframe")
    .setSrc(movie.trailer)
    .setClasses("youtube");

  moviePropertiesDiv
    .appendChild(movieH1.element)
    .appendChild(saveButton.element)
    .appendChild(movieDescriptionP.element)
    .appendChild(ratingP.element)
    .appendChild(yearP.element)
    .appendChild(genreP.element)
    .appendChild(directorP.element)
    .appendChild(writerP.element)
    .appendChild(imdbIdP.element);

  const movieDetailsDiv = new HtmlElement("div")
    .appendChild(moviePosterImage.element)
    .appendChild(moviePropertiesDiv.element)
    .appendChild(youtubeIframe.element);

  return movieDetailsDiv.element;
}
