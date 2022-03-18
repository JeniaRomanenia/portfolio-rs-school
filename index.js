import i180bj from './translate.js';


const hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.nav-list');
let link = document.querySelectorAll('.nav-l');

function toggleMenu() {
  hamburger.classList.toggle('open');
  menu.classList.toggle('active');
}
hamburger.addEventListener('click', toggleMenu);
link.forEach((el) => el.addEventListener('click', toggleMenu));

//выбор фото

const portfolioBtns = document.querySelector('.btn-row');
const portfolioImages = document.querySelectorAll('.portfolio-img');

portfolioBtns.addEventListener('click', (event) => {
  if(event.target.classList.contains('btn-portfolio')){
  portfolioBtns.querySelector('.btn-portfolio-active').classList.remove('btn-portfolio-active');
  event.target.classList.add('btn-portfolio-active');
  const seasonValue = event.target.getAttribute('data-season');
  portfolioImages.forEach((img, index) => img.src = `./assets/img/${seasonValue}/${index + 1}.jpg`); 
}
});

//кеширование изображений 
const seasons = ['winter', 'spring', 'summer', 'autumn'];

seasons.forEach((season) => {
  for (let i = 0; i <= 5; i++) {
    const img = new Image();
    img.src = `./assets/img/${season}/${i+1}.jpg`;
    console.log(img.src)
  }
})

//перевод страницы
let elem = document.querySelectorAll('[data-i18]');
const btnLang = document.querySelector('.nav-lang');


btnLang.addEventListener('click', (event) => {
  if(event.target.classList.contains('lang')){
    btnLang.querySelector('.lang-active').classList.remove('lang-active');
    event.target.classList.add('lang-active');
    const lang = event.target.getAttribute('data-lang');
    getTranslate(lang);
    localStorage.setItem('lang', lang);
  }}
  );


function getTranslate (l) {
  elem.forEach(item => item.textContent = i180bj[l][item.dataset.i18])
}

//переключение светлой и темной темы

const themeSwitcers = document.querySelectorAll('.change-theme');

themeSwitcers.forEach(switcher => {
    switcher.addEventListener('click', function() {
      applyTheme(this.dataset.theme);
      localStorage.setItem('theme', this.dataset.theme);
    });
});

function applyTheme(themeName) {
  let themeUrl = `css/theme-${themeName}.css`;
  document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
  //console.log(themeUrl);
}

//проверяем данные в localStorage
let activeTheme = localStorage.getItem('theme');
let activeLang = localStorage.getItem('lang');
console.log(activeLang);

if(activeTheme === null) {
  applyTheme('light');
  getTranslate('en');
} else {
  applyTheme(activeTheme);
  getTranslate(activeLang);
}