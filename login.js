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
    // CUSTOM SELECT DROPDOWN LOGIC
    // ─────────────────────────────
    const formGroupSelect = roleSelect.parentElement;
    
    // Create Custom Dropdown Container
    const customSelect = document.createElement("div");
    customSelect.className = "custom-select";

    // Create Trigger element
    const trigger = document.createElement("div");
    trigger.className = "custom-select__trigger";
    trigger.innerHTML = `<span>Choose Role</span><div class="custom-select__arrow"></div>`;
    
    // Create Options Container
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "custom-select__options";

    // Populate custom options using native select structure
    Array.from(roleSelect.options).forEach((option) => {
        const optDiv = document.createElement("div");
        optDiv.className = "custom-select__option";
        optDiv.textContent = option.textContent;
        optDiv.dataset.value = option.value;

        if (option.value === "") {
            optDiv.classList.add("placeholder");
        }

        // Option Click Event Handling
        optDiv.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent event bubbling conflicts
            
            if (option.value !== "") {
                trigger.querySelector("span").textContent = option.textContent;
                trigger.classList.add("has-value");
            } else {
                trigger.querySelector("span").textContent = "Choose Role";
                trigger.classList.remove("has-value");
            }

            // Sync structural form value to original select node
            roleSelect.value = option.value;
            
            // Toggle highlight status array
            optionsContainer.querySelectorAll(".custom-select__option").forEach(el => el.classList.remove("selected"));
            optDiv.classList.add("selected");
            
            // Dynamic State Clean-up
            customSelect.classList.remove("open");
            trigger.classList.remove("open");
            removeError(roleSelect);
        });

        optionsContainer.appendChild(optDiv);
    });

    customSelect.appendChild(trigger);
    customSelect.appendChild(optionsContainer);
    formGroupSelect.appendChild(customSelect);

    // Toggle Dropdown Panel open/close status
    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        customSelect.classList.toggle("open");
        trigger.classList.toggle("open");
    });

    // Close dropdown universally when clicking outside form elements
    document.addEventListener("click", () => {
        customSelect.classList.remove("open");
        trigger.classList.remove("open");
    });

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

        // EMAIL VALIDATION
        if (email === "") {
            showError(emailInput, "Email is required");
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, "Enter valid .com or .in email");
            isValid = false;
        } else {
            removeError(emailInput);
        }

        // PASSWORD VALIDATION
        if (password === "") {
            showError(passwordInput, "Password is required");
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, "Password must be 6+ characters");
            isValid = false;
        } else {
            removeError(passwordInput);
        }

        // ROLE VALIDATION
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

            localStorage.setItem("loggedInEmail", email);
            localStorage.setItem("loggedInRole", role);

            const userData = { email, role };
            localStorage.setItem("userData", JSON.stringify(userData));

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
    // Synced handling with Native element changes triggered by UI Custom Select
    roleSelect.addEventListener("change", () => removeError(roleSelect));

});