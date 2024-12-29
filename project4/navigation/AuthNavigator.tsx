import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { MainNavigation } from "../constants/navigation";
import { STACK_CONFIG } from "../constants/stack-config";
import AuthScreen from "../screens/user/AuthScreen";

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = (): JSX.Element => {
  return (
    <AuthStackNavigator.Navigator screenOptions={STACK_CONFIG}>
      <AuthStackNavigator.Screen
        name={MainNavigation.AUTH}
        component={AuthScreen}
        options={{
          headerTitle: "Authenticate",
        }}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
