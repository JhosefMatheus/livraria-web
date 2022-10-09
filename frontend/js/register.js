const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const login = document.getElementById("login");
const password = document.getElementById("password");
const signUpButton = document.getElementById("sign-up-button");

signUpButton.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!fName || !lName || !login || !password) {
        console.log("Um dos campos acima não foi preenchido, por favor preencha!");
    } else {
        const fNameValue = fName.value;
        const lNameValue = lName.value;
        const loginValue = login.value;
        const passwordValue = password.value;

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
            registerResponse.json().then(data => console.log(data.message));
        }
    }
});