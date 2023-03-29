import {Platform, Image, View, Text, StyleSheet} from "react-native";
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
  const temps = `${Math.floor(weatherData.main.temp)}/${Math.floor(
    weatherData.main.temp_max
  )} ºC`;
  const rainChance = `Chance of Rain ${
    weatherData.rain ? Math.floor(weatherData.rain["1h"]) : 0
  }%`;

  return (
    <View
      style={[
        styles.container,
        Platform.OS === "android" ? styles.androidShadow : styles.iosShadow,
      ]}
    >
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
          <Text style={styles.rainText}>{rainChance}</Text>
        </View>
        <View style={styles.section}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
              height: 80,
              width: 80,
            }}
          />
          <View style={{paddingLeft: 10}}>
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
  },
  iosShadow: {
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  androidShadow: {
    borderColor: "#bdbdbd",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 7,
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
