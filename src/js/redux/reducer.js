import { combineReducers } from 'redux';
import {
  CHANGE_GRAD_TO_C,
  CHANGE_GRAD_TO_F,
  CHANGE_LANGUAGE_ON_BE,
  CHANGE_LANGUAGE_ON_EN,
  CHANGE_LANGUAGE_ON_RU,
  CHANGE_IMAGE,
  CHANGE_CITY,
  GET_LOCATION,
  RECEIVE_WEATHER,
  SET_ERROR,
  CLEAN_ERROR,
} from './types';

const initialLanguage = localStorage.getItem('language') || 'en';
export function languageReducer(state = initialLanguage, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE_ON_EN:
      localStorage.setItem('language', 'en');
      return 'en';
    case CHANGE_LANGUAGE_ON_RU:
      localStorage.setItem('language', 'ru');
      return 'ru';
    case CHANGE_LANGUAGE_ON_BE:
      localStorage.setItem('language', 'be');
      return 'be';
    default:
      return state;
  }
}

const initialGrad = localStorage.getItem('grad') || 'C';
export function gradReducer(state = initialGrad, action) {
  switch (action.type) {
    case CHANGE_GRAD_TO_C:
      localStorage.setItem('grad', 'C');
      return 'C';
    case CHANGE_GRAD_TO_F:
      localStorage.setItem('grad', 'F');
      return 'F';
    default:
      return state;
  }
}

export function imageReducer(state = '', action) {
  switch (action.type) {
    case CHANGE_IMAGE:
      return action.payload;

    default:
      return state;
  }
}

export function cityReducer(state = 'Minsk', action) {
  switch (action.type) {
    case CHANGE_CITY:
      return action.payload;
    default:
      return state;
  }
}

export function locationReducer(
  state = { lat: 53.893009, long: 27.567444 },
  action,
) {
  switch (action.type) {
    case GET_LOCATION:
      return action.payload;

    default:
      return state;
  }
}

export function weatherReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_WEATHER:
      return action.payload;
    default:
      return state;
  }
}

export function errorReducer(state = '', action) {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    case CLEAN_ERROR:
      return '';
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  language: languageReducer,
  grad: gradReducer,
  image: imageReducer,
  city: cityReducer,
  location: locationReducer,
  weather: weatherReducer,
  error: errorReducer,
});
