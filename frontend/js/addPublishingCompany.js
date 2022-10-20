import urlApi from "./config.js";

const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
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

    const publishingCompanyText = publishingCompany.value;

    if (!publishingCompanyText) {
        flashMessage.innerHTML = "You need to provide a publishing company name.";

        flash.style.display = "block";

        setTimeout(() => {
            flash.style.display = "none";
        }, 5000);
    } else {
        const token = localStorage.getItem("token");

        const data = {
            publishingCompany: publishingCompanyText
        }

        const addPublishingCompanyResponse = await fetch(`${urlApi}/addPublishingCompany`, {
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