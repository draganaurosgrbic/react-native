import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

const Header = (props: { children: string }): JSX.Element => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: COLORS.primary,
  },
  text: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
});

export default Header;
