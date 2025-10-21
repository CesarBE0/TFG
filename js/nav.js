// === Resaltar la sección activa del navbar ===
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const currentPage = window.location.pathname.split("/").pop(); // nombre del archivo actual

  navLinks.forEach(link => {
    const hrefPage = link.getAttribute("href");
    if (hrefPage === currentPage || (hrefPage === "index.html" && currentPage === "")) {
      link.classList.add("active-page");
    } else {
      link.classList.remove("active-page");
    }
  });
});
