const moviesWrapper = document.querySelector('.movies');
const search__name = document.querySelector(".search__name")

function searchMovies(event) {
    rendorMovies(event.target.value);
    search__name.innerHTML = event.target.value
}

let currentMovies = [];

async function rendorMovies(searchTerm) { 
    moviesWrapper.innerHTML = `<i class="fas fa-spinner movies__loading--spinner"></i>`;
    const response = await fetch(
        `https://omdbapi.com/?s=${searchTerm}&apikey=c5882ffb`);
    const data =  await response.json();
    if (!data.Search || data.Search.length === 0) {
        moviesWrapper.innerHTML = `No movies found. Please try again!`;
        return; 
    }
    displayMovies(data.Search);
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

    if (sortOption === 'aToZ') {
        sortedMovies.sort((a, b) => b.Name - a.Name);
    }
    else if (sortOption === 'ZToA') {
        sortedMovies.sort((a, b) => a.Name - b.Name);
    }

    displayMovies(sortedMovies);
}



