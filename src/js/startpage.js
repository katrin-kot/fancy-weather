import { fetchCityByCoords, changeLocation } from './redux/actions';
import { store } from './store';

export function startPage() {
  const options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  };


  function success(pos) {
    const crd = pos.coords;
    store.dispatch(fetchCityByCoords(crd.latitude, crd.longitude, store.getState().language));
    store.dispatch(changeLocation({ lat: crd.latitude, long: crd.longitude }));
  }

  function error() {
    const state = store.getState();
    const crd = state.location;
    store.dispatch(fetchCityByCoords(crd.lat, crd.long, store.getState().language));
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}
