import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Navigation } from "../constants/navigation";
import { Text } from "react-native";
import { COLORS } from "../constants/colors";
import { MealsNavigator } from "./MealsNavigator";
import { FavouritesNavigator } from "./FavouritesNavigator";

export const MealsFavouritesNavigator = createMaterialBottomTabNavigator(
  {
    [Navigation.MEALS]: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo: { tintColor: string }) => (
          <Ionicons name="md-restaurant" size={25} color={tabInfo.tintColor} />
        ),
        tabBarLabel: <Text>Meals</Text>,
      },
    },
    [Navigation.FAVOURITES]: {
      screen: FavouritesNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo: { tintColor: string }) => (
          <Ionicons name="md-star" size={25} color={tabInfo.tintColor} />
        ),
        tabBarLabel: <Text>Favourites</Text>,
      },
    },
  },
  {
    barStyle: {
      backgroundColor: COLORS.primary,
    },
    activeColor: "white",
  }
);
