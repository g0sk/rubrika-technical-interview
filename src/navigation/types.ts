import {RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: {
    coordinates: {
      lon: number;
      lat: number;
    };
  };
  Search: undefined;
};

export type SearchNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Search"
>;

type HomeRouteProp = RouteProp<RootStackParamList, "Home">;

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export type HomeNavigationProps = {
  route: HomeRouteProp;
  navigation: HomeNavigationProp;
};
