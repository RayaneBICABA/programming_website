document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  const burgerButton = document.getElementById("burgerBtn");
  const navMenu = document.getElementById("menuBar");

  burgerButton.onclick = () => {
    navMenu.classList.toggle("hidden");
  };
});
