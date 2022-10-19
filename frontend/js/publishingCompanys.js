import PublishingCompany from "./classes/PublishingCompany.js";
import urlApi from "./config.js";

const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
const publishingCompanysOption = document.getElementById("publishing-companys-option");
const publishingCompanysIcon = document.getElementById("publishing-companys-icon");
const publishingCompanysText = document.getElementById("publishing-companys-text");
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
        publishingCompanysOption.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
        publishingCompanysIcon.style.fill = "rgb(16, 185, 129)";
        publishingCompanysText.style.color = "rgb(16, 185, 129)";

        const publishingCompanysResponse = await fetch(`${urlApi}/getPublishingCompanys`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const jsonPublishingCompanys = await publishingCompanysResponse.json();

        jsonPublishingCompanys.forEach(publishingCompany => {
            const newPublishingCompany = new PublishingCompany(...publishingCompany);

            const newRow = document.createElement("tr");

            const tdId = document.createElement("td");
            const tdName = document.createElement("td");

            tdId.innerHTML = newPublishingCompany.id;
            tdName.innerHTML = newPublishingCompany.name;

            newRow.appendChild(tdId);
            newRow.appendChild(tdName);

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