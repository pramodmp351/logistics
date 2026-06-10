document.addEventListener("DOMContentLoaded", function () {
  // LOGIN FORM
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = loginForm.querySelectorAll("input");
    let isValid = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Please fill all login fields.");
      return;
    }

    // Redirect if valid
    window.location.href = "./404.html";
  });

  // REGISTER FORM
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = registerForm.querySelectorAll("input");
    let isValid = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Please fill all registration fields.");
      return;
    }

    // Redirect if valid
    window.location.href = "./404.html";
  });
});
