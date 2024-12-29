import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

const CustomButton = (props: {
  children: ReactNode;
  onPress: () => void;
}): JSX.Element => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  text: {
    color: "white",
    fontFamily: "open-sans-regular",
    fontSize: 15,
  },
});

export default CustomButton;
