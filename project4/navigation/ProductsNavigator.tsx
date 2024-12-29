/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { RouteProp, ParamListBase } from "@react-navigation/core";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NavigationDrawerProp } from "react-navigation-drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackProp } from "react-navigation-stack";
import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import MenuButton from "../components/ui/MenuButton";
import { ProductsNavigation } from "../constants/navigation";
import { STACK_CONFIG } from "../constants/stack-config";
import CartScreen from "../screens/shop/CartScreen";
import ProductScreen from "../screens/shop/ProductScreen";
import ProductsScreen from "../screens/shop/ProductsScreen";

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = (): JSX.Element => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={STACK_CONFIG}>
      <ProductsStackNavigator.Screen
        name={ProductsNavigation.PRODUCTS_OVERVIEW}
        component={ProductsScreen}
        options={(props: { navigation: NavigationStackProp }) => {
          return {
            headerTitle: "Products",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Cart"
                  iconName="md-cart"
                  onPress={() =>
                    props.navigation.navigate(ProductsNavigation.CART)
                  }
                />
              </HeaderButtons>
            ),
            headerLeft: () => (
              <MenuButton
                navigation={props.navigation as unknown as NavigationDrawerProp}
              />
            ),
          };
        }}
      />
      <ProductsStackNavigator.Screen
        name={ProductsNavigation.PRODUCT_DETAILS}
        component={ProductScreen}
        options={(props: {
          navigation: NavigationStackProp;
          route: RouteProp<ParamListBase>;
        }) => {
          const headerTitle = props.route.params
            ? (props.route.params as { [key: string]: string })["productTitle"]
            : undefined;
          return {
            headerTitle,
          };
        }}
      />
      <ProductsStackNavigator.Screen
        name={ProductsNavigation.CART}
        component={CartScreen}
        options={{
          headerTitle: "Cart",
        }}
      />
    </ProductsStackNavigator.Navigator>
  );
};

export default ProductsNavigator;
