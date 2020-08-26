import { store } from './store';

function clock(now = new Date()) {
  const state = store.getState();
  const { weather } = state;
  let date = now;
  if (weather.timezone === 10800) {
    date = new Date();
  } else {
    date = new Date(new Date() - new Date((10800 - weather.timezone) * 1000));
  }
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  document.getElementById('clock').innerHTML = `${hours}:${minutes}:${seconds}`;
}

let id;
export function initClock() {
  clearInterval(id);
  id = setInterval(clock, 1000);
}
