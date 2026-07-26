/**
 * Comportamentos globais do site:
 * - abre e fecha o menu em telas pequenas;
 * - fecha o menu após a navegação;
 * - mantém o ano do rodapé atualizado.
 */
const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-button");

if (header && menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  header.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

/**
 * Carrossel de avaliações:
 * aceita setas, indicadores e avanço automático.
 */
const reviewCarousel = document.querySelector(".review-carousel");
if (reviewCarousel) {
  const slides = [...reviewCarousel.querySelectorAll(".review-slide")];
  const dots = [...reviewCarousel.querySelectorAll(".review-dots button")];
  const previousButton = reviewCarousel.querySelector(".review-prev");
  const nextButton = reviewCarousel.querySelector(".review-next");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentReview = 0;
  let reviewTimer;

  const showReview = (index) => {
    currentReview = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      const isActive = position === currentReview;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    dots.forEach((dot, position) => {
      const isActive = position === currentReview;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
  };

  const restartTimer = () => {
    if (reducedMotion) return;
    window.clearInterval(reviewTimer);
    reviewTimer = window.setInterval(() => showReview(currentReview + 1), 6000);
  };

  previousButton.addEventListener("click", () => {
    showReview(currentReview - 1);
    restartTimer();
  });
  nextButton.addEventListener("click", () => {
    showReview(currentReview + 1);
    restartTimer();
  });
  dots.forEach((dot, index) => dot.addEventListener("click", () => {
    showReview(index);
    restartTimer();
  }));

  restartTimer();
}
