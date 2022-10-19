import Book from "./classes/Book.js";
import urlApi from "./config.js";

const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
const title = document.getElementById("title");
const author = document.getElementById("author");
const publishingCompany = document.getElementById("publishing-company");
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

    const titleText = title.value;
    const authorText = author.value;
    const publishingCompanyText = publishingCompany.value;

    if (!titleText || !authorText || !publishingCompanyText) {
        flashMessage.innerHTML = "All form fields has to be filled.";

        flash.style.display = "block";

        setTimeout(() => {
            flash.style.display = "none";
        }, 5000);
    } else {
        const token = localStorage.getItem("token");

        const data = {
            title: titleText,
            author: authorText,
            publishingCompany: publishingCompanyText
        }

        const addBookResponse = await fetch(`${urlApi}/addBook`, {
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