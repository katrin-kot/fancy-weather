import { startPage } from './startpage';
import { store } from './store';
import { changeCity, fetchCity } from './redux/actions';


export async function handleSearch(event) {
  const input = document.querySelector('input');
  event.preventDefault();
  store.dispatch(changeCity(input.value));
  store.dispatch(fetchCity(input.value));
}


export async function renderContent() {
  startPage();
  const input = document.querySelector('input');
  const clean = document.querySelector('.search-clear');
  clean.addEventListener('click', () => { input.value = ''; });
  input.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  });
  const find = document.querySelector('.search-btn');
  find.addEventListener('click', (event) => {
    handleSearch(event);
  });
}
