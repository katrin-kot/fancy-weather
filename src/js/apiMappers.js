/* eslint-disable camelcase */
export function mapOpenWeather(data) {
  const list = data.list.map((item) => {
    const {
      dt, main, weather, wind,
    } = item;
    const { temp, feels_like, humidity } = main;
    const { icon, description } = weather[0];
    const { speed } = wind;

    return {
      dt,
      temperature: temp,
      feelsLike: feels_like,
      humidity,
      icon,
      description,
      windSpeed: speed,
    };
  });
  return {
    city: data.city.name,
    timezone: data.city.timezone,
    country: data.city.country,
    list,
  };
}
