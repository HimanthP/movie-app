const KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
// For educational purposes only - DO NOT USE in production
// Request your own key for free: https://developers.themoviedb.org/3
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getClassByRate = (vote) => {
  if (vote >= 7.5) return "green";
  else if (vote >= 7) return "orange";
  else return "red";
};

const showMovies = (movies) => {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
    <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
  `;
    main.appendChild(movieElement);
  });
};

const getMovies = async (url) => {
  main.innerHTML = "<h2>Loading...</h2>";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      main.innerHTML = "<h2>No results found</h2>";
      return;
    }

    showMovies(data.results);
  } catch (error) {
    main.innerHTML = "<h2>Something went wrong</h2>";
  }
};

getMovies(API_URL);

let timeout = null;

search.addEventListener("input", (e) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const searchTerm = e.target.value;

    if (searchTerm && searchTerm !== "") {
      getMovies(SEARCH_API + searchTerm);
    } else {
      getMovies(API_URL);
    }
  }, 500);
});
