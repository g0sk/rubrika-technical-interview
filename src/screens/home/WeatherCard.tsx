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
  const rainChance = `Chance of Rain ${
    weatherData.rain ? Math.floor(weatherData.rain["1h"]) : 0
  }%`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{`${weatherData.name} - Today`}</Text>
        <Icon name="ellipsis-horizontal" size={25} color="#bdbdbd" />
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <View>
            <Text style={styles.currentDay}>{currentDay}</Text>
            <Text style={styles.temperature}>{temps}</Text>
          </View>
          <View>
            <Text style={styles.rainText}>{rainChance}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
              height: 75,
              width: 75,
            }}
          />
          <View style={styles.subSection}>
            <Text style={styles.weatherMain}>
              {weatherData.weather[0].main}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: 300,
    paddingHorizontal: 25,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#c4c2c1",
  },
  header: {
    paddingTop: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 15,
    color: "#818199",
  },
  currentDay: {
    color: "#818199",
    fontSize: 15,
  },
  body: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: 40,
  },
  subSection: {},
  rainText: {
    fontSize: 17,
  },
  weatherMain: {
    fontSize: 16,
    color: "#818199",
  },
  temperature: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
