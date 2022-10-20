import urlApi from "./config.js";

const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
const author = document.getElementById("author");
const registerButton = document.getElementById("register-button");
const flash = document.querySelector(".flash");
const flashMessage = document.querySelector(".flash-message");

window.onload = async () => {
    const token = localStorage.getItem("token");

    const tokenResponse = await fetch(`${urlApi}/tokenVerify`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (tokenResponse.status === 403) {
        window.location = "./index.html";
    }
}

menuButton.addEventListener("click", () => {
    if (menuButtonFlag === "closed") {
        sideBar.style.display = "block";
        menuButtonFlag = "opened";
    } else {
        sideBar.style.display = "none";
        menuButtonFlag = "closed";
    }
});

registerButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const authorText = author.value;

    if (!authorText) {
        flashMessage.innerHTML = "You need to provide an author name.";

        flash.style.display = "block";

        setTimeout(() => {
            flash.style.display = "none";
        }, 5000);
    } else {
        const token = localStorage.getItem("token");

        const data = {
            author: authorText
        }

        const addAuthorResponse = await fetch(`${urlApi}/addAuthor`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        window.location = e.target.href;
    }
});