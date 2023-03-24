import React from "react";
import {View, Dimensions} from "react-native";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

const {width, height} = Dimensions.get("window");

export const Screen = ({children}: {children: React.ReactNode}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="auto" />
      <View style={{height: height, width: width}}>{children}</View>
    </SafeAreaView>
  );
};
