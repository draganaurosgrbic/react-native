import React from "react";
import { createAppContainer, SafeAreaView } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { DrawerNavigatorItemsProps } from "react-navigation-drawer/lib/typescript/src/types";
import { COLORS } from "../constants/colors";
import { Navigation } from "../constants/navigation";
import { FiltersNavigator } from "./FiltersNavigator";
import { MealsFavouritesNavigator } from "./MealsFavouritesNavigator";

const MainNavigator = createDrawerNavigator(
  {
    [Navigation.MEALS]: {
      screen: MealsFavouritesNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    [Navigation.FILTERS]: {
      screen: FiltersNavigator,
      navigationOptions: {
        drawerLabel: "Filters",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: COLORS.primary,
      inactiveTintColor: "grey",
    },
    contentComponent: (props: DrawerNavigatorItemsProps) => {
      return (
        <SafeAreaView style={{ paddingTop: 50 }}>
          <DrawerItems {...props} />
        </SafeAreaView>
      );
    },
  }
);

export default createAppContainer(MainNavigator);
