import {FlashList} from "@shopify/flash-list";
import {FlatList} from "react-native";
import {useForecastWeather} from "../../hooks/weather/useForecastWeather";
import {ForecastListItem} from "./ForecastListItem";
import {type CityCoordinates} from "../../hooks/weather/useCurrentWeather";

type ForecastListProps = {
  coordinates: CityCoordinates;
};

export const ForecastList = ({coordinates}: ForecastListProps) => {
  const {data, isLoading, refetch} = useForecastWeather(coordinates);

  return (
    <FlatList
      data={data?.list}
      renderItem={({item}) => <ForecastListItem forecastItem={item} />}
      keyExtractor={(_item, idx) => idx.toString()}
      showsVerticalScrollIndicator={false}
      onRefresh={refetch}
      refreshing={isLoading}
    />
  );
};
