import {Image, View, Text, StyleSheet} from "react-native";
import {type ForecastItem} from "../../hooks/weather/useForecastWeather";
type ForecastListItemProps = {
  forecastItem: ForecastItem;
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
  const temp = `${Math.floor(forecastItem.main.temp)}`;

  return (
    <View style={styles.itemContainer}>
      <View
        style={{
          flexDirection: "column",
          width: 100,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.row}>
          <Text style={styles.label}>{forecastDay}</Text>
        </View>
        <Text style={styles.data}>{forecastTime}</Text>
      </View>
      {forecastItem.weather.length > 0 && (
        <View
          style={{
            flexDirection: "column",
            width: 110,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.row}>
            <Text style={styles.label}>{forecastItem.weather[0].main}</Text>
          </View>
          <Text style={styles.weatherDescription}>
            {forecastItem.weather[0].description}
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "column",
          width: 50,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.row}>
          <Text style={styles.label}>Rain</Text>
        </View>
        <Text style={styles.data}>{rainChance}</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          width: 50,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.row}>
          <Text style={styles.label}>ºC</Text>
        </View>
        <Text style={styles.data}>{temp}</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          width: 45,
          justifyContent: "space-between",
        }}
      >
        <Image
          source={{
            uri: `https://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png`,
            height: 45,
            width: 45,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 90,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c4c2c1",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  row: {
    paddingBottom: 10,
  },
  descriptionSection: {
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: 200,
  },
  label: {
    fontSize: 16,
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
