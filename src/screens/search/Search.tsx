import {useMemo, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Screen} from "../../components/Screen";
import {TextInput} from "../../components/TextInput";
import {FlashList, ListRenderItem} from "@shopify/flash-list";
import {type SearchNavigationProp} from "../../navigation/types";
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

type SearchScreenProps = {
  navigation: SearchNavigationProp;
};

export const Search = ({navigation}: SearchScreenProps) => {
  const [query, setQuery] = useState("");
  /**
   * JSON file is too large to be imported directly (40MB). It could be chunked
   * using JSONStream. Right now its just a reduced version of the original file.
   */
  const cities: City[] = require("../../../resources/citiesReduced.json");
  const [filteredCities, setFilteredCities] = useState<City[]>([...cities]);

  const handleOnChangeText = (text: string) => {
    setQuery(text);
    debounceSearch(text);
  };

  const debounceSearch = useMemo(
    () =>
      debounce((text: string) => {
        const pattern = new RegExp(text.split("").join(".*"), "i");
        const filteredData = cities.filter((city) => pattern.test(city.name));
        setFilteredCities(filteredData);
      }, 500),
    [query]
  );

  const renderItem: ListRenderItem<City> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Home", {coordinates: item.coord})}
      >
        <View style={styles.item}>
          <Text
            style={styles.itemText}
          >{`${item.name} | ${item.country}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            placeholder=""
            value={query}
            onChangeText={(e) => handleOnChangeText(e)}
          />
        </View>
        <View style={styles.list}>
          <FlashList
            data={filteredCities}
            keyExtractor={(_item, idx) => idx.toString()}
            renderItem={renderItem}
            estimatedItemSize={50}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 15,
  },
  list: {
    flex: 2,
    marginTop: 20,
    marginHorizontal: 35,
    height: 400,
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#e6e6e6",
    height: 48,
    padding: 5,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  itemText: {
    fontSize: 17,
  },
});
