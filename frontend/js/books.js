import Book from "./classes/Book.js";
import urlApi from "./config.js";

const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
const booksOption = document.getElementById("books-option");
const booksIcon = document.getElementById("books-icon");
const booksText = document.getElementById("books-text");
const tableBody = document.querySelector("tbody");

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
        booksOption.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
        booksIcon.style.fill = "rgb(16, 185, 129)";
        booksText.style.color = "rgb(16, 185, 129)";

        const booksResponse = await fetch(`${urlApi}/getBooks`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const jsonBooks = await booksResponse.json()

        jsonBooks.forEach(book => {

            const newBook = new Book(book.id, book.title, book.authorName, book.publishingCompanyName);

            const newRow = document.createElement("tr");

            const tdId = document.createElement("td");
            const tdTitle = document.createElement("td");
            const tdAuthorName = document.createElement("td");
            const tdPublishingCompanyName = document.createElement("td");

            tdId.innerHTML = newBook.id;
            tdTitle.innerHTML = newBook.title;
            tdAuthorName.innerHTML = newBook.authorName;
            tdPublishingCompanyName.innerHTML = newBook.publishingCompanyName;

            newRow.appendChild(tdId);
            newRow.appendChild(tdTitle);
            newRow.appendChild(tdAuthorName);
            newRow.appendChild(tdPublishingCompanyName);

            tableBody.appendChild(newRow);
        });
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