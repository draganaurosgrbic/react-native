/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { STACK_CONFIG } from "../constants/stack-config";
import { OrdersNavigation } from "../constants/navigation";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { NavigationStackProp } from "react-navigation-stack";
import MenuButton from "../components/ui/MenuButton";
import { NavigationDrawerProp } from "react-navigation-drawer";

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = (): JSX.Element => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={STACK_CONFIG}>
      <OrdersStackNavigator.Screen
        name={OrdersNavigation.ORDERS_OVERVIEW}
        component={OrdersScreen}
        options={(props: { navigation: NavigationStackProp }) => {
          return {
            headerTitle: "Orders",
            headerLeft: () => (
              <MenuButton
                navigation={props.navigation as unknown as NavigationDrawerProp}
              />
            ),
          };
        }}
      />
    </OrdersStackNavigator.Navigator>
  );
};

export default OrdersNavigator;
