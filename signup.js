document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector(".login-form");

    if (!loginForm) {
        console.error("Form not found");
        return;
    }

    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const roleSelect = loginForm.querySelector("select");

    /* 👉 NEW: confirm password */
    const confirmPasswordInput = loginForm.querySelectorAll('input[type="password"]')[1];

    /* =========================================
       SHOW ERROR
    ========================================= */

    function showError(input, message) {

        const formGroup = input.parentElement;

        const oldError = formGroup.querySelector(".error-message");
        if (oldError) oldError.remove();

        formGroup.classList.add("error");

        const error = document.createElement("small");
        error.className = "error-message";
        error.innerText = message;

        formGroup.appendChild(error);
    }

    /* =========================================
       REMOVE ERROR
    ========================================= */

    function removeError(input) {

        const formGroup = input.parentElement;

        formGroup.classList.remove("error");

        const error = formGroup.querySelector(".error-message");
        if (error) error.remove();
    }

    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.(com|in)$/;
        return regex.test(email);
    }

    /* =========================================
       SUBMIT
    ========================================= */

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        /* EMAIL */
        if (emailInput.value.trim() === "") {
            showError(emailInput, "Email is required");
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, "Enter valid .com or .in email");
            isValid = false;
        } else {
            removeError(emailInput);
        }

        /* PASSWORD */
        if (passwordInput.value.trim() === "") {
            showError(passwordInput, "Password is required");
            isValid = false;
        } else if (passwordInput.value.trim().length < 6) {
            showError(passwordInput, "Password must be 6+ characters");
            isValid = false;
        } else {
            removeError(passwordInput);
        }

        /* 👉 NEW: CONFIRM PASSWORD CHECK */
        if (confirmPasswordInput) {

            if (confirmPasswordInput.value.trim() === "") {
                showError(confirmPasswordInput, "Please confirm password");
                isValid = false;

            } else if (confirmPasswordInput.value !== passwordInput.value) {
                showError(confirmPasswordInput, "Passwords do not match");
                isValid = false;

            } else {
                removeError(confirmPasswordInput);
            }
        }

        /* ROLE */
        if (roleSelect.value === "") {
            showError(roleSelect, "Please select role");
            isValid = false;
        } else {
            removeError(roleSelect);
        }

        /* SUCCESS */
        if (isValid) {
            console.log("Signup successful");

            window.location.href = "./login.html";
        }
    });

    /* =========================================
       LIVE ERROR REMOVE
    ========================================= */

    emailInput.addEventListener("input", () => removeError(emailInput));
    passwordInput.addEventListener("input", () => removeError(passwordInput));
    roleSelect.addEventListener("change", () => removeError(roleSelect));

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener("input", () => removeError(confirmPasswordInput));
    }

});