import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ShopCartItem from "../../components/shop/ShopCartItem";
import Card from "../../components/ui/Card";
import { COLORS } from "../../constants/colors";
import { Order } from "../../models/order";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";
import { RootReducer } from "../../store/root-reducer";

const CartScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const items = useSelector((state) => {
    return Object.values((state as RootReducer).cart).sort((a, b) =>
      a.product.id > b.product.id ? 1 : -1
    );
  });
  const totalAmount = items.reduce(
    (a, b) => a + (b.quantity || 1) * (b.product.price || 0),
    0
  );

  const sendOrderHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(addOrder({ items } as Order));
    } catch {
      Alert.alert("ERROR!", "An error occured while sending order", [
        {
          text: "Okay",
        },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.details}>
        <Text style={styles.summary}>
          Total:{" "}
          <Text style={styles.totalAmount}>
            ${(Math.round(totalAmount * 100) / 100).toFixed(2)}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Button
            disabled={!items.length}
            title="Order Now"
            color={COLORS.accent}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={(itemData) => (
          <ShopCartItem
            cartItem={itemData.item}
            onRemove={() => dispatch(removeFromCart(itemData.item.product.id))}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  summary: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalAmount: {
    color: COLORS.primary,
  },
});

export default CartScreen;
