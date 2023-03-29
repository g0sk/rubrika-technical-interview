import {API_KEY} from "@env";
import Api from "../../services/api/api";
import {useQuery} from "@tanstack/react-query";
import {type CityCoordinates} from "./useCurrentWeather";

export type ForecastWeatherResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: [
    {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      visibility: number;
      pop: number;
      rain?: {
        "3h": number;
      };
      snow?: {
        "3h": number;
      };
      sys: {
        pod: string;
      };
      dt_txt: string;
    }
  ];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  snow?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
};

const fetchForecastWeather = ({
  lat,
  lon,
}: CityCoordinates): Promise<ForecastWeatherResponse> => {
  return Api.get(
    `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  ).then((res) => res.data);
};

export const useForecastWeather = ({lat, lon}: CityCoordinates) => {
  const result = useQuery<ForecastWeatherResponse>({
    queryKey: ["forecastWeather", lat, lon],
    queryFn: () => fetchForecastWeather({lat, lon}),
  });
  return result;
};
