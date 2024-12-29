import moment from "moment";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { Order } from "../../models/order";
import Card from "../ui/Card";
import ShopCartItem from "./ShopCartItem";

const OrderItem = (props: { order: Order }): JSX.Element => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>
          $
          {props.order.items
            .reduce((a, b) => a + (b.quantity || 1) * (b.product.price || 0), 0)
            .toFixed(2)}
        </Text>
        <Text style={styles.date}>
          {moment(props.order.date).format("DD.MM.YYYY. HH:mm")}{" "}
        </Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={COLORS.primary}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.items}>
          {props.order.items.map((item) => (
            <ShopCartItem key={item.id.toString()} cartItem={item} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "#888",
    fontSize: 16,
  },
  items: {
    width: "100%",
    marginTop: 10,
  },
});

export default OrderItem;
