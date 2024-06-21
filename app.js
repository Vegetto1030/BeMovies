
//SWIPER

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

//Login

const login = document.querySelectorAll(".signin")
const modal = document.querySelector(".modal")
const signupbtn = document.querySelector(".signup")
const loginbtn = document.querySelector(".login")
const signupBox = document.querySelector(".signup-box")
const loginBox = document.querySelector(".login-box")
const form = document.querySelector(".form-section")
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
        });
    loginbtn.addEventListener("click", ()=> {
        signupBox.style.display = "none"
        loginBox.style.display= "flex"
        signupbtn.style.background= "black"
        signupbtn.style.border = "1px solid white"
        loginbtn.style.background = "#C00"
        loginbtn.style.border = "none"
    });
    
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

