
    const hamburger =
    document.getElementById("hamburger");

    const mobileMenu =
    document.getElementById("mobileMenu");

    const closeMenu =
    document.getElementById("closeMenu");

    hamburger.addEventListener("click", () => {

      mobileMenu.classList.add("active");

    });

    closeMenu.addEventListener("click", () => {

      mobileMenu.classList.remove("active");

    });