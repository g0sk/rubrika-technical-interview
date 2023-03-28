import {Button, View, Text, StyleSheet} from "react-native";
import {Screen} from "../../components/Screen";
import {useCurrentWeather} from "../../hooks/weather/useCurrentWeather";
import {WeatherCard} from "./WeatherCard";
import {ForecastList} from "./ForecastList";
import {HomeNavigationProps} from "../../navigation/types";

export const Home: React.FC<HomeNavigationProps> = ({route, navigation}) => {
  const {data} = useCurrentWeather(route.params.coordinates);
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{data?.name}</Text>
        </View>
        <View style={styles.weatherCard}>
          {data && <WeatherCard weatherData={data} />}
        </View>
        <View style={{height: "100%", width: "100%"}}>
          <ForecastList />
        </View>
        <View style={styles.button}>
          <Button
            title="Search"
            onPress={() => navigation.navigate("Search")}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    marginTop: 40,
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  weatherCard: {
    alignItems: "center",
    marginVertical: 30,
  },
  button: {
    borderRadius: 8,
    zIndex: 10,
  },
});
