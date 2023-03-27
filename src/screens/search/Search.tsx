import {useMemo, useRef, useState} from "react";
import {View, Text, TextInput as RNTextInput, StyleSheet} from "react-native";
import {Screen} from "../../components/Screen";
import {TextInput} from "../../components/TextInput";
import {FlashList, ListRenderItem} from "@shopify/flash-list";
import debounce from "lodash.debounce";

type City = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
};

export default function Search() {
  const [query, setQuery] = useState("");
  const cities: City[] = require("./citiesReduced.json");
  const [filteredCities, setFilteredCities] = useState<City[]>([...cities]);
  const searchRef = useRef<RNTextInput>(null);

  const handleOnChangeText = (text: string) => {
    setQuery(text);
    debounceSearch(text);
  };

  /**
   * Currently searching by substrings, not by characters
   */
  const debounceSearch = useMemo(
    () =>
      debounce((text: string) => {
        setFilteredCities(
          cities.filter((city) =>
            city.name.toLowerCase().includes(text.toLowerCase())
          )
        );
      }, 500),
    [query]
  );

  const renderItem: ListRenderItem<City> = ({item}) => {
    return (
      <View
        style={{
          height: 40,
          padding: 5,
          marginTop: 20,
          marginHorizontal: 20,
          alignItems: "center",
          backgroundColor: "grey",
          borderRadius: 4,
          width: 350,
        }}
      >
        <Text>{`${item.name} | ${item.country}`}</Text>
      </View>
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <TextInput
          ref={searchRef}
          placeholder=""
          value={query}
          onChangeText={(e) => handleOnChangeText(e)}
        />
      </View>
      <View style={{height: "100%", width: "100%", justifyContent: "center"}}>
        <FlashList
          data={filteredCities}
          keyExtractor={(_item, idx) => idx.toString()}
          renderItem={renderItem}
          estimatedItemSize={50}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 50,
  },
});
