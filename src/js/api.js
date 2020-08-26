import { createImageUrlcall } from './utils';

const apikey = 'd862a7fd6c83e2aec6c86a5b58326a76';
const imgkey = '0sOL1NbOnm7GrtULxBM8gYhtx3oBy2N49sRku-XtfA0';
const geokey = '932ae7f84ef94d5b8c72198c82ba28b3';

export function getLocation(lat, long, lang) {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&key=${geokey}&&language=${lang}&pretty=1&no_annotations=1`,
  ).then((response) => response.json());
}

export function getCity(city, lang) {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${city}&limit=1&key=${geokey}&&language=${lang}&pretty=1&no_annotations=1`,
  ).then((response) => response.json());
}

export function search(lat, long) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&lang=en&units=metric&APPID=${apikey}`,
  ).then((response) => response.json());
}

export function translate(value) {
  return fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200430T174415Z.94c9f3226ea096eb.c4acabe6e27aed0278302f73c6d262cf332eff35&text=${value}&lang=ru-en`,
  )
    .then((response) => response.json())
    .then((data) => data.text);
}

export function getImageUrl(value, dt) {
  const city = createImageUrlcall(value, dt);
  console.log(`Запрос картинки: ${city}`);
  return fetch(
    `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${city}&client_id=${imgkey}`,
  )
    .then((response) => response.json())
    .then((data) => data.urls.full);
}
