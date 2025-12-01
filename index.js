const moviesWrapper = document.querySelector('.movies');
const search__name = document.querySelector(".search__name")

function searchMovies(event) {
    rendorMovies(event.target.value);
    search__name.innerHTML = event.target.value
}

let currentMovies = [];

async function rendorMovies(searchTerm) { 
    const response = await fetch(
        `https://omdbapi.com/?s=${searchTerm}&apikey=c5882ffb`);
    const data =  await response.json();
    currentMovies = data.Search;
    displayMovies(currentMovies);
}

function displayMovies(movieList) {
    moviesWrapper.innerHTML = movieList
    .slice(0, 6)
    .map((movie) => {
        return `
        <div class="movie">
        <img src="${movie.Poster} alt="" />
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
    </div>
        `;
    }).join('');
}

function sortChange(event) {
    const sortOption = event.target.value;
    
    let sortedMovies = [...currentMovies];

    if (sortOption === 'newest') {
        sortedMovies.sort((a, b) => b.Year - a.Year);
    }
    else if (sortOption === 'oldest') {
        sortedMovies.sort((a, b) => a.Year - b.Year);
    }

    displayMovies(sortedMovies);
}

function displayMovies(searchTerm) {
    return new Promise((resolve) => {
        setTimeout(() => {
           resolve(
            `https://omdbapi.com/?s=${searchTerm}&apikey=c5882ffb`
           );
        }, 1000);
    })
}

let movies;

async function rendorMovies();
    const moviesWrapper = document.querySelector('.movies');

    moviesWrapper.classList += ' movies__loading';

if (!movies) {
    movies = await getMovies ();
}

    moviesWrapper.classList.remove('movies__loading');

