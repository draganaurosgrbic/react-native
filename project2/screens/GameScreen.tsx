import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import Number from "../components/Number";

const generateRandomNumber = (
  min: number,
  max: number,
  exclude: number
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min)) + min;
  if (random !== exclude) {
    return random;
  }
  return generateRandomNumber(min, max, exclude);
};

const GameScreen = (props: {
  selectedNumber: number;
  onGameOver: (roundsNumber: number) => void;
}): JSX.Element => {
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const initialGuess = generateRandomNumber(
    currentLow.current,
    currentHigh.current,
    props.selectedNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [deviceDimensions, setDeviceDimensions] = useState(
    Dimensions.get("window")
  );

  useEffect(() => {
    if (currentGuess === props.selectedNumber) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess]);

  useEffect(() => {
    const updateLayout = () => setDeviceDimensions(Dimensions.get("window"));
    Dimensions.addEventListener("change", updateLayout);
    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  const nextGuessHandler = (direction: "lower" | "greater") => {
    if (
      (direction === "lower" && currentGuess < props.selectedNumber) ||
      (direction === "greater" && currentGuess > props.selectedNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        {
          text: "Sorry!",
        },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((currentPastGuesses) => [nextNumber, ...currentPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{"Opponent's Guess"}</Text>
      {deviceDimensions.height < 500 ? (
        <View style={styles.controls}>
          <CustomButton onPress={nextGuessHandler.bind(null, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </CustomButton>
          <Number>{currentGuess}</Number>
          <CustomButton onPress={nextGuessHandler.bind(null, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </CustomButton>
        </View>
      ) : (
        <React.Fragment>
          <Number>{currentGuess}</Number>
          <Card style={styles.controls}>
            <CustomButton onPress={nextGuessHandler.bind(null, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </CustomButton>
            <CustomButton onPress={nextGuessHandler.bind(null, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </CustomButton>
          </Card>
        </React.Fragment>
      )}
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.text}>#{pastGuesses.length - index}</Text>
              <Text style={styles.text}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  text: {
    fontFamily: "open-sans-regular",
  },
  controls: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  listItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    padding: 15,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default GameScreen;
