import { store } from './store';

export function renderError(error) {
  const errorText = document.querySelector('.search-error');
  const todayblock = document.querySelector('.today-block');
  let formattedError = error;
  if (error === 'City is not defined') {
    const state = store.getState();
    if (state.language === 'en') {
      formattedError = 'City is not defined';
    }
    if (state.language === 'ru') {
      formattedError = 'Город не найден';
    }
    if (state.language === 'be') {
      formattedError = 'Горад не знойдзен';
    }
  }
  if (errorText) {
    errorText.textContent = formattedError;
  } else {
    todayblock.insertAdjacentHTML(
      'beforeBegin',
      `<p class = "search-error">${formattedError}</p>`,
    );
  }
}
