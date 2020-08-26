import { store } from './store';


export function renderDate(day1, day2, day3) {
  const now = new Date();
  const month = now.getMonth();
  const date = now.getDate();
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const time = document.querySelector('.day-time');
  const week1 = document.querySelector('.oneday-week1');
  const week2 = document.querySelector('.oneday-week2');
  const week3 = document.querySelector('.oneday-week3');
  const opt = { weekday: 'long' };
  const days = [
    'Нядзеля',
    'Панядзелак',
    'Аўторак',
    'Серада',
    'Чацвер',
    'Пятнiца',
    'Субота',
  ];
  const translateWeek = ['Hдз', 'Пн', 'Аўт', 'Ср', 'Чц', 'Пт', 'Сб'];
  const translateMonth = [
    'Студзеня',
    'Лютага',
    'Сакавiка',
    'Красавiка',
    'Мая',
    'Чэрвеня',
    'Лiпеня',
    'Жнiўня',
    'Верасня',
    'Кастрычнiка',
    'Лiстапада',
    'Снежня',
  ];
  const state = store.getState();
  if (state.language === 'be') {
    time.textContent = `${translateWeek[now.getDay()]} ${date} ${
      translateMonth[month]
    } ${now.getFullYear()}`;
    week1.textContent = `${days[day1.getDay()]}`;
    week2.textContent = `${days[day2.getDay()]}`;
    week3.textContent = `${days[day3.getDay()]}`;
  } else {
    time.textContent = now.toLocaleDateString(state.language, options);
    week1.textContent = day1.toLocaleDateString(state.language, opt);
    week2.textContent = day2.toLocaleDateString(state.language, opt);
    week3.textContent = day3.toLocaleDateString(state.language, opt);
  }
}
