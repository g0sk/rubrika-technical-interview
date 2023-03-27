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
        <RNTextInput ref={ref} {...props} style={{width: 250}} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    height: 35,
    backgroundColor: "grey",
    paddingHorizontal: 5,
  },
  icon: {
    marginRight: 5,
  },
});
