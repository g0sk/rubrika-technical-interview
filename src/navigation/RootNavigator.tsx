import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {Home} from "../screens/home/Home";
import {Search} from "../screens/search/Search";
import {type RootStackParamList} from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({route}) => ({
          headerShown: true,
          coordinates: route.params.coordinates,
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default function NavigationProvider() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
