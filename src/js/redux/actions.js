import {
  CHANGE_GRAD_TO_C,
  CHANGE_GRAD_TO_F,
  CHANGE_LANGUAGE_ON_EN,
  CHANGE_LANGUAGE_ON_RU,
  CHANGE_LANGUAGE_ON_BE,
  CHANGE_IMAGE,
  CHANGE_CITY,
  GET_LOCATION,
  RECEIVE_WEATHER,
  REQUEST_WEATHER,
  SET_ERROR,
  CLEAN_ERROR,
} from './types';
import { mapOpenWeather } from '../apiMappers';
import {
  search, getImageUrl, getLocation, getCity,
} from '../api';
import { preloadImage } from '../utils';

export function changeLanguageEn() {
  return {
    type: CHANGE_LANGUAGE_ON_EN,
  };
}

export function changeLanguageRu() {
  return {
    type: CHANGE_LANGUAGE_ON_RU,
  };
}

export function changeLanguageBe() {
  return {
    type: CHANGE_LANGUAGE_ON_BE,
  };
}

export function changeImage(url) {
  return {
    type: CHANGE_IMAGE,
    payload: url,
  };
}

export function changeGradC() {
  return {
    type: CHANGE_GRAD_TO_C,
  };
}

export function changeGradF() {
  return {
    type: CHANGE_GRAD_TO_F,
  };
}

export function changeLocation(payload) {
  return {
    type: GET_LOCATION,
    payload,
  };
}

export function changeCity(city) {
  return {
    type: CHANGE_CITY,
    payload: city,
  };
}


export function requestWeather(payload) {
  return {
    type: REQUEST_WEATHER,
    payload,
  };
}

export function receiveWeather(payload) {
  return {
    type: RECEIVE_WEATHER,
    payload,
  };
}

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export function cleanError() {
  return {
    type: CLEAN_ERROR,
  };
}

export function fetchImageUrl(city, dt) {
  return async (dispatch) => {
    try {
      const url = await getImageUrl(city, dt);
      await preloadImage(url);
      dispatch(changeImage(url));
    } catch (err) {
      const url = '/assets/images/default.jpg';
      await preloadImage(url);
      dispatch(changeImage(url));
    }
  };
}

export function fetchWeather(lat, lon) {
  return (dispatch) => {
    dispatch(requestWeather(lat, lon));

    return search(lat, lon).then((res) => {
      dispatch(receiveWeather(mapOpenWeather(res)));
      dispatch(changeCity(res.city.name));
      dispatch(fetchImageUrl(res.city.name, res.list[0].dt));
    }).catch(() => {
      dispatch(setError('Unexpected error'));
    });
  };
}

export function fetchCityByCoords(lat, lon, language) {
  return (dispatch) => getLocation(lat, lon, language).then((res) => {
    const localCity = res.results[0].components.town
    || res.results[0].components.city || res.results[0].components.village;
    dispatch(changeCity(localCity));
    dispatch(fetchWeather(lat, lon));
  });
}

export function fetchCity(value) {
  return (dispatch) => {
    dispatch(cleanError());
    getCity(value).then((res) => {
      const { lat, lng: lon } = res.results[0].geometry;
      dispatch(changeLocation({ lat, long: lon }));
      dispatch(fetchCityByCoords(lat, lon));
    }).catch(() => {
      dispatch(setError('City is not defined'));
    });
  };
}
