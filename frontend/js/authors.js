import Author from "./classes/Author.js";
import urlApi from "./config.js";

const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
const authorsOption = document.getElementById("authors-option");
const authorsIcon = document.getElementById("authors-icon");
const authorsText = document.getElementById("authors-text");
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
        authorsOption.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
        authorsIcon.style.fill = "rgb(16, 185, 129)";
        authorsText.style.color = "rgb(16, 185, 129)";

        const authorsResponse = await fetch(`${urlApi}/getAuthors`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const jsonAuthors = await authorsResponse.json();

        jsonAuthors.forEach(author => {
            const newAuthor = new Author(author.id, author.name);

            const newRow = document.createElement("tr");

            const tdId = document.createElement("td");
            const tdName = document.createElement("td");

            const tdButton = document.createElement("td");

            const button = document.createElement("a");

            button.innerHTML = "See more";
            button.className = "see-more-author-button";
            button.href = `./author.html?id=${newAuthor.id}`;

            tdId.innerHTML = newAuthor.id;
            tdName.innerHTML = newAuthor.name;
            tdButton.appendChild(button);

            newRow.appendChild(tdId);
            newRow.appendChild(tdName);
            newRow.appendChild(tdButton);

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