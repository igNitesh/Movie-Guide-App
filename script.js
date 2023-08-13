const searchForm = document.querySelector('form')
const input_box = document.querySelector('.input-box')
const movie_container = document.querySelector('.movie-container')


// Function to fetch movie details using OMDB api
const getMovieInfo = async (movie) =>{
    const MyapiKey = "********";
    
    try {
    const url = `http://www.omdbapi.com/?apikey=${MyapiKey}&t=${movie}`;
    const response = await fetch(url);
    
    if(!response.ok){
        throw new Error("Unable to fetch movie data");
    }
    const data = await response.json();

    showMovieData(data);
    } catch (error) {
        showErrorMessage("No movie found!!! ");
    }
    
    
}

// Function to show movie data on screen
const showMovieData = (data) => {

    movie_container.innerHTML = "";
    movie_container.classList.remove('noBG');

    // Use Destructuring assignment to extract properties from data object.
    const {Title, imdbRating , Genre, Released, Runtime, Actors, Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movieInfo');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;


    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerHTML = element;
        movieGenreElement.appendChild(p);
        
    });
    movieElement.appendChild(movieGenreElement);
   

    movieElement.innerHTML += `<p><strong>Released: </strong>${Released}</p>
                              <p><strong>Duration:</strong>${Runtime}</p>
                              <p><strong>Cast:</strong>${Actors}</p>
                              <p><strong>Plot:</strong>${Plot}</p>
                              `;


    // Creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML =`<img src="${Poster}"/>`;

    movie_container.appendChild(moviePosterElement);
    movie_container.appendChild(movieElement);
   
}
// Function to display error message
const showErrorMessage = (message) => {
    movie_container.innerHTML = `<h2>${message}</h2>`;
    movie_container.classList.add('noBG');
}
// Adding event listener to search form
searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const movie_name = input_box.value.trim();
    if(movie_name != ''){
        showErrorMessage("Fetching Movie Information....")
        getMovieInfo(movie_name);
    }else{
        showErrorMessage("Enter movie name to get movie information");
    }
})
