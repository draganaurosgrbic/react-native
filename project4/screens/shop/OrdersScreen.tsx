import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import ListScreen from "../../components/ui/ListScreen";
import { Order } from "../../models/order";
import { setOrders } from "../../store/actions/orders";
import { RootReducer } from "../../store/root-reducer";

const OrdersScreen = (props: {
  navigation: NavigationStackProp;
}): JSX.Element => {
  const orders = useSelector((state) => (state as RootReducer).orders.orders);

  return (
    <ListScreen
      navigation={props.navigation}
      data={orders}
      renderItem={(itemData) => <OrderItem order={itemData.item as Order} />}
      fetchData={setOrders}
    ></ListScreen>
  );
};

export default OrdersScreen;
