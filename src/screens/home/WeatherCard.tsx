import {Image, View, Text, StyleSheet} from "react-native";
import {type CurrentWeatherResponse} from "../../hooks/weather/useCurrentWeather";
import Icon from "@expo/vector-icons/Ionicons";

type Props = {
  weatherData: CurrentWeatherResponse;
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

export const WeatherCard = ({weatherData}: Props) => {
  const currentDay = `${days[new Date().getDay()]} ${new Date().getUTCDate()}`;
  const temps = `${weatherData.main.temp
    .toString()
    .slice(0, 2)}/${weatherData.main.temp_max.toString().slice(0, 2)} ºC`;
  const rainChance = `Chance of rain ${
    weatherData.rain ? weatherData.rain["1h"] : 0
  }%`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{`${weatherData.name} - Today`}</Text>
        <Icon name="ellipsis-horizontal" size={25} color="#b1b1b1" />
      </View>
      <View style={styles.body}>
        <View style={styles.leftSection}>
          <Text style={styles.text}>{currentDay}</Text>
          <Text style={styles.temperature}>{temps}</Text>
          <Text>{rainChance}</Text>
        </View>
        <View style={styles.rightSection}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
              height: 80,
              width: 80,
            }}
          />
          <Text style={styles.weatherMain}>{weatherData.weather[0].main}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#c4c2c1",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: {
    backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    height: 130,
  },
  leftSection: {
    backgroundColor: "red",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rightSection: {
    backgroundColor: "red",
    alignItems: "center",
    flexDirection: "column",
  },
  weatherMain: {
    fontSize: 18,
    color: "#8797aa",
  },
  text: {
    color: "#8797aa",
  },
  temperature: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
