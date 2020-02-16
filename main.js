const countries = document.querySelectorAll('.country');
const countriesArr = [];
const start = document.querySelector('.start');
const result = document.querySelector('.result');
const pointsHtml = document.querySelector('.points');
const mistakesHtml = document.querySelector('.mistakes');
const input = document.querySelector('.rounds-input');
const info = document.querySelector('.info');
const max = document.querySelector('.max');
const timer = document.querySelector('.timer');

start.addEventListener('click', () => {
  if(validate()) {
    for (i = 0; i < input.value; i++) {
      let country = countries[Math.floor(Math.random()*(countries.length))].getAttribute('name');
      let x = true;
      
      while(x == true) {
        if(countriesArr.includes(country)) {
          country = countries[Math.floor(Math.random()*(countries.length))].getAttribute('name');
        } else {
          x = false;
          countriesArr.push(country);
        }
      }
    } 

    const rounds = document.querySelector('.rounds');

    rounds.classList.add('inactive');
    start.classList.add('inactive');
    timer.classList.remove('inactive');
    info.textContent = 'ppm = zoom na ćwiartkę mapy, sterowanie strzałkami';
    info.classList.remove('wrong')
    startGame();
    setTimer();
  } else {
    info.classList.add('wrong');
  }
})

max.addEventListener('click', () => {
  input.value = countries.length;
})

function generateRandom() {
  const random = Math.floor(Math.random()*(countriesArr.length));
  return random;
}

function updatePoints(pt, mt) {
  pointsHtml.innerHTML = `Zaliczone: <span class="hl">${pt}/${input.value}</span>`;
  mistakesHtml.innerHTML = `Błędy: <span class="hl">${mt}</span>`;
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

function validate() {
  if(input.value > countries.length || input.value < 1) {
    return false;
  } else {
    return true;
  }
}

let s = 0;
let s2 = 0
let m = 0;
let time;

function setTimer(flag) {
  if(flag == false) {
    clearTimeout(time);
  } else {
    time = setTimeout(() => {
      s++;
      s2++
  
      if(s > 60) {
        s = 0;
        m++;
      }
  
      timer.textContent = 'Czas: ' + (m ? (m > 9 ? m : "0" + m) : "00") + ":" + (s > 9 ? s : "0" + s)  
      setTimer()
    }, 1000)

  }
}


function startGame() {
  let random = Math.floor(Math.random()*(countriesArr.length));
  let points = 0;
  let mistakes = 0;
  const toSelect = document.querySelector('.to-select');

  toSelect.innerHTML = `Zaznacz: <span class="hl">${countriesArr[random]}</span>`;
  updatePoints(points, mistakes);

  countries.forEach(country => country.addEventListener('click', (e) => {
    const selected = country.getAttribute('name');
    if (selected == countriesArr[random]) {
      points++;
      countriesArr.splice(random, 1);
      addColor(country, 'correct');
      removeColors();
      random = generateRandom();
    } else if(!country.classList.contains('incorrect') && !country.classList.contains('correct')) {
      mistakes++;
      addColor(country, 'incorrect');
    }

    if (points == input.value) {
      result.innerHTML = `Koniec gry, Twój wynik: <span class="hl">${(input.value-mistakes-s2/100)}</span>`;
      toSelect.classList.add('inactive');
      info.classList.add('inactive');
      setTimer(false);
    }

    updatePoints(points, mistakes);
    toSelect.innerHTML = `Zaznacz: <span class="hl">${countriesArr[random]}</span>`;
    console.log(countriesArr);
}))}


const g = document.querySelector('.g');
let indicator = 0;

function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  
  var mq = function (query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}


if(is_touch_device() == false) {
  g.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    const viewbox1 = 812;
    const viewbox2 = 676;
    const x2 = e.clientX - g.getBoundingClientRect().left;
    const y2 = e.clientY - g.getBoundingClientRect().top;
    const w = g.getBoundingClientRect().width;
    const h = g.getBoundingClientRect().height;
    
    indicator++;
    const svg = document.querySelector('svg');
    
    svg.setAttribute('viewBox', `0 0 ${Math.abs(viewbox1-w/2+50)} ${Math.abs(viewbox2-h/2+50)}`);
  
    let left;
    let top;
  
    if(x2 > w/2 && y2 > h/2) {
      left = w/2+34-150;
      top = h/2+34.8-150;
    } else if(x2 < w/2 && y2 > h/2) {
      left = 34+150;
      top = h/2+34.8-150;
    } else  if(x2 > w/2 && y2 < h/2) {
      left = w/2+34-150;
      top = 34.8+150;
    } else if(x2 < w/2 && y2 < h/2) {
      left = 34+150;
      top = 34.8+150;
    }
  
    g.setAttribute('transform', `matrix(0.03548236,0,0,0.03548236,-${left},-${top})`);
    var map = {};
  
    if(indicator % 2 != 0) {
      onkeydown = onkeyup = function(e){
        if(indicator % 2 != 0) {
  
          map[e.keyCode] = e.type == 'keydown';
          if(e.keyCode == '38') {
            top -= 7;;   
          } else if(e.keyCode == '37') {
            left -= 7;
          } else if(e.keyCode == '39') {
            left += 7;
          } else if(e.keyCode == '40') {
            top += 7;
          }
    
          if(map[37] && map[38]) {
            top -= 7;
            left -= 7;
          } else if(map[38] && map[39]){
            top -= 7;
            left += 7;
          } else if(map[37] && map[40]){
            top += 7;
            left -= 7;
          } else if(map[39] && map[40]){
            top += 7;
            left += 7;
          }
    
          if (top < 34.718) {
            top = 34.718;
          } if (left < 34) {
            left = 34;
          } if (top > h/2+34.8-50) {
            top = h/2+34.8-50;
          } if (left > w/2+34-50) {
            left = w/2+34-50;
          }
      
          g.setAttribute('transform', `matrix(0.03548236,0,0,0.03548236,-${left},-${top})`);
        }
      }
    }
  
    if(indicator % 2 == 0) {
      svg.setAttribute('viewBox', `0 0 ${viewbox1} ${viewbox2}`);
      g.setAttribute('transform', `matrix(0.03548236,0,0,0.03548236,-34,-34.8)`);
    }
    return false;
  }, false)
}
