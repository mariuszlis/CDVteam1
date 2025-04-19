document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");
  const menuItems = document.querySelectorAll("#menu li a");

  function toggleMenu(event) {
    event.stopPropagation();
    navMenu.classList.toggle("active");
  }

  function closeMenu(event) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      navMenu.classList.remove("active");
    }
  }

  hamburger.addEventListener("click", toggleMenu);

  document.addEventListener("click", closeMenu);

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    const clickInsideMenu = navMenu.contains(e.target);
    const clickOnHamburger = hamburger.contains(e.target);

    if (!clickInsideMenu && !clickOnHamburger) {
      navMenu.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const subpageHome = document.getElementById("subpage-home");
  const subpageContact = document.getElementById("subpage-contact");
  const mainContent = document.getElementById("main-content");
  const subpageGallery = document.getElementById("subpage-gallery");
  const subpageCareer = document.getElementById("subpage-career");

  subpageHome.addEventListener("click", function (e) {
    e.preventDefault();

    let xhrHome = new XMLHttpRequest();

    xhrHome.open("GET", "home.html", true);
    xhrHome.onreadystatechange = function () {
      if (xhrHome.readyState === 4 && xhrHome.status === 200) {
        mainContent.innerHTML = xhrHome.responseText;
      }
    };
    xhrHome.send();
  });

  subpageContact.addEventListener("click", function (e) {
    e.preventDefault();

    let xhrContact = new XMLHttpRequest();

    xhrContact.open("GET", "kontakt.html", true);
    xhrContact.onreadystatechange = function () {
      if (xhrContact.readyState === 4 && xhrContact.status === 200) {
        mainContent.innerHTML = xhrContact.responseText;
      }
    };

    xhrContact.send();
  });

  subpageGallery.addEventListener("click", function (e) {
    e.preventDefault();

    let xhrGallery = new XMLHttpRequest();

    xhrGallery.open("GET", "galeria.html", true);
    xhrGallery.onreadystatechange = function () {
      if (xhrGallery.readyState === 4 && xhrGallery.status === 200) {
        mainContent.innerHTML = xhrGallery.responseText;
        initGalleryLightbox();
      }
    };

    xhrGallery.send();
  });

  subpageCareer.addEventListener("click", function (e) {
    e.preventDefault();

    let xhrCareer = new XMLHttpRequest();

    xhrCareer.open("GET", "kariera.html", true);
    xhrCareer.onreadystatechange = function () {
      if (xhrCareer.readyState === 4 && xhrCareer.status === 200) {
        mainContent.innerHTML = xhrCareer.responseText;
      }
    };

    xhrCareer.send();
  });
});

let currentSlide = 0;
const slides = document.querySelector(".slides");
const totalSlides = slides.children.length;

function showSlide(index) {
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }
  const offset = -currentSlide * 100;
  slides.style.transform = `translateX(${offset}%)`;
}

function autoSlide() {
  showSlide(currentSlide + 1);
}

let slideInterval = setInterval(autoSlide, 5000);

function initGalleryLightbox() {
  const thumbs = document.querySelectorAll(".lightbox-thumb");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");
  const leftArrow = document.querySelector(".lightbox-arrow.left");
  const rightArrow = document.querySelector(".lightbox-arrow.right");

  if (!thumbs.length || !lightbox) return;

  let currentIndex = 0;

  function showImage(index) {
    const img = thumbs[index];
    lightboxImg.classList.remove("visible");
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.alt;
      lightboxImg.classList.add("visible");
    }, 100);
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentIndex = index;
      lightbox.classList.add("show");
      showImage(currentIndex);
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;

    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % thumbs.length;
      showImage(currentIndex);
    }
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
      showImage(currentIndex);
    }
    if (e.key === "Escape") {
      lightbox.classList.remove("show");
    }
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
    }
  });

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
    showImage(currentIndex);
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % thumbs.length;
    showImage(currentIndex);
  });
}
