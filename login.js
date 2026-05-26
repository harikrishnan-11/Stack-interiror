document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector(".login-form");

    if (!loginForm) {
        console.error("Login form not found");
        return;
    }

    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const roleSelect = loginForm.querySelector("select");

    // ─────────────────────────────
    // SHOW ERROR
    // ─────────────────────────────
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

    // ─────────────────────────────
    // REMOVE ERROR
    // ─────────────────────────────
    function removeError(input) {
        const formGroup = input.parentElement;

        formGroup.classList.remove("error");

        const error = formGroup.querySelector(".error-message");
        if (error) error.remove();
    }

    // ─────────────────────────────
    // EMAIL VALIDATION
    // ─────────────────────────────
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.(com|in)$/;
        return regex.test(email);
    }

    // ─────────────────────────────
    // SUBMIT HANDLER
    // ─────────────────────────────
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const role = roleSelect.value;

        // EMAIL
        if (email === "") {
            showError(emailInput, "Email is required");
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, "Enter valid .com or .in email");
            isValid = false;
        } else {
            removeError(emailInput);
        }

        // PASSWORD
        if (password === "") {
            showError(passwordInput, "Password is required");
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, "Password must be 6+ characters");
            isValid = false;
        } else {
            removeError(passwordInput);
        }

        // ROLE
        if (role === "") {
            showError(roleSelect, "Please select role");
            isValid = false;
        } else {
            removeError(roleSelect);
        }

        // ─────────────────────────────
        // SUCCESS LOGIN
        // ─────────────────────────────
        if (isValid) {

            console.log("Login successful");

            // ✅ SAVE USER SESSION DATA
            localStorage.setItem("loggedInEmail", email);
            localStorage.setItem("loggedInRole", role);

            const userData = {
                email,
                role
            };

            localStorage.setItem("userData", JSON.stringify(userData));

            // redirect
            setTimeout(() => {
                if (role === "admin") {
                    window.location.href = "./admin.html";
                } else {
                    window.location.href = "./user.html";
                }
            }, 600);
        }
    });

    // ─────────────────────────────
    // LIVE ERROR CLEAR
    // ─────────────────────────────
    emailInput.addEventListener("input", () => removeError(emailInput));
    passwordInput.addEventListener("input", () => removeError(passwordInput));
    roleSelect.addEventListener("change", () => removeError(roleSelect));

});