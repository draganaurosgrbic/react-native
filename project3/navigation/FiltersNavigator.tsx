/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import { NavigationDrawerProp } from "react-navigation-drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
  createStackNavigator,
  NavigationStackProp,
} from "react-navigation-stack";
import CustomHeaderButton from "../components/CustomHeaderButton";
import MenuButton from "../components/MenuButton";
import { Navigation } from "../constants/navigation";
import FiltersScreen from "../screens/FiltersScreen";
import { STACK_CONFIG } from "./stack-config";

export const FiltersNavigator = createStackNavigator(
  {
    [Navigation.FILTERS]: {
      screen: FiltersScreen,
      navigationOptions: (props: { navigation: NavigationStackProp }) => {
        return {
          headerTitle: "Filter Meals",
          headerLeft: () => (
            <MenuButton
              navigation={props.navigation as unknown as NavigationDrawerProp}
            />
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Save"
                iconName="md-save"
                onPress={props.navigation.getParam("saveFiltersHandler")}
              />
            </HeaderButtons>
          ),
        };
      },
    },
  },
  { defaultNavigationOptions: STACK_CONFIG }
);
