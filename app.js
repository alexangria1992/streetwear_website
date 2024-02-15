let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const slideImages = document.querySelectorAll(".slide img");
const dots = document.querySelectorAll(".dot");
const primaryHeader = document.querySelector(".primary-header");
const scrollWatcher = document.createElement("div");

const btnOpen = document.querySelector("#btnOpen");
const btnClose = document.querySelector("#btnClose");
const media = window.matchMedia("(width < 1024px)");
const topNavMenu = document.querySelector(".topnav-menu");

function setupTopNav(e) {
  if (e.matches) {
    // is mobile
    console.log("is mobile");
    topNavMenu.setAttribute("inert", "");
    topNavMenu.style.transition = "none";
  } else {
    console.log("is desktop");
    topNavMenu.removeAttribute("inert");
  }
}

function openMobileMenu() {
  // console.log("Click");
  btnOpen.setAttribute("aria-expanded", "true");
  topNavMenu.removeAttribute("inert");
  topNavMenu.removeAttribute("style");
}

function closeMobileMenu() {
  btnOpen.setAttribute("aria-expanded", "false");
  topNavMenu.setAttribute("inert", "");

  setTimeout(() => {
    topNavMenu.style.transition = "none";
  }, 500);
}

setupTopNav(media);

btnOpen.addEventListener("click", openMobileMenu);
btnClose.addEventListener("click", closeMobileMenu);

media.addEventListener("change", function (e) {
  setupTopNav(e);
});
scrollWatcher.setAttribute("data-scroll-watcher", "");

primaryHeader.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
  // console.log(entries);
  primaryHeader.classList.toggle("sticking", !entries[0].isIntersecting);
});

navObserver.observe(scrollWatcher);

const size = slideImages[0].clientWidth;

const init = (n) => {
  slides.forEach((slide, index) => {
    slide.style.display = "none";

    dots.forEach((dot, index) => {
      dot.classList.remove("active");
    });
  });
  slides[n].style.display = "block";

  dots[n].classList.add("active");
};

document.addEventListener("DOMContentLoaded", init(currentSlide));
const next = () => {
  slides[currentSlide].style.transition = "transform 0.4s ease-in-out";
  currentSlide >= slides.length - 1 ? (currentSlide = 0) : currentSlide++;
  slides[currentSlide].style.transform =
    "translateX(" + -size * currentSlide + "px)";
  init(currentSlide);
};

const prev = () => {
  currentSlide <= 0 ? (currentSlide = slides.length - 1) : currentSlide--;
  init(currentSlide);
};

document.querySelector(".next").addEventListener("click", next);
document.querySelector(".prev").addEventListener("click", prev);

// setInterval(() => {
//   next();
// }, 5000);

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    console.log(currentSlide);
    init(i);
    currentSlide = i;
  });
});
