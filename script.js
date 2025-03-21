document.addEventListener("DOMContentLoaded", function () {
  const subpageHome = document.getElementById("subpage-home");
  const subpageContact = document.getElementById("subpage-contact");
  const mainContent = document.getElementById("main-content");

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
