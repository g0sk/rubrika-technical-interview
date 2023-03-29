import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Screen} from "../../components/Screen";
import {useCurrentWeather} from "../../hooks/weather/useCurrentWeather";
import {WeatherCard} from "./WeatherCard";
import {ForecastList} from "./ForecastList";
import {HomeNavigationProps} from "../../navigation/types";
import Icon from "@expo/vector-icons/Ionicons";

export const Home: React.FC<HomeNavigationProps> = ({route, navigation}) => {
  const {data} = useCurrentWeather(route.params.coordinates);
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>{data?.name}</Text>
        </View>
        <View style={styles.weatherCard}>
          {data && <WeatherCard weatherData={data} />}
        </View>
        <View style={styles.list}>
          <ForecastList coordinates={route.params.coordinates} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Search City</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 40,
  },
  icon: {
    marginTop: 20,
    marginLeft: 20,
  },
  header: {
    marginTop: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  list: {
    marginHorizontal: 20,
    height: 450,
    width: "100%",
    elevation: 1,
  },
  weatherCard: {
    alignItems: "center",
    marginVertical: 30,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: 350,
    backgroundColor: "#6d5bff",
    height: 50,
    elevation: 8,
    bottom: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
