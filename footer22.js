document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.querySelector(".stkExactFoot-newsletter-input");
  const submitBtn = document.querySelector(".stkExactFoot-newsletter-btn");

  submitBtn.addEventListener("click", function () {
    const emailValue = emailInput.value.trim();

    // Check empty
    if (emailValue === "") {
      alert("Please enter your email address.");
      emailInput.focus();
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      alert("Please enter a valid email address.");
      emailInput.focus();
      return;
    }

    // If valid → redirect
    window.location.href = "./4042.html";
  });
});
