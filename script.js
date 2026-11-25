
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const langBtn = document.getElementById("langBtn");
  const year = document.getElementById("year");

  let urdu = false;

  // AUTOMATIC COPYRIGHT YEAR
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // MOBILE NAVIGATION
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.textContent = isOpen ? "✕" : "☰";
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.textContent = "☰";
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // CLOSE MENU WHEN CLICKING OUTSIDE
    document.addEventListener("click", event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove("open");
        toggle.textContent = "☰";
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ENGLISH / URDU LANGUAGE SWITCH
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      urdu = !urdu;

      document.body.classList.toggle("urdu", urdu);
      document.documentElement.lang = urdu ? "ur" : "en";
      document.documentElement.dir = urdu ? "rtl" : "ltr";

      langBtn.textContent = urdu ? "English" : "اردو";

      document.querySelectorAll("[data-en]").forEach(element => {
        const translation = urdu
          ? element.dataset.ur
          : element.dataset.en;

        if (translation !== undefined) {
          element.innerHTML = translation;
        }
      });

      // CLOSE MOBILE MENU AFTER LANGUAGE CHANGE
      if (nav && toggle) {
        nav.classList.remove("open");
        toggle.textContent = "☰";
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
});
