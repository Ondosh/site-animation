let currentIndex = 0;
let horizontalIndex = 0;
const sections = document.querySelectorAll('.section');
const horizontalSlider = document.querySelector('.horizontal-slider');
const totalHorizontalSlides = document.querySelectorAll('.slide').length;
const menuItems = document.querySelectorAll('.business-header nav ul li a');
const currentIndexDisplay = document.getElementById('currentIndex');

function sleep(ms) {         
  return new Promise(resolve => setTimeout(resolve, ms));  
}  

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToHorizontalSlide(index) {
  horizontalSlider.style.transform = `translateX(-${(index) * 100}vw)`;
}

menuItems.forEach(item => {
  item.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      let index = item.getAttribute('data-index'); // Get index from data-index
      currentIndex = parseInt(item.getAttribute('data-index'), 10); // Update current index
      horizontalIndex = 0;
      scrollToSection(currentIndex);
      if (currentIndex === 3) {
        horizontalIndex = 2;
        sleep(510).then(() =>  {scrollToHorizontalSlide(horizontalIndex)});
      } else if (currentIndex === 1 || currentIndex === 0) {
        horizontalIndex = 0;
        sleep(510).then(() =>  {scrollToHorizontalSlide(horizontalIndex)});
      } else {
        sleep(510).then(() =>  {scrollToHorizontalSlide(horizontalIndex)});
        scrollToHorizontalSlide(horizontalIndex);
      }
  });
});

window.addEventListener('wheel', (event) => {
  if (currentIndex === 2) { // If we are on the third section
    if (event.deltaY > 0 && horizontalIndex < totalHorizontalSlides - 1) {
      // Scroll right (next horizontal slide)
      horizontalIndex++;
      scrollToHorizontalSlide(horizontalIndex);
    } else if (event.deltaY < 0 && horizontalIndex > 0) {
      // Scroll left (previous horizontal slide)
      horizontalIndex--;
      scrollToHorizontalSlide(horizontalIndex);
    } else if (event.deltaY > 0 && horizontalIndex === totalHorizontalSlides - 1) {
      // If all horizontal slides have been scrolled, move to section 4
      currentIndex++;
      scrollToSection(currentIndex);
    } else if (event.deltaY < 0 && horizontalIndex === 0) {
      // If on the first horizontal slide and scrolling up — go back to section 2
      currentIndex--;
      scrollToSection(currentIndex);
    }
  } else {
    if (event.deltaY > 0 && currentIndex < sections.length - 1) {
      // Scroll down through vertical sections
      currentIndex++;
    } else if (event.deltaY < 0 && currentIndex > 0) {
      // Scroll up through vertical sections
      currentIndex--;
    }
    scrollToSection(currentIndex);
  }
});
