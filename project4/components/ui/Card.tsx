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
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
});

export default Card;
