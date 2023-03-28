import {forwardRef} from "react";
import {
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  View,
  StyleSheet,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

interface TextInputProps extends RNTextInputProps {}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => {
    return (
      <View style={styles.container}>
        <Icon
          style={styles.icon}
          name="search-outline"
          size={22}
          color="black"
        />
        <RNTextInput
          ref={ref}
          {...props}
          style={{width: 262, paddingLeft: 5}}
          selectionColor="#000"
          underlineColorAndroid="transparent"
          cursorColor="#000"
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: "#e6e6e6",
  },
  icon: {
    marginRight: 5,
  },
});
