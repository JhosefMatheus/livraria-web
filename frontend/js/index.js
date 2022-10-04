const loginInput = document.getElementById("login");
const passwordInput = document.getElementById("password");
const signInButton = document.getElementById("sign-in-button");

signInButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const login = loginInput.value;
    const password = passwordInput.value;

    if (login && password) {
        const dataRequest = {
            login: login,
            password: password
        }

        const loginResponse = await fetch("http://127.0.0.1:5000/loginVerify", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataRequest)
        });

        if (loginResponse.status === 200) {
            window.location = e.target.href;
        } else {
            console.log("login ou senha inválidos!");
        }

    } else {
        console.log("campos de login ou senha não foram preenchidos!");
    }
});