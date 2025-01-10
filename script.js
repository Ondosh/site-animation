let currentIndex = 0;
let horizontalIndex = 0;
const sections = document.querySelectorAll('.section');
const horizontalSlider = document.querySelector('.horizontal-slider');
const totalHorizontalSlides = document.querySelectorAll('.slide').length;
const menuItems = document.querySelectorAll('.business-header nav ul li a');
const currentIndexDisplay = document.getElementById('currentIndex');

function sleep(ms) {         
  return new Promise(resolve => setTimeout(resolve, ms)); }  

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
      event.preventDefault(); // Предотвращаем переход по ссылке
      index = item.getAttribute('data-index'); // Получаем индекс из data-index
      currentIndex = parseInt(item.getAttribute('data-index'), 10); // Обновляем отображение индекса
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
  if (currentIndex === 2) { // Если находимся на третьем слайде
    if (event.deltaY > 0 && horizontalIndex < totalHorizontalSlides - 1) {
      // Прокрутка вправо (вперед по горизонтальным слайдам)
      horizontalIndex++;
      scrollToHorizontalSlide(horizontalIndex);
    } else if (event.deltaY < 0 && horizontalIndex > 0) {
      // Прокрутка влево (назад по горизонтальным слайдам)
      horizontalIndex--;
      scrollToHorizontalSlide(horizontalIndex);
    } else if (event.deltaY > 0 && horizontalIndex === totalHorizontalSlides - 1) {
      // Если все горизонтальные слайды пролистаны, переходим на 4 секцию
      currentIndex++;
      scrollToSection(currentIndex);
    } else if (event.deltaY < 0 && horizontalIndex === 0) {
      // Если на первом горизонтальном слайде и прокручиваем вверх — возвращаемся на 2 секцию
      currentIndex--;
      scrollToSection(currentIndex);
    }
  } else {
    if (event.deltaY > 0 && currentIndex < sections.length - 1) {
      // Прокрутка вниз по вертикальным секциям
      currentIndex++;
    } else if (event.deltaY < 0 && currentIndex > 0) {
      // Прокрутка вверх по вертикальным секциям
      currentIndex--;
    }
    scrollToSection(currentIndex);
  }
});
