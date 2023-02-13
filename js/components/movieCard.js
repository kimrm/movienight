export default (movie) => `
    <div class="card movie">
        <img class="movie__image" src="${movie.image}" alt="${movie.title}" loading="lazy">
        <span class="rank">#${movie.rank}</span>
        <h2>${movie.title}</h2>
        <p>Rating: <span class="rating">${movie.rating}</span></p>        
        <a class="link" href="details.html?id=${movie.id}">Click to read more</a>
    </div>`;
