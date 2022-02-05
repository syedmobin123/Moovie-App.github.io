const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMAGEPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getmovie(APIURL);

async function getmovie(URL) {
  const resp = await fetch(URL);
  const respData = await resp.json();

  console.log(respData);
  showMovies(respData.results);
}

function showMovies(movies) {
  // clear main
  main.innerHTML = "";

  movies.forEach(movie => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img
                src="${IMAGEPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getclassByrate(vote_average )}">${vote_average}</span> </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

    main.appendChild(movieEl);
  });
}

function getclassByrate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote > +5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", e => {
  e.preventDefault();
  const searchterm = search.value;

  if (searchterm) {
    getmovie(SEARCHAPI + searchterm);
    search.value = "";
  }
});
