import React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  blurOnSubmit?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  style?: {
    [key: string]: unknown;
  };
}

const Input = (props: InputProps): JSX.Element => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    marginVertical: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});

export default Input;
