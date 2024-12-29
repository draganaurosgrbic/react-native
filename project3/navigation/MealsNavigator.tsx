/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import { NavigationDrawerProp } from "react-navigation-drawer";
import {
  createStackNavigator,
  NavigationStackProp,
} from "react-navigation-stack";
import FavouriteButton from "../components/FavouriteButton";
import MenuButton from "../components/MenuButton";
import { Navigation } from "../constants/navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import MealScreen from "../screens/MealScreen";
import MealsScreen from "../screens/MealsScreen";
import { STACK_CONFIG } from "./stack-config";

export const MealsNavigator = createStackNavigator(
  {
    [Navigation.CATEGORIES]: {
      screen: CategoriesScreen,
      navigationOptions: (props: { navigation: NavigationStackProp }) => {
        return {
          headerTitle: "Categories",
          headerLeft: () => (
            <MenuButton
              navigation={props.navigation as unknown as NavigationDrawerProp}
            />
          ),
        };
      },
    },
    [Navigation.MEALS]: {
      screen: MealsScreen,
      navigationOptions: (props: { navigation: NavigationStackProp }) => {
        return {
          headerTitle: props.navigation.getParam("categoryTitle"),
        };
      },
    },
    [Navigation.MEAL]: {
      screen: MealScreen,
      navigationOptions: (props: { navigation: NavigationStackProp }) => {
        return {
          headerTitle: props.navigation.getParam("mealTitle"),
          headerRight: () => <FavouriteButton navigation={props.navigation} />,
        };
      },
    },
  },
  { defaultNavigationOptions: STACK_CONFIG }
);
