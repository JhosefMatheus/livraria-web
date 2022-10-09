const inputs = document.getElementsByTagName("input");
const loginInput = document.getElementById("login");
const passwordInput = document.getElementById("password");
const signInButton = document.getElementById("sign-in-button");
const flash = document.querySelector(".flash");
const flashMessage = document.querySelector(".flash-message");

Array.from(inputs).forEach(input => {
    input.addEventListener("focusout", () => {
        const text = input.value;

        if (!text) {
            input.style.outline = "2px solid red";
        } else {
            input.style.outline = "1px solid rgb(230, 232, 240)";
        }
    });
});

signInButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const login = loginInput.value;
    const password = passwordInput.value;

    if (login && password) {
        const dataRequest = {
            login: login,
            password: password
        }

        const loginResponse = await fetch(`${urlApi}/loginVerify`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataRequest)
        });

        if (loginResponse.status === 200) {
            const jsonData = await loginResponse.json()

            localStorage.setItem("token", jsonData.token);

            window.location = e.target.href;
        } else {
            flashMessage.innerHTML = "Login ou senha inválidos.";
            flash.style.display = "block";

            setTimeout(() => {
                flashMessage.innerHTML = "";
                flash.style.display = "none";
            }, 5000);
        }

    } else {
        flashMessage.innerHTML = "Campos de login ou senha não foram preenchidos.";
        flash.style.display = "block";

        setTimeout(() => {
            flashMessage.innerHTML = "";
            flash.style.display = "none";
        }, 5000);
    }
});