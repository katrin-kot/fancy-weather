import { store } from './store';

export function initMap(location, location1) {
  window.mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0cmluLWtvdCIsImEiOiJja2FsNWFuczcwOGs5MnltdnZ4c2VjN29jIn0.fQXkjfcE4FH_7XlUKyRWAQ';
  const map = new window.mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [location1, location],
    zoom: 8,
  });

  new window.mapboxgl.Marker()
    .setLngLat([location1, location])
    .addTo(map);
}

export async function renderLocation(lat, lon) {
  const map = document.querySelector('.map-block');
  const latitude = Math.round((Math.round(lat) - lat) * 100);
  const longitude = Math.round((lon - Math.round(lon)) * 100);
  const mapText = document.querySelector('.map-text');
  mapText.innerHTML = `<p><span data-i18n = 'lat'>Latitude</span>: ${Math.round(
    lat,
  )}°${latitude}'</p><p><span data-i18n = 'long'>Longitude</span>: ${Math.round(
    lon,
  )}°${longitude}'</p>`;
  map.innerHTML = '<div id="map"></div>';
  await initMap(lat, lon);
}

let currentLocation = {};
export function handleChangeLocation() {
  const state = store.getState();
  const previousLocation = currentLocation;
  currentLocation = state.location;
  if (currentLocation.lat !== previousLocation.lat) {
    renderLocation(currentLocation.lat, currentLocation.long);
  }
}
