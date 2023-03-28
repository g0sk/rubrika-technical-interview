import {Image, View, Text, StyleSheet} from "react-native";

type ForecastListItemProps = {
  forecastItem: ForecastListItem;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const ForecastListItem = ({forecastItem}: ForecastListItemProps) => {
  const forecastDate = new Date(forecastItem.dt_txt);
  const forecastDay = `${days[forecastDate.getDay()]}`;
  const forecastTime = `${forecastDate.getHours()}:00`;
  const rainChance = `${
    forecastItem.rain ? Math.floor(forecastItem.rain["3h"]) : 0
  }%`;
  const temp = `${forecastItem.main.temp.toString().slice(0, 2)}`;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.section}>
        <Text style={styles.data}>{forecastDay}</Text>
        <Text style={styles.data}>{forecastTime}</Text>
      </View>
      {forecastItem.weather.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.data}>{forecastItem.weather[0].main}</Text>
          <Text style={styles.weatherDescription}>
            {forecastItem.weather[0].description}
          </Text>
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.data}>Rain</Text>
        <Text style={styles.data}>{rainChance}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.data}>ºC</Text>
        <Text>{temp}</Text>
      </View>
      <View style={styles.section}>
        <View>
          <Image
            source={{
              uri: `https://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png`,
              height: 45,
              width: 45,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#c4c2c1",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    justifyContent: "space-between",
  },
  section: {
    flexDirection: "column",
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
  descriptionSection: {
    flexDirection: "column",
    marginHorizontal: 10,
    justifyContent: "space-between",
    minWidth: 200,
  },
  data: {
    fontSize: 16,
  },
  weatherDescription: {
    textTransform: "capitalize",
    fontSize: 16,
    color: "#8797aa",
  },
});

export type ForecastListItem = {
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
