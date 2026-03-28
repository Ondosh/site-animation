let currentIndex = 0;
let horizontalIndex = 0;
const sections = document.querySelectorAll('.section');
const horizontalSlider = document.querySelector('.horizontal-slider');
const totalHorizontalSlides = document.querySelectorAll('.slide').length;
const menuItems = document.querySelectorAll('.business-header nav ul li a');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToHorizontalSlide(index) {
  horizontalSlider.style.transform = `translateX(-${index * 100}vw)`;
}

menuItems.forEach(item => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    currentIndex = parseInt(item.getAttribute('data-index'), 10);
    horizontalIndex = 0;
    scrollToSection(currentIndex);
    if (currentIndex === 3) {
      horizontalIndex = 2;
      sleep(510).then(() => scrollToHorizontalSlide(horizontalIndex));
    } else {
      sleep(510).then(() => scrollToHorizontalSlide(horizontalIndex));
    }
  });
});

/* ── Колесо мыши (десктоп) ── */
window.addEventListener('wheel', (event) => {
  if (currentIndex === 2) {
    if (event.deltaY > 0 && horizontalIndex < totalHorizontalSlides - 1) {
      horizontalIndex++;
      scrollToHorizontalSlide(horizontalIndex);
    } else if (event.deltaY < 0 && horizontalIndex > 0) {
      horizontalIndex--;
      scrollToHorizontalSlide(horizontalIndex);
    } else if (event.deltaY > 0 && horizontalIndex === totalHorizontalSlides - 1) {
      currentIndex++;
      scrollToSection(currentIndex);
    } else if (event.deltaY < 0 && horizontalIndex === 0) {
      currentIndex--;
      scrollToSection(currentIndex);
    }
  } else {
    if (event.deltaY > 0 && currentIndex < sections.length - 1) {
      currentIndex++;
    } else if (event.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
    }
    scrollToSection(currentIndex);
  }
});

/* ── Touch-свайп (мобильные) ── */
let touchStartY = 0;
let touchStartX = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  const deltaY = touchStartY - e.changedTouches[0].clientY;
  const deltaX = touchStartX - e.changedTouches[0].clientX;
  const threshold = 50; // минимальное расстояние свайпа в пикселях

  if (currentIndex === 2) {
    // на горизонтальной секции — обрабатываем горизонтальный свайп
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && horizontalIndex < totalHorizontalSlides - 1) {
        horizontalIndex++;
        scrollToHorizontalSlide(horizontalIndex);
      } else if (deltaX < 0 && horizontalIndex > 0) {
        horizontalIndex--;
        scrollToHorizontalSlide(horizontalIndex);
      } else if (deltaX > 0 && horizontalIndex === totalHorizontalSlides - 1) {
        currentIndex++;
        scrollToSection(currentIndex);
      } else if (deltaX < 0 && horizontalIndex === 0) {
        currentIndex--;
        scrollToSection(currentIndex);
      }
    }
  } else {
    // вертикальный свайп
    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0 && currentIndex < sections.length - 1) {
        currentIndex++;
      } else if (deltaY < 0 && currentIndex > 0) {
        currentIndex--;
      }
      scrollToSection(currentIndex);
    }
  }
}, { passive: true });
