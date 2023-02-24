import HtmlElement from "./htmlElement.js";

// This function is used to create a movie card using method chaining
// ref. https://www.geeksforgeeks.org/method-chaining-in-javascript/
export default function Movie(movie) {
  const moviePosterImage = new HtmlElement("img")
    .setClasses("movie__image")
    .setSrc(movie.image)
    .setAltText(movie.title);
  const rankSpan = new HtmlElement("span")
    .setText(movie.rank)
    .setClasses("rank");
  const movieTitleH2 = new HtmlElement("h2").setText(movie.title);
  const ratingSpan = new HtmlElement("span")
    .setText(movie.rating)
    .setClasses("rating");
  const ratingP = new HtmlElement("p")
    .setText("Rating: ")
    .appendChild(ratingSpan.element);
  const detailsLinkSpan = new HtmlElement("span").setText("Click to read more");
  const detailsLink = new HtmlElement("a")
    .appendChild(detailsLinkSpan.element)
    .setHref(`details.html?id=${movie.id}`)
    .setClasses("link");
  const cardDiv = new HtmlElement("div")
    .setClasses("card", "movie")
    .appendChild(moviePosterImage.element)
    .appendChild(rankSpan.element)
    .appendChild(movieTitleH2.element)
    .appendChild(ratingP.element)
    .appendChild(detailsLink.element);

  return cardDiv.element;
}
