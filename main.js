const countries = document.querySelectorAll('.country');
const countriesArr = [];
const countryName = document.querySelector('.country-name');
const start = document.querySelector('.start');
const result = document.querySelector('.result');
const pointsHtml = document.querySelector('.points');
const svg = document.querySelector('svg');

for (i = 0; i < 3; i++) {
  countriesArr.push(countries[i].getAttribute('name'))
} 

const arrLen = countriesArr.length;

start.addEventListener('click', () => {
  startGame()
  start.classList.add('inactive')
})

random = Math.floor(Math.random()*(countriesArr.length));

function generateRandom() {
  random = Math.floor(Math.random()*(countriesArr.length));
}

function updatePoints(pt) {
  pointsHtml.innerText = `Zaliczone: ${pt}/${arrLen}`;
}

function addColor(el, type) {
  el.classList.add(type);
}

function removeColors() {
  countries.forEach(country => {
    if(!country.classList.contains('correct')) {
      country.classList.remove('incorrect');
    }
  })
}

function startGame() {
  let points = 0;
  let mistakes = 0;
  countryName.textContent = `Zaznacz: ${countriesArr[random]}`;
  updatePoints(points);

  countries.forEach(country => country.addEventListener('click', (e) => {
    const selected = country.getAttribute('name');
    if (selected == countriesArr[random]) {
      points++;
      countriesArr.splice(random, 1);
      generateRandom();
      addColor(country, 'correct');
      removeColors();
    } else if(!country.classList.contains('incorrect') && !country.classList.contains('correct')) {
      mistakes++;
      addColor(country, 'incorrect');
    }

    if (points == arrLen) {
      result.innerText = `Koniec gry, Twój wynik: ${100-mistakes}`;
      svg.style.display = 'none';
      countryName.classList.add('inactive');
    }

    updatePoints(points);
    countryName.textContent = `Zaznacz: ${countriesArr[random]}`;
    console.log(points);
    console.log(countriesArr);
}))}
