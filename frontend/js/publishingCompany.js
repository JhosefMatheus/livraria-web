import urlApi from "./config.js";
import PublishingCompany from "./classes/PublishingCompany.js";

const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
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

            const publishingCompanyResponse = await fetch(`${urlApi}/getPublishingCompany`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (publishingCompanyResponse.status === 200) {
                const jsonResponse = await publishingCompanyResponse.json();

                const currentPublishingCompany = new PublishingCompany(jsonResponse.id, jsonResponse.name);
                
                publishingCompany.value = currentPublishingCompany.name;

            } else if (publishingCompanyResponse.status === 500) {
                window.location = "./publishingCompanys.html";
            }
        } else {
            window.location = "./publishingCompanys.html";
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
    publishingCompany.style.pointerEvents = "auto";

    publishingCompany.readOnly = false;

    editOptions.style.display = "none";
    confirmCancelOptions.style.display = "flex";
});

cancelButton.addEventListener("click", () => {
    publishingCompany.style.pointerEvents = "none";

    publishingCompany.readOnly = true;

    confirmCancelOptions.style.display = "none";
    editOptions.style.display = "block";
});

confirmButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const publishingCompanyText = publishingCompany.value;

    if (!publishingCompanyText) {

        flashMessage.innerHTML = "The form is incompleted, please fill the entire form.";

        flash.style.display = "block";

        setTimeout(() => {
            flash.style.display = "none";
        }, 5000);
    } else {
        const searchString = window.location.search;

        const urlParams = new URLSearchParams(searchString);

        const idPublishingCompany = urlParams.get("id");

        const token = window.localStorage.getItem("token");

        const data = {
            id: idPublishingCompany,
            name: publishingCompanyText
        }

        const editPublishingCompanyResponse = await fetch(`${urlApi}/editPublishingCompany`, {
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