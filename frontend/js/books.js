const menuButton = document.getElementById("menu-button");
const sideBar = document.getElementById("side-bar");
let menuButtonFlag = "closed";
const booksOption = document.getElementById("books-option");
const booksIcon = document.getElementById("books-icon");
const booksText = document.getElementById("books-text");

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
        const booksResponse = await fetch(`${urlApi}/getBooks`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const jsonBooks = await booksResponse.json()

        booksOption.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
        booksIcon.style.fill = "rgb(16, 185, 129)";
        booksText.style.color = "rgb(16, 185, 129)";
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