import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

const Number = (props: { children: number }): JSX.Element => {
  return (
    <View style={styles.number}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  number: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: COLORS.accent,
    borderWidth: 1,
  },
  text: {
    color: COLORS.accent,
    fontFamily: "open-sans-regular",
    fontSize: 20,
  },
});

export default Number;
