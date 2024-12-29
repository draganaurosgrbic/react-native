import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../constants/colors";
import { Product } from "../../models/product";
import { addToCart } from "../../store/actions/cart";
import { RootReducer } from "../../store/root-reducer";

const ProductScreen = (props: {
  navigation: NavigationStackProp;
  route: {
    params?: {
      productId: string;
    };
  };
}): JSX.Element => {
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    (state as RootReducer).products.products.find(
      (product) => product.id === +(props.route.params?.productId || NaN)
    )
  ) as Product;

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product?.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title="Add to Cart"
          color={COLORS.primary}
          onPress={() => dispatch(addToCart(product))}
        />
      </View>
      <Text style={styles.price}>${(product?.price || 0).toFixed(2)}</Text>
      <Text style={styles.description}>{product?.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductScreen;
