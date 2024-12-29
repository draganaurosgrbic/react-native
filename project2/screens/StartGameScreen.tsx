import React, { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import Number from "../components/Number";
import { COLORS } from "../constants/colors";

const StartGameScreen = (props: {
  onStartGame: (selectedNumber: number) => void;
}): JSX.Element => {
  const [enteredValue, setEnteredValue] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(NaN);
  const [confirmed, setConfirmed] = useState(false);

  const inputChangeHandler = (text: string) => {
    setEnteredValue(text.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setSelectedNumber(NaN);
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const nextNumber = parseInt(enteredValue);
    if (isNaN(nextNumber) || nextNumber <= 0 || nextNumber >= 100) {
      Alert.alert("Invalid number!", "Number has to be between 1 and 99.", [
        {
          text: "Okay",
          onPress: resetInputHandler,
        },
      ]);
      return;
    }
    setEnteredValue("");
    setSelectedNumber(nextNumber);
    setConfirmed(true);
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start New Game!</Text>
            <Card style={styles.inputContainer}>
              <Text style={styles.text}>Select a Number</Text>
              <Input
                style={styles.input}
                onChangeText={inputChangeHandler}
                value={enteredValue}
                blurOnSubmit
                autoCorrect={false}
                autoCapitalize="none"
                maxLength={2}
                keyboardType="number-pad"
              ></Input>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title="Reset"
                    color={COLORS.accent}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title="Confirm"
                    color={COLORS.primary}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {!!confirmed && (
              <Card style={styles.summaryContainer}>
                <Text style={styles.text}>You selected</Text>
                <Number>{selectedNumber}</Number>
                <CustomButton
                  onPress={props.onStartGame.bind(null, selectedNumber)}
                >
                  START GAME
                </CustomButton>
              </Card>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    marginVertical: 20,
  },
  text: {
    fontFamily: "open-sans-regular",
  },
  inputContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "40%",
  },
  summaryContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartGameScreen;
