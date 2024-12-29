import AppLoading from "expo-app-loading";
import { loadAsync } from "expo-font";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Header from "./components/Header";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

const fetchFonts = () => {
  return loadAsync({
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App(): JSX.Element {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(NaN);
  const [roundsNumber, setRoundsNumber] = useState(NaN);

  const restartGameHandler = () => {
    setSelectedNumber(NaN);
    setRoundsNumber(NaN);
  };

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={setFontsLoaded.bind(null, true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header>Guess a Number</Header>
      {!selectedNumber && <StartGameScreen onStartGame={setSelectedNumber} />}
      {!!selectedNumber && !roundsNumber && (
        <GameScreen
          selectedNumber={selectedNumber}
          onGameOver={setRoundsNumber}
        />
      )}
      {!!selectedNumber && !!roundsNumber && (
        <GameOverScreen
          selectedNumber={selectedNumber}
          roundsNumber={roundsNumber}
          onRestartGame={restartGameHandler}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
