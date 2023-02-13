import { favMovies } from "./savedMovies.js";

export default (movie) => {
  // URI encode the JSON stringified movie object to store it in the data attribute
  // Ref: https://stackoverflow.com/questions/8542746/store-json-object-in-data-attribute-in-html-jquery

  return `
        <img id="poster" class="moviePoster" src="${movie.image}" alt="${
    movie.title
  }">
        <div class="movieProperties">
          <h1>${movie.title}</h1>
          <div>
            <button class="save-button" data-movie="${encodeURIComponent(
              JSON.stringify(movie)
            )}">
              <i class="${
                favMovies().find((favMovie) => favMovie.imdbid === movie.imdbid)
                  ? "fa-solid"
                  : "fa-regular"
              } fa-star"></i> <span>${
    favMovies().find((favMovie) => favMovie.imdbid === movie.imdbid)
      ? "In your list"
      : "Save to list"
  }</span>
            </button>
          </div>
          <p class="movieDescription">${movie.description}</p>
          <p>IMDb rating: <span class="rating">${movie.rating}</span></p>
          <p>Year: ${movie.year}</p>      
          <p>Genre: ${movie.genre.join(", ")}</p>  
          <p>Director: ${movie.director.join(", ")}</p>
          <p>Writer: ${movie.writers.join(", ")}</p>
          <p>imbdId: ${movie.imdbid}</p>
         
        </div> <iframe class="youtube" src="${movie.trailer}">
        </iframe> `;
};
