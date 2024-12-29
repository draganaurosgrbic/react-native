import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { COLORS } from "../../constants/colors";
import { User } from "../../models/user";
import { login, register } from "../../store/actions/user";

enum FormInputKey {
  email = "email",
  password = "password",
}

const AuthScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState(false);
  const [formValue, setFormValue] = useState({} as User);
  const [formValidity, setFormValidity] = useState({
    email: false,
    password: false,
  });

  const formValid = () => {
    return Object.values(formValidity).reduce((a, b) => a && b, true);
  };

  const inputChangeHandler = (
    key: FormInputKey,
    value: string,
    validity: boolean
  ) => {
    setFormValue((prevValue) => {
      return { ...prevValue, [key]: value };
    });
    setFormValidity((prevValidity) => {
      return {
        ...prevValidity,
        [key]: validity,
      };
    });
  };

  const authHandler = async () => {
    if (!formValid()) {
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(registration ? register(formValue) : login(formValue));
    } catch {
      Alert.alert("ERROR!", "Check your credentials", [
        {
          text: "Okay",
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.screen}>
        <LinearGradient style={styles.gradient} colors={["#ffedff", "#ffe3ff"]}>
          <Card style={styles.auth}>
            <Input
              label="Email"
              errorText="Please enter a valid email address"
              value={formValue.email || ""}
              keyboardType="email-address"
              autoCapitalize="none"
              required
              email
              onInputChange={inputChangeHandler.bind(null, FormInputKey.email)}
            />
            <Input
              label="Password"
              errorText="Please enter a valid password"
              value={formValue.password || ""}
              secureTextEntry
              keyboardType="default"
              autoCapitalize="none"
              required
              minLength={5}
              onInputChange={inputChangeHandler.bind(
                null,
                FormInputKey.password
              )}
            />
            <View style={styles.button}>
              {isLoading ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : (
                <Button
                  title={registration ? "Register" : "Login"}
                  color={COLORS.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.button}>
              <Button
                title={`Switch to ${registration ? "Login" : "Register"}`}
                color={COLORS.accent}
                onPress={() => setRegistration((prevState) => !prevState)}
              />
            </View>
          </Card>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  auth: {
    width: "80%",
    padding: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default AuthScreen;
