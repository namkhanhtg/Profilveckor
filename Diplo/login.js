document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    const linkCreateAccount = document.querySelector("#linkCreateAccount");
    const linkLogin = document.querySelector("#linkLogin");

   
    linkCreateAccount.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    
    linkLogin.addEventListener("click", (e) => {
        e.preventDefault();
        createAccountForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    });

    
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        
        window.location.href = "Subject.html";
    });

   
    createAccountForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const password = createAccountForm.querySelector(
            'input[placeholder="Password"]'
        );
        const confirmPassword = createAccountForm.querySelector(
            'input[placeholder="Confirm password"]'
        );
        const message = createAccountForm.querySelector(".form__message");

        if (password.value !== confirmPassword.value) {
            message.textContent = "Passwords do not match";
            message.classList.remove("form__message--success");
            message.classList.add("form__message--error");
            return;
        }

        message.textContent = "Account created successfully!";
        message.classList.remove("form__message--error");
        message.classList.add("form__message--success");

        
        setTimeout(() => {
            createAccountForm.classList.add("form--hidden");
            loginForm.classList.remove("form--hidden");
        }, 1500);
    });
});
