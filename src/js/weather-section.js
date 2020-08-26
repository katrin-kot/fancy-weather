import { initClock } from './clock';
import { renderDate } from './date';

import { store } from './store';
import { toTranslate, toCityTranslate } from './translate';

function formatTemperature(temp) {
  const degrees = store.getState().grad;
  if (degrees === 'F') {
    return Math.round(Number(temp * 9) / 5 + 32);
  }
  return Math.round(temp);
}

export function renderWeather(state) {
  const { weather } = state;
  if (!weather.list) return;
  const dayWeather = document.querySelector('.today-block');
  const threedayWeather = document.querySelector('.threeday-block');
  dayWeather.innerHTML = '';

  dayWeather.innerHTML = `<h2 class = 'city-name'>${weather.city},${weather.country}</h2><p class = 'day-time'></p><div id='clock'></div>`;

  const day1 = new Date(weather.list[7].dt * 1000);
  const day2 = new Date(weather.list[15].dt * 1000);
  const day3 = new Date(weather.list[23].dt * 1000);


  const clockID = document.getElementById('clock');
  clockID.insertAdjacentHTML(
    'afterend',
    `<p class ='temperature' data-temp = 0>${formatTemperature(
      weather.list[0].temperature,
    )}°</p><div class ='weather-image'><img src ='/assets/images/svg/${
      weather.list[0].icon
    }.svg'></div><div class = 'info'><p class ='description' data-i18n="${
      weather.list[0].description
    }">${
      weather.list[0].description
    }</p><p><span data-i18n='temp'>Feels like</span>: ${
      weather.list[0].feelsLike
    }°</p><p class = 'wind'><span data-i18n='speed'>Wind</span>: ${Math.round(
      weather.list[0].windSpeed,
    )}m/s</p><p class = 'humidity'><span data-i18n='hum'>Humidity</span>: ${
      weather.list[0].humidity
    }%</p></div>`,
  );
  threedayWeather.innerHTML = `<div class ='oneday'><p class = 'oneday-week1'></p><p data-temp = 0>${formatTemperature(
    weather.list[7].temperature,
  )}°</p><img class ='threeday-image' src = '/assets/images/svg/${
    weather.list[7].icon
  }.svg'></div><div class = 'oneday'><p class ='oneday-week2'>
    </p><p data-temp = 0>${formatTemperature(
    weather.list[15].temperature,
  )}°</p><img class ='threeday-image' src = '/assets/images/svg/${
  weather.list[15].icon
}.svg'></div><div class = 'oneday'><p class = 'oneday-week3'>
   </p><p data-temp = 0>${formatTemperature(
    weather.list[23].temperature,
  )}°</p><img class ='threeday-image' src = '/assets/images/svg/${
  weather.list[23].icon
}.svg'></div>`;

  renderDate(day1, day2, day3);

  initClock();
}

let currentWeather = {};
let currentLanguage;
let currentDegrees;
export function handleWeatherChange() {
  const state = store.getState();
  const previousWeather = currentWeather;
  currentWeather = state.weather;
  const previousLanguage = currentLanguage;
  currentLanguage = state.language;
  const previousDegrees = currentDegrees;
  currentDegrees = state.grad;
  if (
    previousWeather.city !== currentWeather.city
    || previousLanguage !== currentLanguage
    || previousDegrees !== currentDegrees
  ) {
    renderWeather(state);
    toTranslate(currentLanguage);
    toCityTranslate(currentLanguage);
  }
}
