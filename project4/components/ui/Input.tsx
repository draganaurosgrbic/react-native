import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface InputProps {
  label: string;
  errorText: string;
  value: string;
  onInputChange: (value: string, validity: boolean) => void;
  secureTextEntry?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  number?: boolean;
}

const Input = (props: InputProps): JSX.Element => {
  const inputValid = (value: string): boolean => {
    const emailRegex =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (props.required && !value.trim()) {
      return false;
    }
    if (props.email && !emailRegex.test(value.toLowerCase())) {
      return false;
    }
    if (props.min !== undefined && props.min != null && +value < props.min) {
      return false;
    }
    if (props.max != undefined && props.max != null && +value > props.max) {
      return false;
    }
    if (
      props.minLength !== undefined &&
      props.minLength != null &&
      value.length < props.minLength
    ) {
      return false;
    }
    if (props.number && isNaN(+value)) {
      return false;
    }
    return true;
  };

  const [value, setValue] = useState(props.value);
  const [validity, setValidity] = useState(inputValid(props.value));
  const [touched, setTouched] = useState(false);

  const inputChangeHandler = (value: string) => {
    setValue(value);
    setValidity(inputValid(value));
    props.onInputChange(value, inputValid(value));
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={value}
        onChangeText={inputChangeHandler}
        onBlur={() => setTouched(true)}
      />
      {touched && !validity && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});

export default Input;
