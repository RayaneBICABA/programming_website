document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const submitBtn = loginForm.querySelector('button[type="submit"]');

  function validateForm() {
    const errors = {};
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username) {
      errors.username = "Username or email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    // Clear previous errors
    document
      .querySelectorAll(".form-error")
      .forEach((el) => (el.textContent = ""));

    // Display new errors
    Object.entries(errors).forEach(([field, message]) => {
      const errorEl = document.getElementById(field + "Error");
      if (errorEl) errorEl.textContent = message;
    });

    return Object.keys(errors).length === 0;
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      submitBtn.textContent = "Logging In...";
      submitBtn.disabled = true;

      // Simulate login process
      setTimeout(() => {
        alert("Logged in successfully! Welcome back!");
        submitBtn.textContent = "Log In";
        submitBtn.disabled = false;
        // Redirect to dashboard or home
      }, 2000);
    }
  });
});
