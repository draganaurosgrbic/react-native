import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartItem } from "../../models/cart-item";

const ShopCartItem = (props: {
  cartItem: CartItem;
  onRemove?: () => void;
}): JSX.Element => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.cartItem.quantity}</Text>
        <Text style={styles.title}>{props.cartItem.product.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.totalAmount}>
          $
          {(
            (props.cartItem.quantity || 1) * (props.cartItem.product.price || 0)
          ).toFixed(2)}
        </Text>
        {props.onRemove && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={props.onRemove}
          >
            <Ionicons name="md-trash" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
  },
  itemData: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#888",
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default ShopCartItem;
