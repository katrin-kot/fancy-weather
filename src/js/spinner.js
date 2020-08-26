export function hideSpinner() {
  document.querySelector('.spinner').classList.remove('visible');
  document.querySelector('.search-clear').classList.remove('hidden');
}

export function showSpinner() {
  document.querySelector('.search-clear').classList.add('hidden');
  document.querySelector('.spinner').classList.add('visible');
}

export function renderSpinner() {
  const swiper1 = document.querySelector('.search-clear');
  swiper1.insertAdjacentHTML(
    'afterbegin',
    `<div class = 'spinner'><svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340"><circle cx="170" cy="170" r="160" stroke="#E2007C"/>
  <circle cx="170" cy="170" r="135" stroke="#404041"/>
  <circle cx="170" cy="170" r="110" stroke="#E2007C"/>
  <circle cx="170" cy="170" r="85" stroke="#404041"/></svg></div>`,
  );
}
