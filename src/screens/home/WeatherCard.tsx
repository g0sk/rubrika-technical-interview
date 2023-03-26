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
        <View style={styles.header}>
          <Text style={styles.text}>{`${weatherData.name} - Today`}</Text>
        </View>
        <Icon name="ellipsis-horizontal" size={25} color="grey" />
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <View>
            <View>
              <Text>{currentDay}</Text>
            </View>
            <View>
              <Text>{temps}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
                height: 80,
                width: 80,
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <Text>{rainChance}</Text>
        </View>
        <View>
          <Text>
            {weatherData.weather.length > 0 ? weatherData.weather[0].main : ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 50,
    marginTop: 50,
    marginBottom: 20,
    height: 220,
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: {
    paddingTop: 20,
    flexDirection: "column",
  },
  text: {
    color: "black",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
