// Swiper Initialization
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 19,
    navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
        clickable: true,
    },
});

const swiper1 = new Swiper(".mySwiper1", {
    slidesPerView: 4,
    spaceBetween: 19,
    navigation: {
        nextEl: ".button-nextL",
        prevEl: ".button-prevL",
        clickable: true,
    },
});

const swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    spaceBetween: 19,
    navigation: {
        nextEl: ".button-nextG",
        prevEl: ".button-prevG",
        clickable: true,
    },
});

// Login Modal Handling
const login = document.querySelectorAll(".signin");
const modal = document.querySelector(".modal");
const signupbtn = document.querySelector(".signup");
const loginbtn = document.querySelector(".login");
const signupBox = document.querySelector(".signup-box");
const loginBox = document.querySelector(".login-box");
const form = document.querySelector(".form-section");

login.forEach((login) => {
    login.addEventListener("click", () => {
        modal.style.display = "block";

        signupbtn.addEventListener("click", () => {
            signupBox.style.display = "flex";
            loginBox.style.display = "none";
            signupbtn.style.background = "#C00";
            signupbtn.style.border = "none";
            loginbtn.style.background = "black";
            loginbtn.style.border = "1px solid white";
        });

        loginbtn.addEventListener("click", () => {
            signupBox.style.display = "none";
            loginBox.style.display = "flex";
            signupbtn.style.background = "black";
            signupbtn.style.border = "1px solid white";
            loginbtn.style.background = "#C00";
            loginbtn.style.border = "none";
        });
    });
});

// Close Modal Functionality
document.addEventListener("click", (e) => {
    if (e.target.matches(".close") || e.target === modal) {
        modal.style.display = "none";
    }
});

// Form Submission Handling
form.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "none";
});

// Movie API Configuration
const apiKey = "api_key=bf3e3d2eedb7630af8db21d12553c7dc";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";

// URLs for API Requests
const apiUrlLatest = `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-10-26&sort_by=popularity.desc&${apiKey}`;
const searchURL = `${baseUrl}/search/movie?${apiKey}`;

// DOM Elements
const searchResult = document.querySelector(".search-result");
const latestWrapper = document.querySelector(".mySwiper1").firstElementChild;
const searchWrapper = document.querySelector(".mySwiper").firstElementChild;
const filterWrapper = document.querySelector(".mySwiper2").firstElementChild;
const popup = document.querySelector(".popup");
const searchBar = document.querySelector("#searchTitle");
const searchForm = document.querySelector(".searchform");
const labelSearch = document.querySelector(".result-search");
const genresCategories = document.querySelector(".genres-cat");
const filterLabel = document.querySelector(".result-filter");

// Genre Data
const genreList = [
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 28, name: "Action" },
    { id: 10749, name: "Romance" },
    { id: 14, name: "Fantasy" },
    { id: 16, name: "Animation" },
];

const completeGenreList = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
];

// Function to get genre names from genre ids
function getGenreName(ids) {
    const genreNames = ids.map(id => {
        const genre = completeGenreList.find(genre => genre.id === id);
        return genre ? genre.name : '';
    });
    return genreNames.join(' / ');
}

// Function to extract year from release date
function getYear(date) {
    return (new Date(date)).getFullYear().toString();
}

// Function to fetch and display movies
function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => showMovies(data.results))
        .catch(error => console.error('Error fetching movies:', error));
}

// Function to fetch and display filtered movies
function filterMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => showFilteredMovies(data.results))
        .catch(error => console.error('Error fetching filtered movies:', error));
}

// Function to display filtered movies in the swiper
function showFilteredMovies(data) {
    filterWrapper.innerHTML = "";
    data.forEach(movie => {
        const { title, poster_path, vote_average, release_date, genre_ids } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("swiper-slide");
        movieEl.innerHTML = `
            <img src="${imgUrl + poster_path}" alt="${title}">
            <div class="overview">
                <h2 class="overTitle">${title}</h2>
                <p class="overDate">${getYear(release_date)}</p>
                <p class="overGenre">${getGenreName(genre_ids)}</p>
                <span><img class="star" src="images/star.png" alt=""></span>
                <p class="overNote">${vote_average}</p>
            </div>`;
        
        filterWrapper.appendChild(movieEl);

        movieEl.addEventListener("click", () => {
            popup.style.display = "block";
            popup.innerHTML = `
                <div class="popup-container">
                    <span id="closepopup"><img class="close" src="images/cross-button.svg" alt="close cross"></span>
                    <div class="popup-content">
                        <img id="popupImage" src="${imgUrl + poster_path}" alt="">
                        <div class="popupInfo">
                            <h2>${title}</h2>
                            <p class="year">${getYear(release_date)}</p>
                            <p class="note"><img src="images/star.png" alt="star">${vote_average}</p>
                            <p class="genre">${getGenreName(genre_ids)}</p>
                            <p class="description">${overview}</p>
                        </div>
                    </div>
                </div>`;
        });
    });
}

// Function to search movies
function searchMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => showSearchedMovies(data.results))
        .catch(error => console.error('Error searching movies:', error));
}

// Function to display searched movies in the swiper
function showSearchedMovies(data) {
    searchWrapper.innerHTML = "";
    data.forEach(movie => {
        const { title, poster_path, vote_average, release_date, genre_ids } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("swiper-slide");
        movieEl.innerHTML = `
            <img src="${imgUrl + poster_path}" alt="${title}">
            <div class="overview">
                <h2 class="overTitle">${title}</h2>
                <p class="overDate">${getYear(release_date)}</p>
                <p class="overGenre">${getGenreName(genre_ids)}</p>
                <span><img class="star" src="images/star.png" alt=""></span>
                <p class="overNote">${vote_average}</p>
            </div>`;
        
        searchWrapper.appendChild(movieEl);

        movieEl.addEventListener("click", () => {
            popup.style.display = "block";
            popup.innerHTML = `
                <div class="popup-container">
                    <span id="closepopup"><img class="close" src="images/cross-button.svg" alt="close cross"></span>
                    <div class="popup-content">
                        <img id="popupImage" src="${imgUrl + poster_path}" alt="">
                        <div class="popupInfo">
                            <h2>${title}</h2>
                            <p class="year">${getYear(release_date)}</p>
                            <p class="note"><img src="images/star.png" alt="star">${vote_average}</p>
                            <p class="genre">${getGenreName(genre_ids)}</p>
                            <p class="description">${overview}</p>
                        </div>
                    </div>
                </div>`;
        });
    });
    searchResult.style.display = "grid";
}

// Function to display movies in the swiper
function showMovies(data) {
    latestWrapper.innerHTML = "";
    data.forEach(movie => {
        const { title, poster_path, vote_average, release_date, genre_ids } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("swiper-slide");
        movieEl.innerHTML = `
            <img src="${imgUrl + poster_path}" alt="${title}">
            <div class="overview">
                <h2 class="overTitle">${title}</h2>
                <p class="overDate">${getYear(release_date)}</p>
                <p class="overGenre">${getGenreName(genre_ids)}</p>
                <span><img class="star" src="images/star.png" alt=""></span>
                <p class="overNote">${vote_average}</p>
            </div>`;
        
        latestWrapper.appendChild(movieEl);

        movieEl.addEventListener("click", () => {
            popup.style.display = "block";
            popup.innerHTML = `
                <div class="popup-container">
                    <span id="closepopup"><img class="close" src="images/cross-button.svg" alt="close cross"></span>
                    <div class="popup-content">
                        <img id="popupImage" src="${imgUrl + poster_path}" alt="">
                        <div class="popupInfo">
                            <h2>${title}</h2>
                            <p class="year">${getYear(release_date)}</p>
                            <p class="note"><img src="images/star.png" alt="star">${vote_average}</p>
                            <p class="genre">${getGenreName(genre_ids)}</p>
                            <p class="description">${overview}</p>
                        </div>
                    </div>
                </div>`;
        });
    });
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    // Display latest movies on initial load
    getMovies(apiUrlLatest);

    // Display genres filter
    setGenre();
});

// Function to set genre categories
function setGenre() {
    genresCategories.innerHTML = "";
    genreList.forEach(genre => {
        const genreItem = document.createElement("li");
        genreItem.id = genre.id;
        genreItem.textContent = genre.name;
        genreItem.addEventListener("click", () => {
            Array.from(genresCategories.children).forEach(element => {
                element.classList.remove("selected");
            });
            genreItem.classList.add("selected");
            filterMovies(`${apiUrlLatest}&with_genres=${genreItem.id}`);
            filterLabel.innerHTML = genreItem.innerText;
        });
        genresCategories.appendChild(genreItem);
        genresCategories.firstElementChild.classList.add("selected");
    });
}

// Search Form Submission
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchBar.value.trim();
    if (searchTerm) {
        labelSearch.innerHTML = `Results for "${searchTerm}"`;
        searchMovies(`${searchURL}&query=${searchTerm}`);
    } else {
        alert("Please enter a search term.");
    }
});

// Close Popup Functionality
popup.addEventListener("click", (e) => {
    if (e.target.matches(".close") || e.target.closest("#closepopup")) {
        popup.style.display = "none";
    }
});
