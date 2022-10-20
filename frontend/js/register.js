import urlApi from "./config.js";

const fNameInput = document.getElementById("fname");
const lNameInput = document.getElementById("lname");
const loginInput = document.getElementById("login");
const passwordInput = document.getElementById("password");
const signUpButton = document.getElementById("sign-up-button");
const flash = document.querySelector(".flash");
const flashMessage = document.querySelector(".flash-message");

signUpButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const fNameValue = fNameInput.value;
    const lNameValue = lNameInput.value;
    const loginValue = loginInput.value;
    const passwordValue = passwordInput.value;

    if (!fNameValue || !lNameValue || !loginValue || !passwordValue) {
        flashMessage.innerHTML = "Um dos campos acima não foi preenchido, por favor preencha.";
        flash.style.display = "block";

        setTimeout(() => {
            flashMessage.innerHTML = "";
            flash.style.display = "none";
        }, 5000);
    } else {
        const jsonData = {
            firstName: fNameValue,
            lastName: lNameValue,
            login: loginValue,
            password: passwordValue
        }

        const registerResponse = await fetch(`${urlApi}/register`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });

        if (registerResponse.status === 200) {
            window.location = e.target.href;
        } else if (registerResponse.status === 403) {
            registerResponse.json().then(data => {
                flashMessage.innerHTML = data.message;
                flash.style.display = "block";

                setTimeout(() => {
                    flashMessage.innerHTML = "";
                    flash.style.display = "none";
                }, 5000);
            });
        }
    }
});