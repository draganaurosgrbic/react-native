import React, { useState } from "react";
import { Alert, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import ListScreen from "../../components/ui/ListScreen";
import { COLORS } from "../../constants/colors";
import { AdminNavigation } from "../../constants/navigation";
import { Product } from "../../models/product";
import { deleteProduct, setMyProducts } from "../../store/actions/products";
import { RootReducer } from "../../store/root-reducer";

const UserProductsScreen = (props: {
  navigation: NavigationStackProp;
}): JSX.Element => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const products = useSelector(
    (state) => (state as RootReducer).products.myProducts
  );

  const editProductHandler = (id: number) => {
    props.navigation.navigate(AdminNavigation.EDIT_PRODUCT, { productId: id });
  };

  const deleteProductHandler = (id: number) => {
    Alert.alert("Are you sure?", "Do you really want to delete product?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          setIsDeleting(true);
          try {
            await dispatch(deleteProduct(id));
            await dispatch(setMyProducts());
          } catch {
            Alert.alert("ERROR!", "An error occured while deleting product", [
              {
                text: "Okay",
              },
            ]);
          }
          setIsDeleting(false);
        },
      },
    ]);
  };

  return (
    <ListScreen
      navigation={props.navigation}
      data={products}
      fetchData={setMyProducts}
      isLoading={isDeleting}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item as Product}
          onSelect={editProductHandler.bind(
            null,
            (itemData.item as Product).id
          )}
        >
          <Button
            title="Edit"
            color={COLORS.primary}
            onPress={editProductHandler.bind(
              null,
              (itemData.item as Product).id
            )}
          />
          <Button
            title="Delete"
            color={COLORS.primary}
            onPress={deleteProductHandler.bind(
              null,
              (itemData.item as Product).id
            )}
          />
        </ProductItem>
      )}
    ></ListScreen>
  );
};

export default UserProductsScreen;
