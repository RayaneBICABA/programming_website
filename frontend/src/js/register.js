document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  let currentStep = 1;
  const totalSteps = 3;

  const steps = {
    1: {
      element: document.getElementById("step1"),
      title: "Personal Information",
    },
    2: {
      element: document.getElementById("step2"),
      title: "Programming Profile",
    },
    3: { element: document.getElementById("step3"), title: "Account Security" },
  };

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const currentStepSpan = document.getElementById("currentStep");

  function updateUI() {
    // Hide all steps
    Object.values(steps).forEach((step) =>
      step.element.classList.add("hidden")
    );

    // Show current step
    steps[currentStep].element.classList.remove("hidden");

    // Update progress
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = progress + "%";
    progressText.textContent = steps[currentStep].title;
    currentStepSpan.textContent = currentStep;

    // Update buttons
    prevBtn.classList.toggle("hidden", currentStep === 1);
    nextBtn.classList.toggle("hidden", currentStep === totalSteps);
    submitBtn.classList.toggle("hidden", currentStep !== totalSteps);
  }

  function validateStep(step) {
    const errors = {};

    if (step === 1) {
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();

      if (!firstName) errors.firstName = "First name is required";
      if (!lastName) errors.lastName = "Last name is required";
      if (!email) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors.email = "Invalid email";
    }

    if (step === 2) {
      const level = document.getElementById("level").value;
      if (!level) errors.level = "Please select your level";
    }

    if (step === 3) {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const terms = document.getElementById("terms").checked;

      if (!username) errors.username = "Username is required";
      else if (username.length < 3)
        errors.username = "Username must be at least 3 characters";

      if (!password) errors.password = "Password is required";
      else if (password.length < 8)
        errors.password = "Password must be at least 8 characters";

      if (!confirmPassword)
        errors.confirmPassword = "Please confirm the password";
      else if (password !== confirmPassword)
        errors.confirmPassword = "Passwords do not match";

      if (!terms) errors.terms = "You must accept the terms of use";
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

  nextBtn.addEventListener("click", function () {
    if (validateStep(currentStep)) {
      currentStep++;
      updateUI();
    }
  });

  prevBtn.addEventListener("click", function () {
    currentStep--;
    updateUI();
  });

  // Password strength indicator
  document.getElementById("password").addEventListener("input", function () {
    const password = this.value;
    const strengthBar = document.getElementById("passwordStrength");
    const strengthText = document.getElementById("passwordStrengthText");

    let strength = 0;
    let text = "Very Weak";
    let color = "#ef4444";

    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;

    if (strength >= 75) {
      text = "Strong";
      color = "#bdf400";
    } else if (strength >= 50) {
      text = "Medium";
      color = "#fbbf24";
    } else if (strength >= 25) {
      text = "Weak";
      color = "#f97316";
    }

    strengthBar.style.width = strength + "%";
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = text;
  });

  // Form submission
  document
    .getElementById("registrationForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateStep(3)) {
        // Simulate registration process
        submitBtn.textContent = "Creating Account...";
        submitBtn.disabled = true;

        setTimeout(() => {
          alert("Account created successfully! Welcome to the community!");
          // Redirect to login or dashboard
        }, 2000);
      }
    });

  // Initialize
  updateUI();
});
