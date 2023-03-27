import {useRef} from "react";
import {View, Text, TextInput as RNTextInput, StyleSheet} from "react-native";
import {Screen} from "../../components/Screen";
import {TextInput} from "../../components/TextInput";
import {FlashList, ListRenderItem} from "@shopify/flash-list";

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
  const searchRef = useRef<RNTextInput>(null);
  const cities: City[] = require("./citiesReduced.json");
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
        <TextInput ref={searchRef} placeholder="" value="" />
      </View>
      <View style={{height: "100%", width: "100%", justifyContent: "center"}}>
        <FlashList
          data={cities}
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
