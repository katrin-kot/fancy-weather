import { store } from './store';
import '../style.css';
import { renderContent } from './search';
import {
  fetchImageUrl,
  changeLanguageBe,
  changeLanguageEn,
  changeLanguageRu,
  changeGradC,
  changeGradF,
  changeCity,
  fetchCity,
} from './redux/actions';
import { backgroundLoader } from './utils';
import { toTranslate, toCityTranslate } from './translate';
import { renderDate } from './date';
import { handleWeatherChange } from './weather-section';
import { handleChangeLocation } from './map';
import { renderError } from './errors';

const body = document.querySelector('body');
body.innerHTML = '<main><div class="content"><div class = \'control-block\'></div><section class="today-block"></section><div class= "wrapper"><section class = \'threeday-block\'></section><div class = "map-text"></div><section class = \'map-block\'></section></div></div></main>';
const control = document.querySelector('.control-block');
control.innerHTML = `<div class ='control-buttons'><button class='refresh-btn'></button><ul class="languages">
<li class=" en active">
 <a> EN</a>
</li>
<li class = "ru"><a>RU</a></li>
<li class = "be"><a>BE</a></li>
</ul><ul class = 'gradus-btn'><li class = 'farengeit'>&#176;F</li><li class = 'celsium active-btn'>&#176;C</li></ul></div>
<form class = "search"><input class="search-input" type="text" placeholder="Search city" autofocus=""><button class="search-btn" type="submit"><span data-i18n = 'search'>Search</span></button><span data-name="Clear" class="search-clear tooltip"></span><span data-name="Microfone" class="mic"></span>'</form> `;
renderContent();

const refresh = document.querySelector('.refresh-btn');
const farengeit = document.querySelector('.farengeit');
const celsium = document.querySelector('.celsium');
const en = document.querySelector('.en');
const ru = document.querySelector('.ru');
const be = document.querySelector('.be');
const languages = document.querySelectorAll('ul.languages > li');
const mic = document.querySelector('.mic');

document.querySelector('.languages').addEventListener('mouseover', () => {
  languages.forEach((element) => {
    element.classList.add('visible');
  });
});

document.querySelector('.languages').addEventListener('mouseleave', () => {
  languages.forEach((element) => {
    element.classList.remove('visible');
  });
});

refresh.addEventListener('click', async () => {
  const state = store.getState();
  const { weather, city } = state;
  store.dispatch(fetchImageUrl(city, weather.dt));
});

farengeit.addEventListener('click', () => {
  store.dispatch(changeGradF());
});

celsium.addEventListener('click', () => {
  store.dispatch(changeGradC());
});

en.addEventListener('click', () => {
  store.dispatch(changeLanguageEn());
});

ru.addEventListener('click', () => {
  store.dispatch(changeLanguageRu());
});

be.addEventListener('click', () => {
  store.dispatch(changeLanguageBe());
});

window.SpeechRecognition = window.webkitSpeechRecognition
  || window.mozSpeechRecognition
  || window.msSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'ru-RU';
recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');
  document.querySelector('.search-input').value = transcript;
});

recognition.addEventListener('end', () => {
  mic.classList.remove('mic-active');
  const input = document.querySelector('.search-input');
  if (input.value) {
    store.dispatch(changeCity(input.value));
    store.dispatch(fetchCity(input.value));
  }
});
mic.addEventListener('click', () => {
  mic.classList.add('mic-active');
  if (
    window.SpeechRecognition
    || window.webkitSpeechRecognition
    || window.mozSpeechRecognition
    || window.msSpeechRecognition
  ) {
    recognition.start();
  } else {
    const state = store.getState();
    if (state.language === 'ru') {
      console.warn('Не поддерживается данным браузером');
    }
  }
});

function selectImageUrl(state) {
  return state.image;
}

let currentImageUrl;
function handleImageChange() {
  const state = store.getState();
  const previousImageUrl = currentImageUrl;
  currentImageUrl = selectImageUrl(state);
  if (previousImageUrl !== currentImageUrl) {
    backgroundLoader(currentImageUrl);
  }
}
store.subscribe(handleImageChange);

function selectCity(state) {
  return state.city;
}

function handleCity() {
  const state = store.getState();
  return selectCity(state);
}

store.subscribe(handleCity);

function selectLocation(state) {
  return state.payload;
}

function handleLocation() {
  const state = store.getState();
  return selectLocation(state);
}

store.subscribe(handleLocation);

function selectLanguage(state) {
  return state.language;
}

let currentLanguage;
function handleLanguage() {
  const state = store.getState();
  const previousLanguage = currentLanguage;
  currentLanguage = selectLanguage(state);
  if (previousLanguage !== currentLanguage) {
    document
      .querySelectorAll('.active')
      .forEach((elem) => elem.classList.remove('active'));
    document.querySelector(`.${currentLanguage}`).classList.add('active');
    if (currentLanguage === 'ru') {
      document
        .querySelector('.search-input')
        .setAttribute('placeholder', 'Искать город');
    }
    if (currentLanguage === 'be') {
      document
        .querySelector('.search-input')
        .setAttribute('placeholder', 'Шукаць горад');
    }
    if (currentLanguage === 'en') {
      document
        .querySelector('.search-input')
        .setAttribute('placeholder', 'Search city');
    }
    const { weather } = state;
    if (!weather.list) return;
    toTranslate(currentLanguage);
    const day1 = new Date(weather.list[7].dt * 1000);
    const day2 = new Date(weather.list[15].dt * 1000);
    const day3 = new Date(weather.list[23].dt * 1000);
    renderDate(day1, day2, day3);
    toCityTranslate(currentLanguage);
  }
}
store.subscribe(handleLanguage);

function selectGrad(state) {
  return state.grad;
}

let currentGrad;

function handleGradChange() {
  const state = store.getState();
  const previousGrad = currentGrad;
  currentGrad = selectGrad(state);
  if (previousGrad !== currentGrad) {
    if (state.grad === 'F') {
      celsium.classList.remove('active-btn');
      farengeit.classList.add('active-btn');
    } else {
      farengeit.classList.remove('active-btn');
      celsium.classList.add('active-btn');
    }
  }
}

let currentError;
function handleErrorChange() {
  const state = store.getState();
  const previousError = currentError;
  currentError = state.error;
  if (previousError !== currentError) {
    renderError(currentError);
  }
}

store.subscribe(handleGradChange);
store.subscribe(handleWeatherChange);
store.subscribe(handleChangeLocation);
store.subscribe(handleErrorChange);
