const buttons = document.querySelectorAll("[data-carousel-btn]");
const dots = document.querySelectorAll("[data-carousel-dot]");

function slide(button) {
  return () => {
    const offset = button.dataset.carouselBtn === "next" ? 1 : -1;
    const slidesContainer = button
      .closest("[data-carousel]")
      .querySelector("[data-carousel-slides]");
    const slides = slidesContainer.querySelectorAll("[data-carousel-slide]");
    const activeSlide = slidesContainer.querySelector("[data-active]");
    const activeSlideIndex = [...slides].indexOf(activeSlide);
    const nextSlideIndex = activeSlideIndex + offset;

    switch (nextSlideIndex) {
      case -1:
        moveDot(2)();
        break;
      case 1:
        moveDot(1)();
        break;
      case 2:
        moveDot(2)();
        break;
      default:
        moveDot(0)();
        break;
    }

    if (nextSlideIndex < 0) {
      slides[slides.length + nextSlideIndex].dataset.active = true;
      return delete activeSlide.dataset.active;
    }

    if (nextSlideIndex >= slides.length) {
      slides[0].dataset.active = true;
      return delete activeSlide.dataset.active;
    }

    slides[nextSlideIndex].dataset.active = true;
    return delete activeSlide.dataset.active;
  };
}

function moveDot(i) {
  return () => {
    const dot = dots[i];
    dots.forEach((d) => "active" in d.dataset && delete d.dataset.active);
    dot.dataset.active = true;
  };
}

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  // Toggle menu when clicking hamburger
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent this click from triggering the document click
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });

  // Prevent clicks inside menu from closing it
  mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Initialize carousel if it exists
  buttons.forEach((button) => button.addEventListener("click", slide(button)));
});
