//Swipers

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
      nextEl: ".button-next1",
      prevEl: ".button-prev1",
      clickable: true,
    },
  });
  
  const swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    spaceBetween: 19,
    navigation: {
      nextEl: ".button-next2",
      prevEl: ".button-prev2",
      clickable: true,
    },
  });
  
//Modal login/signin
  
   const login = document.querySelectorAll(".signin")
   const modal = document.querySelector(".modal")
   const signupbtn = document.querySelector(".signup")
   const loginbtn = document.querySelector(".login")
   const signupBox = document.querySelector(".signup-box")
   const loginBox = document.querySelector(".login-box")
   const form = document.querySelector(".form-section")
   modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
   login.forEach((login) => {
     login.addEventListener("click", () => {
       modal.style.display="block"
       signupbtn.addEventListener("click", ()=> {
         signupBox.style.display = "flex"
         loginBox.style.display= "none"
         signupbtn.style.background= "#C00"
         signupbtn.style.border = "none"
         loginbtn.style.background = "black"
         loginbtn.style.border = "1px solid white"
       })
       loginbtn.addEventListener("click", ()=> {
         signupBox.style.display = "none"
         loginBox.style.display= "flex"
         signupbtn.style.background= "black"
         signupBox.style.border = "1px solid white"
         loginbtn.style.background = "#C00"
         loginbtn.style.border = "none"
       })
       
       document.addEventListener("click", (e) => {
         if (e.target.matches(".close")) {
           console.log("click");
           modal.style.display = "none";
         }
       })
     })
   })
   
   form.addEventListener("submit", (e) => {
     e.preventDefault()
     modal.style.display = "none";
     
   })

//Fetching files

  const apiKey = "api_key=bf3e3d2eedb7630af8db21d12553c7dc";
  const baseUrl = "https://api.themoviedb.org/3";
  const apiUrlLatest =
    baseUrl +
    "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-10-26&sort_by=popularity.desc" +
    "&" +
    apiKey;
  const searchResult = document.querySelector(".search-result");
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const latestWrapper = document.querySelector(".mySwiper1").firstElementChild;
  const popup = document.querySelector(".popup");
  const closePopup = document.querySelector(".close");
  const searchForm = document.querySelector(".searchform");
  const searchBar = document.querySelector("#searchTitle");
  const searchURL = baseUrl + "/search/movie?" + apiKey;
  const searchWrapper = document.querySelector(".mySwiper").firstElementChild;
  const filterWrapper = document.querySelector(".mySwiper2").firstElementChild;
  const labelSearch = document.querySelector(".result-search");
  const genresCategories = document.querySelector(".genres-cat");
  const filterLabel = document.querySelector(".result-filter")
  const genreList = [
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 28,
      name: "Action",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 16,
      name: "Animation",
    },
  ];
  const completeGenreList = [
    {
    id: 28,
    name: "Action"
    },
    {
    id: 12,
    name: "Adventure"
    },
    {
    id: 16,
    name: "Animation"
    },
    {
    id: 35,
    name: "Comedy"
    },
    {
    id: 80,
    name: "Crime"
    },
    {
    id: 99,
    name: "Documentary"
    },
    {
    id: 18,
    name: "Drama"
    },
    {
    id: 10751,
    name: "Family"
    },
    {
    id: 14,
    name: "Fantasy"
    },
    {
    id: 36,
    name: "History"
    },
    {
    id: 27,
    name: "Horror"
    },
    {
    id: 10402,
    name: "Music"
    },
    {
    id: 9648,
    name: "Mystery"
    },
    {
    id: 10749,
    name: "Romance"
    },
    {
    id: 878,
    name: "Science Fiction"
    },
    {
    id: 10770,
    name: "TV Movie"
    },
    {
    id: 53,
    name: "Thriller"
    },
    {
    id: 10752,
    name: "War"
    },
    {
    id: 37,
    name: "Western"
    }
    ]
  // FUNCTIONS
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
  }})
  function getGenreName(ids) {
    const idsNames = []
    ids.forEach((id) => {
      completeGenreList.forEach((genre) => {
        if (id == genre.id) {
          idsNames.push(genre.name)
        }
      })
    })
    return idsNames.join(' / ')
  
  }
  function getYear(date) {
    const dateArray = date.split("-")
    return dateArray[0]
  }
  function getMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        showMovies(data.results);
      });
  }
  function filterMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        showFilteredMovies(data.results);
      });
  }
  function showFilteredMovies(data) {
    filterWrapper.innerHTML = "";
  
    data.forEach((movie) => {
      const { title, poster_path, vote_average, release_date, overview, genre_ids } = movie;
      const movieEL = document.createElement("div");
      movieEL.classList.add("swiper-slide");
      movieEL.innerHTML = `<img src="${imgUrl + poster_path}" alt="${title}">
      <div class="overview">
                                  <h2 class="overTitle">${title}</h2>
                                  <p class="overDate">${getYear(release_date)}</p>
                                  <p class="overGenre">${getGenreName(genre_ids)}</p>
                                  <span><img class="star" src="images/star.png"></span>
                                  <p class="overNote">${vote_average}</p>
                              </div>`;
  
      filterWrapper.appendChild(movieEL);
      movieEL.addEventListener("click", () => {
        popup.style.display = "block";
        popup.innerHTML = `
        <div class="popup-container">
        <span  id="closepopup"><img class="close" src="images/cross-button.svg"></span>
        <div class="popup-content">
            <img id="popupImage" src="${imgUrl + poster_path}" alt="">
            <div class="popupInfo">
                <h2>${title}</h2>
                <p class="year">${getYear(release_date)}</p>
                <p class="note"><img src="images/star.png">${vote_average}</p>
                <p class="genre">${getGenreName(genre_ids)}</p>
                <p class="description">${overview}
                </p>
                
            </div>
        </div>
    </div>
        `;
      });
      document.addEventListener("click", (e) => {
        if (e.target.matches(".close")) {
          popup.style.display = "none";
        }
      });
    });

  }
  function searchMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        showSearchedMovies(data.results);
      });
  }
  function showSearchedMovies(data) {
    searchWrapper.innerHTML = "";
  
    data.forEach((movie) => {
      const { title, poster_path, vote_average, release_date, overview, genre_ids } = movie;
      const movieEL = document.createElement("div");
      movieEL.classList.add("swiper-slide");
      movieEL.innerHTML = `<img src="${imgUrl + poster_path}" alt="${title}">
      <div class="overview">
                                  <h2 class="overTitle">${title}</h2>
                                  <p class="overDate">${getYear(release_date)}</p>
                                  <p class="overGenre">${getGenreName(genre_ids)}</p>
                                  <span><img class="star" src="images/star.png"></span>
                                  <p class="overNote">${vote_average}</p>
                              </div>`;
  
      searchWrapper.appendChild(movieEL);
      movieEL.addEventListener("click", () => {
        popup.style.display = "block";
        popup.innerHTML = `
        <div class="popup-container">
        <span  id="closepopup"><img class="close" src="images/cross-button.svg"></span>
        <div class="popup-content">
            <img id="popupImage" src="${imgUrl + poster_path}" alt="">
            <div class="popupInfo">
                <h2>${title}</h2>
                <p class="year">${getYear(release_date)}</p>
                <p class="note"><img src="images/star.png"">${vote_average}</p>
                <p class="genre">${getGenreName(genre_ids)}</p>
                <p class="description">${overview}
                </p>
                
            </div>
        </div>
    </div>
        `;
      });
      document.addEventListener("click", (e) => {
        if (e.target.matches(".close")) {
          popup.style.display = "none";
        }
      });
    });
    searchResult.style.display = "grid";
  }
  function showMovies(data) {
    latestWrapper.innerHTML = "";
    data.forEach((movie) => {
      const { title, poster_path, vote_average, release_date, overview, genre_ids } = movie;
      const movieEL = document.createElement("div");
      movieEL.classList.add("swiper-slide");
      movieEL.innerHTML = `<img src="${imgUrl + poster_path}" alt="${title}">
      <div class="overview">
                                  <h2 class="overTitle">${title}</h2>
                                  <p class="overDate">${getYear(release_date)}</p>
                                  <p class="overGenre">${getGenreName(genre_ids)}</p>
                                  <span><img class="star" src="images/star.png"></span>
                                  <p class="overNote">${vote_average}</p>
                              </div>`;
      latestWrapper.appendChild(movieEL);
      movieEL.addEventListener("click", () => {
        popup.style.display = "block";
        popup.innerHTML = `
        <div class="popup-container">
        <span  id="closepopup"><img class="close" src="images/cross-button.svg"></span>
        <div class="popup-content">
            <img id="popupImage" src="${imgUrl + poster_path}" alt="">
            <div class="popupInfo">
                <h2>${title}</h2>
                <p class="year">${getYear(release_date)}</p>
                <p class="note"><img src="images/star.png">${vote_average}</p>
                <p class="genre">${getGenreName(genre_ids)}</p>
                <p class="description">${overview}
                </p>
                
            </div>
        </div>
    </div>
        `;
      });
      document.addEventListener("click", (e) => {
        if (e.target.matches(".close")) {
          popup.style.display = "none";
        }
      });
    });
  }
  
  searchResult.style.display = "none";
  getMovies(apiUrlLatest);
  
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const searchTerm = searchBar.value;
    labelSearch.innerHTML = `Results for “${searchTerm}”`;
    if (searchTerm) {
      searchMovies(searchURL + "&query=" + searchTerm);
    }
  });
  
  
  filterMovies(apiUrlLatest + "&with_genres=35")
  
  setGenre();
  function setGenre() {
    genresCategories.innerHTML = "";
    genreList.forEach((genre) => {
      const t = document.createElement("li");
      t.id = genre.id;
      t.innerText = genre.name;
      t.addEventListener("click", () => {
        Array.from(genresCategories.children).forEach((e)=> {
          e.classList.remove("selected")
        });
        t.classList.add("selected")
        filterMovies(apiUrlLatest + "&with_genres=" + encodeURI(t.id))
        filterLabel.innerHTML = `${t.innerText}`
      });
      genresCategories.appendChild(t);
      genresCategories.firstElementChild.classList.add("selected")
    });
  }
  
 