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
import { AdminNavigation } from "../constants/navigation";
import { STACK_CONFIG } from "../constants/stack-config";
import EditProductSCreen from "../screens/user/EditProductScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = (): JSX.Element => {
  return (
    <AdminStackNavigator.Navigator screenOptions={STACK_CONFIG}>
      <AdminStackNavigator.Screen
        name={AdminNavigation.USER_PRODUCTS}
        component={UserProductsScreen}
        options={(props: { navigation: NavigationStackProp }) => {
          return {
            headerTitle: "Your Products",
            headerLeft: () => (
              <MenuButton
                navigation={props.navigation as unknown as NavigationDrawerProp}
              />
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Add"
                  iconName="md-create"
                  onPress={() =>
                    props.navigation.navigate(AdminNavigation.EDIT_PRODUCT)
                  }
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <AdminStackNavigator.Screen
        name={AdminNavigation.EDIT_PRODUCT}
        component={EditProductSCreen}
        options={(props: {
          navigation: NavigationStackProp;
          route: RouteProp<ParamListBase>;
        }) => {
          const productId = props.route.params
            ? (props.route.params as { [key: string]: number })["productId"]
            : undefined;
          return {
            headerTitle: productId ? "Edit Product" : "Add Product",
          };
        }}
      />
    </AdminStackNavigator.Navigator>
  );
};

export default AdminNavigator;
