import {FlashList} from "@shopify/flash-list";
import {useForecastWeather} from "../../hooks/weather/useForecastWeather";
import {ForecastListItem} from "./ForecastListItem";

export const ForecastList = () => {
  const {data} = useForecastWeather({lat: 9.26211, lon: 125.964371});
  return (
    <FlashList
      data={data?.list}
      renderItem={({item}) => <ForecastListItem forecastItem={item} />}
      keyExtractor={(_item, idx) => idx.toString()}
      estimatedItemSize={40}
    />
  );
};
