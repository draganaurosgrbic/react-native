import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthNavigator from "../navigation/AuthNavigator";
import ShopNavigator from "../navigation/ShopNavigator";
import { login } from "../store/actions/user";
import { RootReducer } from "../store/root-reducer";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

const StartupScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const loggedIn = !!useSelector((state) => (state as RootReducer).user);
  const [autoLoginTried, setAutoLoginTried] = useState(false);

  const tryAutoLogin = async () => {
    await dispatch(login());
  };

  if (!autoLoginTried) {
    return (
      <AppLoading
        startAsync={tryAutoLogin}
        onFinish={() => setAutoLoginTried(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <NavigationContainer>
      {!loggedIn && <AuthNavigator />}
      {loggedIn && <ShopNavigator />}
    </NavigationContainer>
  );
};

export default StartupScreen;
