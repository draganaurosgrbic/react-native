/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackProp } from "react-navigation-stack";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { COLORS } from "../constants/colors";
import { PlacesNavigation } from "../constants/navigation";
import PlaceScreen from "../screens/PlaceScreen";
import PlacesScreen from "../screens/PlacesScreen";
import { RouteProp, ParamListBase } from "@react-navigation/core";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";

const PlacesStackNavigator = createStackNavigator();

const PlacesNavigator = (): JSX.Element => {
  return (
    <PlacesStackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: "white",
      }}
    >
      <PlacesStackNavigator.Screen
        name={PlacesNavigation.PLACES}
        component={PlacesScreen}
        options={(props: { navigation: NavigationStackProp }) => {
          return {
            headerTitle: "Places",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Add Place"
                  iconName="md-add"
                  onPress={() =>
                    props.navigation.navigate(PlacesNavigation.NEW_PLACE)
                  }
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <PlacesStackNavigator.Screen
        name={PlacesNavigation.PLACE}
        component={PlaceScreen}
        options={(props: { route: RouteProp<ParamListBase> }) => {
          return {
            headerTitle: (props.route.params as { placeTitle: string })
              .placeTitle,
          };
        }}
      />
      <PlacesStackNavigator.Screen
        name={PlacesNavigation.NEW_PLACE}
        component={NewPlaceScreen}
        options={{ headerTitle: "Add Place" }}
      />
      <PlacesStackNavigator.Screen
        name={PlacesNavigation.MAP}
        component={MapScreen}
      />
    </PlacesStackNavigator.Navigator>
  );
};

export default PlacesNavigator;
