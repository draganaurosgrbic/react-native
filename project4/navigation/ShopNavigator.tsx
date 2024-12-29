import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants/colors";
import { Button, View } from "react-native";
import { logout } from "../store/actions/user";
import { SafeAreaView } from "react-navigation";
import { ShopNavigation } from "../constants/navigation";
import ProductsNavigator from "./ProductsNavigator";
import { Ionicons } from "@expo/vector-icons";
import OrdersNavigator from "./OrdersNavigator";
import AdminNavigator from "./AdminNavigator";
import axios from "axios";
import { RootReducer } from "../store/root-reducer";

const ShopDrawerNavigator = createDrawerNavigator();

const ShopNavigator = (): JSX.Element => {
  const dispatch = useDispatch();
  const token = useSelector((state) => (state as RootReducer).user?.token);
  const cancelToken = axios.CancelToken.source();

  const sub1 = axios.interceptors.request.use(
    (request) => {
      if (token) {
        request.headers["Authorization"] = token;
      }
      request.cancelToken = cancelToken.token;
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const sub2 = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return error;
    }
  );

  useEffect(() => {
    return () => {
      cancelToken.cancel();
      axios.interceptors.request.eject(sub1);
      axios.interceptors.response.eject(sub2);
    };
  });

  return (
    <ShopDrawerNavigator.Navigator
      screenOptions={{
        drawerActiveTintColor: COLORS.primary,
      }}
      drawerContent={(props: DrawerContentComponentProps) => {
        return (
          <SafeAreaView style={{ paddingTop: 60 }}>
            <DrawerItemList {...props} />
            <View style={{ alignItems: "center", paddingTop: 20 }}>
              <View
                style={{
                  width: "90%",
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <Button
                  title="Log out"
                  color={COLORS.primary}
                  onPress={() => dispatch(logout())}
                />
              </View>
            </View>
          </SafeAreaView>
        );
      }}
    >
      <ShopDrawerNavigator.Screen
        name={ShopNavigation.PRODUCTS}
        component={ProductsNavigator}
        options={{
          headerShown: false,
          drawerIcon: (props: { color: string }) => (
            <Ionicons name="md-cart" size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name={ShopNavigation.ORDERS}
        component={OrdersNavigator}
        options={{
          headerShown: false,
          drawerIcon: (props: { color: string }) => (
            <Ionicons name="md-list" size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name={ShopNavigation.ADMIN}
        component={AdminNavigator}
        options={{
          headerShown: false,
          drawerIcon: (props: { color: string }) => (
            <Ionicons name="md-create" size={23} color={props.color} />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

export default ShopNavigator;
