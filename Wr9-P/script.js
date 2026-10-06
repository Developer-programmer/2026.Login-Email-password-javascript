/**
 * Responsive Login & Registration Form
 * Handles tab switching, form validation, and submit actions
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const tabBtns = document.querySelectorAll(".tab-btn");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const successMessage = document.getElementById("successMessage");
  const successText = document.getElementById("successText");

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;

      // Update tab buttons
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Hide success message
      successMessage.classList.add("hidden");

      // Show appropriate form
      if (tab === "login") {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
        clearErrors(registerForm);
      } else {
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
        clearErrors(loginForm);
      }
    });
  });

  // Login form submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors(loginForm);

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    let isValid = true;

    if (!email.value.trim()) {
      showError("loginEmailError", "Email is required");
      email.classList.add("error");
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError("loginEmailError", "Please enter a valid email");
      email.classList.add("error");
      isValid = false;
    }

    if (!password.value) {
      showError("loginPasswordError", "Password is required");
      password.classList.add("error");
      isValid = false;
    }

    if (isValid) {
      loginForm.style.display = "none";
      registerForm.style.display = "none";
      document.querySelector(".form-tabs").style.display = "none";
      successText.textContent = "You have been logged in successfully.";
      successMessage.classList.remove("hidden");
    }
  });

  // Register form submit
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors(registerForm);

    const firstName = document.getElementById("registerFirst");
    const lastName = document.getElementById("registerLast");
    const email = document.getElementById("registerEmail");
    const password = document.getElementById("registerPassword");
    const confirm = document.getElementById("registerConfirm");
    const terms = document.getElementById("registerTerms");

    let isValid = true;

    if (!firstName.value.trim()) {
      showError("registerFirstError", "First name is required");
      firstName.classList.add("error");
      isValid = false;
    }

    if (!lastName.value.trim()) {
      showError("registerLastError", "Last name is required");
      lastName.classList.add("error");
      isValid = false;
    }

    if (!email.value.trim()) {
      showError("registerEmailError", "Email is required");
      email.classList.add("error");
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError("registerEmailError", "Please enter a valid email");
      email.classList.add("error");
      isValid = false;
    }

    if (!password.value) {
      showError("registerPasswordError", "Password is required");
      password.classList.add("error");
      isValid = false;
    } else if (password.value.length < 8) {
      showError("registerPasswordError", "Password must be at least 8 characters");
      password.classList.add("error");
      isValid = false;
    }

    if (password.value !== confirm.value) {
      showError("registerConfirmError", "Passwords do not match");
      confirm.classList.add("error");
      isValid = false;
    }

    if (!terms.checked) {
      showError("registerConfirmError", "You must agree to the terms");
      isValid = false;
    }

    if (isValid) {
      loginForm.style.display = "none";
      registerForm.style.display = "none";
      document.querySelector(".form-tabs").style.display = "none";
      successText.textContent = "Your account has been created successfully.";
      successMessage.classList.remove("hidden");
    }
  });

  // Clear error state on input
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("error");
      const errorEl = document.getElementById(input.id + "Error");
      if (errorEl) errorEl.textContent = "";
    });
  });

  // Helper: Show error message
  function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = message;
  }

  // Helper: Clear all errors in form
  function clearErrors(form) {
    form.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
    form.querySelectorAll("input.error").forEach((el) => el.classList.remove("error"));
  }

  // Helper: Validate email format
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
});
