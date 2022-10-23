import urlApi from "./config.js";
import Author from "./classes/Author.js";

const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
const author = document.getElementById("author");
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

            const authorResponse = await fetch(`${urlApi}/getAuthor`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (authorResponse.status === 200) {
                const jsonResponse = await authorResponse.json();

                const currentAuthor = new Author(jsonResponse.id, jsonResponse.name);
                
                author.value = currentAuthor.name;

            } else if (authorResponse.status === 500) {
                window.location = "./authors.html";
            }
        } else {
            window.location = "./authors.html";
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
    author.style.pointerEvents = "auto";

    author.readOnly = false;

    editOptions.style.display = "none";
    confirmCancelOptions.style.display = "flex";
});

cancelButton.addEventListener("click", () => {
    author.style.pointerEvents = "none";

    author.readOnly = true;

    confirmCancelOptions.style.display = "none";
    editOptions.style.display = "block";
});

confirmButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const authorText = author.value;

    if (!authorText) {

        flashMessage.innerHTML = "The form is incompleted, please fill the entire form.";

        flash.style.display = "block";

        setTimeout(() => {
            flash.style.display = "none";
        }, 5000);
    } else {
        const searchString = window.location.search;

        const urlParams = new URLSearchParams(searchString);

        const idAuthor = urlParams.get("id");

        const token = window.localStorage.getItem("token");

        const data = {
            id: idAuthor,
            name: authorText
        }

        const editAuthorResponse = await fetch(`${urlApi}/editAuthor`, {
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