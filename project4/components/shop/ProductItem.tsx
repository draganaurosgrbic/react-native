import React, { ReactNode } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../../models/product";
import Card from "../ui/Card";

const ProductItem = (props: {
  product: Product;
  onSelect: () => void;
  children?: ReactNode;
}): JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <Card style={styles.productItem}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: props.product.imageUrl }}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.product.title}</Text>
          <Text style={styles.price}>
            ${(props.product.price || 0).toFixed(2)}
          </Text>
        </View>
        <View style={styles.actions}>{props.children}</View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItem: {
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
