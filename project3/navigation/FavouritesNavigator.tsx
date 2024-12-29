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
import FavouritesScreen from "../screens/FavouritesScreen";
import MealScreen from "../screens/MealScreen";
import { STACK_CONFIG } from "./stack-config";

export const FavouritesNavigator = createStackNavigator(
  {
    [Navigation.FAVOURITES]: {
      screen: FavouritesScreen,
      navigationOptions: (props: { navigation: NavigationStackProp }) => {
        return {
          headerTitle: "Favourite Meals",
          headerLeft: () => (
            <MenuButton
              navigation={props.navigation as unknown as NavigationDrawerProp}
            />
          ),
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
