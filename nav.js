lucide.createIcons();

const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");

function toggleMenu() {
  drawer.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = drawer.classList.contains("active")
    ? "hidden"
    : "auto";
}

// Functional Mobile Dropdown Toggle
function toggleSubmenu(id, el) {
  const submenu = document.getElementById(id);
  const icon = el.querySelector(".mobile-nav-toggle");

  submenu.classList.toggle("open");
  icon.classList.toggle("active");
}

openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);
