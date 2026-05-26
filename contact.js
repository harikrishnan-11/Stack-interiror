/* =========================================
   CONTACT FORM VALIDATION
========================================= */

const form = document.querySelector(".contact-form");

/* INPUTS */

const nameInput = document.querySelector("#name");

const emailInput = document.querySelector("#email");

const phoneInput = document.querySelector("#phone");

const serviceInput = document.querySelector("#service");

const messageInput = document.querySelector("#message");

/* =========================================
   SHOW ERROR
========================================= */

function showError(input, message){

    const formGroup = input.parentElement;

    const error = formGroup.querySelector(".error-message");

    formGroup.classList.add("error");

    error.innerText = message;

}

/* =========================================
   REMOVE ERROR
========================================= */

function removeError(input){

    const formGroup = input.parentElement;

    const error = formGroup.querySelector(".error-message");

    formGroup.classList.remove("error");

    error.innerText = "";

}

/* =========================================
   EMAIL VALIDATION
========================================= */

function validEmail(email){

    return /^[^\s@]+@[^\s@]+\.(com|in)$/.test(email);

}

/* =========================================
   PHONE VALIDATION
========================================= */

function validPhone(phone){

    return /^[0-9]{10}$/.test(phone);

}

/* =========================================
   FORM SUBMIT
========================================= */

form.addEventListener("submit", function(e){

    e.preventDefault();

    let isValid = true;

    /* NAME */

    if(nameInput.value.trim() === ""){

        showError(nameInput, "Please enter your name");

        isValid = false;

    }else{

        removeError(nameInput);

    }

    /* EMAIL */

    if(emailInput.value.trim() === ""){

        showError(emailInput, "Please enter your email");

        isValid = false;

    }else if(!validEmail(emailInput.value.trim())){

        showError(emailInput, "Email must end with .com or .in");

        isValid = false;

    }else{

        removeError(emailInput);

    }

    /* PHONE */

    if(phoneInput.value.trim() === ""){

        showError(phoneInput, "Please enter phone number");

        isValid = false;

    }else if(!validPhone(phoneInput.value.trim())){

        showError(phoneInput, "Phone number must be 10 digits");

        isValid = false;

    }else{

        removeError(phoneInput);

    }

    /* SERVICE */

    if(serviceInput.value === ""){

        showError(serviceInput, "Please select a service");

        isValid = false;

    }else{

        removeError(serviceInput);

    }

    /* MESSAGE */

    if(messageInput.value.trim() === ""){

        showError(messageInput, "Please enter your message");

        isValid = false;

    }else{

        removeError(messageInput);

    }

    /* SUCCESS */

    if(isValid){

        console.log("Form Submitted");

        form.reset();

    }

});