import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const Card = (props: {
  children: ReactNode;
  style?: {
    [key: string]: unknown;
  };
}): JSX.Element => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 8,
  },
});

export default Card;
