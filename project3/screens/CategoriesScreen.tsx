import React from "react";
import { FlatList } from "react-native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import CategoryItem from "../components/CategoryItem";
import { CATEGORIES } from "../data/dummy-data";

const CategoriesScreen = (props: {
  navigation: StackNavigationProp;
}): JSX.Element => {
  return (
    <FlatList
      numColumns={2}
      data={CATEGORIES}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <CategoryItem category={itemData.item} navigation={props.navigation} />
      )}
    />
  );
};

export default CategoriesScreen;
