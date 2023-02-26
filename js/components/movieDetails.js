import { favMovies, saveOrRemoveFromList } from "./savedMovies.js";
import HtmlElement from "./htmlElement.js";

const saveText = "Save to your list";
const addedSaveText = "Added to your list";

// This function is used to create the movie details html using the custom
// htmlElement function/object and method chaining
// ref/inspiration. https://www.geeksforgeeks.org/method-chaining-in-javascript/
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
      ? addedSaveText
      : saveText
  );

  const saveButton = new HtmlElement("button")
    .setClasses("save-button")
    .appendChild(fontAwesomeI.element)
    .appendChild(buttonTextSpan.element)
    .setEventListener("click", (event) => {
      if (saveOrRemoveFromList(movie)) {
        const textSpan = event.target.querySelector("span");
        textSpan.textContent = addedSaveText;
      } else {
        const textSpan = event.target.querySelector("span");
        textSpan.textContent = saveText;
      }
      const fontAwesome = event.target.children[0];
      const buttonText = event.target.children[1];
      fontAwesome.classList.toggle("fa-regular");
      fontAwesome.classList.toggle("fa-solid");
    });

  const movieDescriptionP = new HtmlElement("p")
    .setClasses("movieDescription")
    .setText(movie.description);
  const ratingSpan = new HtmlElement("span")
    .setText(movie.rating)
    .setClasses("rating");
  const ratingP = new HtmlElement("p")
    .setClasses("subtle-text")
    .setText("Rating ")
    .appendChild(ratingSpan.element);
  const yearSpan = new HtmlElement("span")
    .setClasses("regular-text")
    .setText(movie.year);
  const yearP = new HtmlElement("p")
    .setClasses("subtle-text")
    .setText("Year ")
    .appendChild(yearSpan.element);
  const genreSpan = new HtmlElement("span")
    .setClasses("regular-text")
    .setText(movie.genre.join(", "));
  const genreP = new HtmlElement("p")
    .setClasses("subtle-text")
    .setText("Genre ")
    .appendChild(genreSpan.element);
  const directorSpan = new HtmlElement("span")
    .setClasses("regular-text")
    .setText(movie.director.join(", "));
  const directorP = new HtmlElement("p")
    .setClasses("subtle-text")
    .setText("Director ")
    .appendChild(directorSpan.element);
  const writerSpan = new HtmlElement("span")
    .setClasses("regular-text")
    .setText(movie.writers.join(", "));
  const writerP = new HtmlElement("p")
    .setClasses("subtle-text")
    .setText("Writer ")
    .appendChild(writerSpan.element);
  const imbdIdSpan = new HtmlElement("span")
    .setClasses("regular-text")
    .setText(movie.imdbid);
  const imdbIdP = new HtmlElement("p")
    .setClasses("subtle-text")
    .setText("imbdId ")
    .appendChild(imbdIdSpan.element);
  const youtubeIframe = new HtmlElement("iframe")
    .setSrc(movie.trailer)
    .setClasses("youtube");

  moviePropertiesDiv.appendChildren(
    movieH1.element,
    saveButton.element,
    movieDescriptionP.element,
    ratingP.element,
    yearP.element,
    genreP.element,
    directorP.element,
    writerP.element,
    imdbIdP.element
  );

  const movieDetailsDiv = new HtmlElement("div").appendChildren(
    moviePosterImage.element,
    moviePropertiesDiv.element,
    youtubeIframe.element
  );

  return movieDetailsDiv.element;
}
