import Book from "./classes/Book.js";
import urlApi from "./config.js";

const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
const title = document.getElementById("title");
const author = document.getElementById("author");
const publishingCompany = document.getElementById("publishing-company");
const editOptions = document.querySelector(".edit-options");
const confirmCancelOptions = document.querySelector(".confirm-cancel-options");
const editButton = document.getElementById("edit-button");
const cancelButton = document.getElementById("cancel-button");
const confirmButton = document.getElementById("confirm-button");
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
    } else if (tokenResponse.status === 200) {
        const searchString = window.location.search;

        const urlParams = new URLSearchParams(searchString);

        if (urlParams.has("id")) {
            const data = {
                "id": urlParams.get("id")
            }

            const bookResponse = await fetch(`${urlApi}/getBook`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (bookResponse.status === 200) {
                const jsonResponse = await bookResponse.json();

                const currentBook = new Book(jsonResponse.id, jsonResponse.title, jsonResponse.authorName, jsonResponse.publishingCompanyName);

                title.value = currentBook.title;
                author.value = currentBook.authorName;
                publishingCompany.value = currentBook.publishingCompanyName;

            } else if (bookResponse.status === 500) {
                window.location = "./books.html";
            }
        } else {
            window.location = "./books.html";
        }
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

editButton.addEventListener("click", () => {
    title.style.pointerEvents = "auto";
    author.style.pointerEvents = "auto";
    publishingCompany.style.pointerEvents = "auto";

    title.readOnly = false;
    author.readOnly = false;
    publishingCompany.readOnly = false;

    editOptions.style.display = "none";
    confirmCancelOptions.style.display = "flex";
});

cancelButton.addEventListener("click", () => {
    title.style.pointerEvents = "none";
    author.style.pointerEvents = "none";
    publishingCompany.style.pointerEvents = "none";

    title.readOnly = true;
    author.readOnly = true;
    publishingCompany.readOnly = true;

    confirmCancelOptions.style.display = "none";
    editOptions.style.display = "block";
});

confirmButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const titleText = title.value;
    const authorText = author.value;
    const publishingCompanyText = publishingCompany.value;

    if (!titleText || !authorText || !publishingCompanyText) {
        console.log("entrou aqui");

        flashMessage.innerHTML = "The form is incompleted, please fill the entire form.";

        flash.style.display = "block";

        setTimeout(() => {
            flash.style.display = "none";
        }, 5000);
    } else {
        const searchString = window.location.search;

        const urlParams = new URLSearchParams(searchString);

        const idBook = urlParams.get("id");

        const token = window.localStorage.getItem("token");

        const data = {
            id: idBook,
            title: titleText,
            author: authorText,
            publishingCompany: publishingCompanyText
        }

        const editBookResponse = await fetch(`${urlApi}/editBook`, {
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