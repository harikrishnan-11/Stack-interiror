
const subscribeBtn =
document.getElementById("subscribeBtn");

const emailInput =
document.getElementById("newsletterEmail");

const emailMessage =
document.getElementById("emailMessage");

subscribeBtn.addEventListener("click", () => {

  const email =
  emailInput.value.trim();

  /* =====================================================
     EMAIL REGEX
     ONLY .com and .in ALLOWED
  ===================================================== */

  const validEmail =
  /^[^\s@]+@[^\s@]+\.(com|in)$/i;

  /* =====================================================
     EMPTY INPUT
  ===================================================== */

  if(email === ""){

    emailMessage.textContent =
    "Please enter your email address";

    emailMessage.style.color =
    "red";

    return;

  }

  /* =====================================================
     INVALID EMAIL
  ===================================================== */

  if(!validEmail.test(email)){

    emailMessage.textContent =
    "Email must end with .com or .in";

    emailMessage.style.color =
    "red";

    return;

  }

  /* =====================================================
     SUCCESS
  ===================================================== */

  emailMessage.textContent =
  "Subscribed Successfully!";

  emailMessage.style.color =
  "limegreen";

  emailInput.value = "";

});

