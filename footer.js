document.addEventListener("DOMContentLoaded", function () {
  const subscribeBtn = document.querySelector(".stk-subscribe-btn");
  const emailInput = document.querySelector(".stk-newsletter-input");

  if (!subscribeBtn || !emailInput) return;

  subscribeBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (email && email.includes("@")) {
      localStorage.setItem("subscriberEmail", email);
      window.location.href = "./404.html";
    } else {
      alert("Please enter a valid email address.");
    }
  });
});
