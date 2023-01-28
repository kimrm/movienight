export default (movie) => `
    <div class="card movie">
        <span class="rank">#${movie.rank}</span><h2>${movie.title}</h2>
        <p>Rating: <span class="rating">${movie.rating}</span></p>
        <img src="${movie.image}" alt="${movie.title}" loading="lazy">
        <a class="readMore" href="details.html?id=${movie.id}">Read more</a>
    </div>`;
