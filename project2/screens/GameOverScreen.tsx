import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constants/colors";

const GameOverScreen = (props: {
  selectedNumber: number;
  roundsNumber: number;
  onRestartGame: () => void;
}): JSX.Element => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Game Over!</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/success.png")} />
      </View>
      <View style={styles.result}>
        <Text style={styles.text}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.selectedNumber}</Text>.
        </Text>
      </View>
      <CustomButton onPress={props.onRestartGame}>NEW GAME</CustomButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  text: {
    fontFamily: "open-sans-regular",
    fontSize: 20,
    textAlign: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: "black",
    borderWidth: 3,
    overflow: "hidden",
    marginVertical: 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  result: {
    marginHorizontal: 40,
    marginVertical: 20,
  },
  highlight: {
    color: COLORS.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
