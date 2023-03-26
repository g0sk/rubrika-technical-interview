import {useQuery} from "@tanstack/react-query";
import Api from "../../services/api/api";
import {API_KEY} from "@env";

export type CityCoordinates = {
  lat: number;
  lon: number;
};

export type CurrentWeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h": number;
    "3h": number;
  };
  snow?: {
    "1h": number;
    "3h": number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

/**
 * Fetches the current weather for a given city lattitude and longitude
 * Setted to metric units
 */
const fetchCurrentWeather = ({
  lat,
  lon,
}: CityCoordinates): Promise<CurrentWeatherResponse> => {
  return Api.get(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  ).then((res) => res.data);
};

export const useCurrentWeather = (coordinates: CityCoordinates) => {
  const result = useQuery<CurrentWeatherResponse>({
    queryKey: ["currentWeather", coordinates],
    queryFn: () => fetchCurrentWeather(coordinates),
  });
  return result;
};
