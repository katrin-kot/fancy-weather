import { getCity } from './api';

const translation = {
  temp: { en: 'Feels like', ru: 'Ощущается как', be: 'Адчуваецца як' },
  speed: { en: 'Wind', ru: 'Ветер', be: 'Вецер' },
  hum: { en: 'Humidity', ru: 'Влажность', be: 'Вiльготнасць' },
  long: { en: 'Longitude', ru: 'Долгота', be: 'Даўгата' },
  lat: { en: 'Latitude', ru: 'Широта', be: 'Шырата' },
  search: { en: 'Search', ru: 'Поиск', be: 'Пошук' },
  'thunderstorm with light rain': {
    en: 'thunderstorm with light rain',
    ru: 'гроза с небольшим дождем',
    be: 'навальніца з невялікім дажджом',
  },
  'thunderstorm with rain': {
    en: 'thunderstorm with rain',
    ru: 'гроза с дождем',
    be: 'навальніца з дажджом',
  },
  'thunderstorm with heavy rain': {
    en: 'thunderstorm with heavy rain',
    ru: 'гроза с проливным дождем',
    be: 'навальніца з моцным дажджом',
  },
  'light thunderstorm': {
    en: 'light thunderstorm',
    ru: 'легкая гроза',
    be: 'лёгкая навальніца',
  },
  thunderstorm: { en: 'thunderstorm', ru: 'гроза', be: 'навальніца' },
  'heavy thunderstorm': {
    en: 'heavy thunderstorm',
    ru: 'сильная гроза',
    be: 'моцная навальніца',
  },
  'ragged thunderstorm': {
    en: 'ragged thunderstorm',
    ru: 'рваная гроза',
    be: 'ірваная навальніца',
  },
  'thunderstorm with light drizzle': {
    en: 'thunderstorm with light drizzle',
    ru: 'гроза с легкой моросью',
    be: 'навальніца са слабым дожджыкам',
  },
  'thunderstorm with drizzle': {
    en: 'thunderstorm with drizzle',
    ru: 'гроза с моросящим дождем',
    be: 'навальніца з дробным дожджыкам',
  },
  'thunderstorm with heavy drizzle': {
    en: 'thunderstorm with heavy drizzle',
    ru: 'гроза с сильным моросящим дождем',
    be: 'навальніца з моцным дожджыкам',
  },
  'light intensity drizzle': {
    en: 'light intensity drizzle',
    ru: 'мало интенсивная морось',
    be: 'малаінтэнсіўная імжа',
  },
  drizzle: { en: 'drizzle', ru: 'изморось', be: 'імжа' },
  'heavy intensity drizzle': {
    en: 'heavy intensity drizzle',
    ru: 'сильная морось',
    be: 'моцная імжа',
  },
  'light intensity drizzle rain': {
    en: 'light intensity drizzle rain',
    ru: 'малоинтенсивный моросящий дождь',
    be: 'малаінтэнсіўны дождж',
  },
  'drizzle rain': { en: 'drizzle rain', ru: 'кароткачасовы дождж' },
  'heavy intensity drizzle rain': {
    en: 'heavy intensity drizzle rain',
    ru: 'сильный дождь',
    be: 'моцны дождж',
  },
  'shower rain and drizzle': {
    en: 'shower rain and drizzle',
    ru: 'дождь и морось',
    be: 'дождж і імжа',
  },
  'heavy shower rain and drizzle': {
    en: 'heavy shower rain and drizzle',
    ru: 'сильный ливень и дождь',
    be: 'моцны лівень і дождж',
  },
  'shower drizzle': {
    en: 'shower drizzle',
    ru: 'моросящий дождь',
    be: 'лівень',
  },
  'light rain': { en: 'light rain', ru: 'легкий дождь', be: 'невялікі дождж' },
  'moderate rain': {
    en: 'moderate rain',
    ru: 'умеренный дождь',
    be: 'дождж умераны',
  },
  'heavy intensity rain': {
    en: 'heavy intensity rain',
    ru: 'сильный дождь',
    be: 'моцны дождж',
  },
  'very heavy rain': {
    en: 'very heavy rain',
    ru: 'очень сильный дождь',
    be: 'вельмі моцны дождж',
  },
  'extreme rain': {
    en: 'extreme rain',
    ru: 'сильный дождь',
    be: 'моцны дождж',
  },
  'freezing rain': {
    en: 'freezing rain',
    ru: 'ледяной дождь',
    be: 'ледзяны дождж',
  },
  'light intensity shower rain': {
    en: 'light intensity shower rain',
    ru: 'интенсивный дождь',
    be: 'інтэнсіўны дождж',
  },
  'shower rain': { en: 'shower rain', ru: 'ливень', be: 'ліўневы дождж' },
  'heavy intensity shower rain': {
    en: 'heavy intensity shower rain',
    ru: 'сильный интенсивный дождь',
    be: 'моцны дождж',
  },
  'ragged shower rain': {
    en: 'ragged shower rain',
    ru: 'рваный дождь',
    be: 'ірваны лівень',
  },
  'clear sky': { en: 'clear sky', ru: 'ясно', be: 'ясна' },
  'few clouds': { en: 'few clouds', ru: 'малооблачно', be: 'малавоблачна' },
  'scattered clouds': {
    en: 'scattered clouds',
    ru: 'рассеянные облака',
    be: 'малавоблачна',
  },
  'broken clouds': { en: 'broken clouds', ru: 'облачно', be: 'воблачна' },
  'overcast clouds': {
    en: 'overcast clouds',
    ru: 'облачно',
    be: 'хмары з праясненнямі',
  },
  'light snow': { en: 'light snow', ru: 'небольшой снег', be: 'невялікі снег' },
  Snow: { en: 'Snow', ru: 'Снег', be: 'Снег' },
  'Heavy snow': { en: 'Heavy snow', ru: 'Снегопад', be: 'Моцны снег' },
  Sleet: { en: 'Sleet', ru: 'Мокрый снег', be: 'Мокры снег' },
  'Light shower sleet': {
    en: 'Light shower sleet',
    ru: 'лёгкий мокрый снег',
    be: 'Лёгкі мокры снег',
  },
  'Shower sleet': { en: 'Shower sleet', ru: 'Мокрый снег', be: 'Мокры снег' },
  'Light rain and snow': {
    en: 'Light rain and snow',
    ru: 'Небольшой дождь и снег',
    be: 'Невялікі дождж і снег',
  },
  'Rain and snow': { en: 'Rain and snow', ru: 'Дождь и снег', be: '' },
  'Light shower snow': {
    en: 'Light shower snow',
    ru: 'Легкий снегопад',
    be: 'Лёгкі снег',
  },
  'Shower snow': { en: 'Shower snow', ru: 'Снегопад', be: 'Моцны снег' },
  'Heavy shower snow': {
    en: 'Heavy shower snow',
    ru: 'Сильный снегопад',
    be: 'Моцны снег',
  },
  mist: { en: 'mist', ru: 'туман', be: 'туман' },
  fog: { en: 'fog', ru: 'туман', be: 'туман' },
  sand: { en: 'sand', ru: 'песок', be: 'пясок' },
  dust: { en: 'dust', ru: 'пыль', be: 'пыл' },
  Smoke: { en: 'Smoke', ru: 'Дым', be: 'Дым' },
  Haze: { en: 'Haze', ru: 'Мгла', be: 'Дымка' },
  'volcanic ash': {
    en: 'volcanic ash',
    ru: 'вулканический пепел',
    be: 'вулканічны попел',
  },
  squalls: { en: 'squalls', ru: 'шквалы', be: 'шквалы' },
  tornado: { en: 'tornado', ru: 'торнадо', be: 'тарнада' },
};

export function toTranslate(language = 'en') {
  const arrForTranslate = document.querySelectorAll('[data-i18n]');
  arrForTranslate.forEach(
    // eslint-disable-next-line no-param-reassign
    (elem) => { elem.textContent = translation[elem.dataset.i18n][language]; },
  );
}

export async function toCityTranslate(language = 'en') {
  const cityTranslate = document.querySelector('.city-name');
  if (!cityTranslate) {
    return;
  }
  const res = await getCity(cityTranslate.textContent, language);
  let cityName = res.results[0].components.city;
  if (res.results[0].components.village) {
    cityName = res.results[0].components.village;
  } else if (!cityName) {
    cityName = res.results[0].components.state;
    if (!cityName) {
      cityName = res.results[0].components.town;
    }
  }
  cityTranslate.innerHTML = `${cityName}, ${res.results[0].components.country}`;
}
