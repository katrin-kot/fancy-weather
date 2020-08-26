export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.src = src;
    img.onerror = () => reject();
  });
}

export function backgroundLoader(url) {
  const img = document.querySelector('main');
  const urlImage = `url(/assets/images/background.svg),url(${url})`;
  img.style.backgroundImage = urlImage;
}

export function createImageUrlcall(value, dt) {
  const now = new Date(dt * 1000);
  const month = now.getMonth() + 1;
  const hour = now.getHours();
  let season;
  if (month < 3 || month === 12) {
    season = 'winter';
  }
  if (month > 3 && month < 6) {
    season = 'spring';
  }
  if (month > 5 && month < 9) {
    season = 'summer';
  }
  if (month < 12 && month > 9) {
    season = 'autumn';
  }
  if (hour < 12 && hour > 5) {
    return `${value} cityscape ${season} morning`;
  }
  if (hour > 12 && hour < 17) {
    return `${value} cityscape ${season} day`;
  }
  if (hour > 17 && hour <= 23) {
    return `${value} cityscape ${season} evening`;
  }
  return `${value} cityscape ${season} night`;
}
