import React from "react";
import { Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import ListScreen from "../../components/ui/ListScreen";
import { COLORS } from "../../constants/colors";
import { ProductsNavigation } from "../../constants/navigation";
import { Product } from "../../models/product";
import { addToCart } from "../../store/actions/cart";
import { setProducts } from "../../store/actions/products";
import { RootReducer } from "../../store/root-reducer";

const ProductsScreen = (props: {
  navigation: NavigationStackProp;
}): JSX.Element => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => (state as RootReducer).products.products
  );
  const selectProductHandler = (product: Product) => {
    props.navigation.navigate(ProductsNavigation.PRODUCT_DETAILS, {
      productId: product.id,
      productTitle: product.title,
    });
  };

  return (
    <ListScreen
      navigation={props.navigation}
      data={products}
      fetchData={setProducts}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item as Product}
          onSelect={selectProductHandler.bind(null, itemData.item as Product)}
        >
          <Button
            title="View Details"
            color={COLORS.primary}
            onPress={selectProductHandler.bind(null, itemData.item as Product)}
          />
          <Button
            title="To Cart"
            color={COLORS.primary}
            onPress={() => dispatch(addToCart(itemData.item as Product))}
          />
        </ProductItem>
      )}
    ></ListScreen>
  );
};

export default ProductsScreen;
