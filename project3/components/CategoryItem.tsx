import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { Navigation } from "../constants/navigation";
import { Category } from "../model/category";

const CategoryItem = (props: {
  category: Category;
  navigation: NavigationStackProp;
}): JSX.Element => {
  return (
    <View style={styles.categoryItem}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(Navigation.MEALS, {
            categoryId: props.category.id,
            categoryTitle: props.category.title,
          });
        }}
      >
        <View
          style={{
            ...styles.container,
            ...{ backgroundColor: props.category.color },
          }}
        >
          <Text style={styles.title}>{props.category.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    elevation: 8,
    overflow: "hidden",
  },
  container: {
    height: 150,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ccc",
    textAlign: "right",
  },
});

export default CategoryItem;
