import Book from "./classes/Book.js";
import urlApi from "./config.js";

const books = [];

const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
const booksOption = document.getElementById("books-option");
const booksIcon = document.getElementById("books-icon");
const booksText = document.getElementById("books-text");
const tableBody = document.querySelector("tbody");
const searchInput = document.getElementById("search-input");

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

        const jsonBooks = await booksResponse.json();

        jsonBooks.forEach(book => {

            const newBook = new Book(book.id, book.title, book.authorName, book.publishingCompanyName);

            books.push(newBook);

            const newRow = document.createElement("tr");

            const tdId = document.createElement("td");
            const tdTitle = document.createElement("td");
            const tdAuthorName = document.createElement("td");
            const tdPublishingCompanyName = document.createElement("td");
            
            const tdMoreButton = document.createElement("td");
            const tdDeleteButton = document.createElement("td");

            const moreButton = document.createElement("a");
            const deleteButton = document.createElement("button");

            moreButton.innerHTML = "See more";
            moreButton.className = "see-more-book-button";
            moreButton.href = `./book.html?id=${newBook.id}`;

            deleteButton.innerHTML = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", async () => {
                const data = {
                    id: newBook.id
                }

                const deleteBookResponse = await fetch(`${urlApi}/deleteBook`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });

                window.location.reload();
            });

            tdId.innerHTML = newBook.id;
            tdTitle.innerHTML = newBook.title;
            tdAuthorName.innerHTML = newBook.authorName;
            tdPublishingCompanyName.innerHTML = newBook.publishingCompanyName;
            tdMoreButton.appendChild(moreButton);
            tdDeleteButton.appendChild(deleteButton);

            newRow.appendChild(tdId);
            newRow.appendChild(tdTitle);
            newRow.appendChild(tdAuthorName);
            newRow.appendChild(tdPublishingCompanyName);
            newRow.appendChild(tdMoreButton);
            newRow.appendChild(tdDeleteButton);

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

searchInput.addEventListener("change", (e) => {
    const search = e.target.value;

    if (search.length === 0) {
        while (tableBody.firstElementChild) {
            tableBody.removeChild(tableBody.firstElementChild);
        }

        books.forEach(book => {
            const newRow = document.createElement("tr");

            const tdId = document.createElement("td");
            const tdTitle = document.createElement("td");
            const tdAuthorName = document.createElement("td");
            const tdPublishingCompanyName = document.createElement("td");
            
            const tdMoreButton = document.createElement("td");
            const tdDeleteButton = document.createElement("td");

            const moreButton = document.createElement("a");
            const deleteButton = document.createElement("button");

            moreButton.innerHTML = "See more";
            moreButton.className = "see-more-book-button";
            moreButton.href = `./book.html?id=${book.id}`;

            deleteButton.innerHTML = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", async () => {
                const data = {
                    id: book.id
                }

                const deleteBookResponse = await fetch(`${urlApi}/deleteBook`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });

                window.location.reload();
            });

            tdId.innerHTML = book.id;
            tdTitle.innerHTML = book.title;
            tdAuthorName.innerHTML = book.authorName;
            tdPublishingCompanyName.innerHTML = book.publishingCompanyName;
            tdMoreButton.appendChild(moreButton);
            tdDeleteButton.appendChild(deleteButton);

            newRow.appendChild(tdId);
            newRow.appendChild(tdTitle);
            newRow.appendChild(tdAuthorName);
            newRow.appendChild(tdPublishingCompanyName);
            newRow.appendChild(tdMoreButton);
            newRow.appendChild(tdDeleteButton);

            tableBody.appendChild(newRow);
        });

    } else {
        const searchResult = books.filter(book => book.title.toLowerCase().includes(search));

        while (tableBody.firstElementChild) {
            tableBody.removeChild(tableBody.firstElementChild);
        }

        searchResult.forEach(book => {
            const newRow = document.createElement("tr");

            const tdId = document.createElement("td");
            const tdTitle = document.createElement("td");
            const tdAuthorName = document.createElement("td");
            const tdPublishingCompanyName = document.createElement("td");
            
            const tdMoreButton = document.createElement("td");
            const tdDeleteButton = document.createElement("td");

            const moreButton = document.createElement("a");
            const deleteButton = document.createElement("button");

            moreButton.innerHTML = "See more";
            moreButton.className = "see-more-book-button";
            moreButton.href = `./book.html?id=${book.id}`;

            deleteButton.innerHTML = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", async () => {
                const data = {
                    id: book.id
                }

                const deleteBookResponse = await fetch(`${urlApi}/deleteBook`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });

                window.location.reload();
            });

            tdId.innerHTML = book.id;
            tdTitle.innerHTML = book.title;
            tdAuthorName.innerHTML = book.authorName;
            tdPublishingCompanyName.innerHTML = book.publishingCompanyName;
            tdMoreButton.appendChild(moreButton);
            tdDeleteButton.appendChild(deleteButton);

            newRow.appendChild(tdId);
            newRow.appendChild(tdTitle);
            newRow.appendChild(tdAuthorName);
            newRow.appendChild(tdPublishingCompanyName);
            newRow.appendChild(tdMoreButton);
            newRow.appendChild(tdDeleteButton);

            tableBody.appendChild(newRow);
        });
    }
});