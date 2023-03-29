import {useRef} from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {Screen} from "../../components/Screen";
import {useCurrentWeather} from "../../hooks/weather/useCurrentWeather";
import {WeatherCard} from "./WeatherCard";
import {HomeNavigationProps} from "../../navigation/types";
import Icon from "@expo/vector-icons/Ionicons";
import {
  ForecastItem,
  useForecastWeather,
} from "../../hooks/weather/useForecastWeather";
import {ForecastListItem} from "./ForecastListItem";

export const Home: React.FC<HomeNavigationProps> = ({route, navigation}) => {
  const {data} = useCurrentWeather(route.params.coordinates);
  const listRef = useRef<FlatList<ForecastItem>>(null);
  const ForecastList = () => {
    const {
      data: forecastData,
      isLoading,
      refetch,
    } = useForecastWeather(route.params.coordinates);

    return (
      <View>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator
              size="large"
              color="#6d5bff"
              animating={isLoading}
            />
          </View>
        ) : (
          <View style={{justifyContent: "center", alignItems: "center"}}>
            <FlatList
              ref={listRef}
              data={forecastData?.list}
              renderItem={({item}) => <ForecastListItem forecastItem={item} />}
              keyExtractor={(_item, idx) => idx.toString()}
              showsVerticalScrollIndicator={false}
              onRefresh={refetch}
              refreshing={isLoading}
              contentContainerStyle={{paddingBottom: 120}}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Search City</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: "center"}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                listRef.current?.scrollToIndex({
                  index: 0,
                  animated: true,
                })
              }
            >
              <Text style={styles.headerText}>{data?.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.weatherCard}>
            {data && <WeatherCard weatherData={data} />}
          </View>
          <View style={styles.list}>
            <ForecastList />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loading: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    marginHorizontal: 30,
    width: "100%",
    height: 500,
  },
  weatherCard: {
    alignItems: "center",
    marginVertical: 30,
  },
  button: {
    borderRadius: 40,
    width: 350,
    backgroundColor: "#6d5bff",
    height: 50,
    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
