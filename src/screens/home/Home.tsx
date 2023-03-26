import {View, Text, StyleSheet} from "react-native";
import {Screen} from "../../components/Screen";
import {useCurrentWeather} from "../../hooks/weather/useCurrentWeather";
import {WeatherCard} from "./WeatherCard";
import {ForecastList} from "./ForecastList";

export default function Search() {
  const {data} = useCurrentWeather({lat: 9.26211, lon: 125.964371});
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerText}>{data?.name}</Text>
      </View>
      <View style={styles.weatherCard}>
        {data && <WeatherCard weatherData={data} />}
      </View>
      <View style={{height: "100%", width: "100%"}}>
        <ForecastList />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 45,
    fontWeight: "bold",
  },
  weatherCard: {
    alignItems: "center",
  },
});
