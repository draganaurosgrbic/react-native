import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { useSelector } from "react-redux";
import MealItem from "../components/MealItem";
import { RootReducer } from "../store/root-reducer";

const MealsScreen = (props: {
  navigation: NavigationStackProp;
}): JSX.Element => {
  const meals = useSelector(
    (state) => (state as RootReducer).meals.filteredMeals
  ).filter((meal) =>
    meal.categoryIds.includes(props.navigation.getParam("categoryId"))
  );

  if (!meals.length) {
    return (
      <View style={styles.screen}>
        <Text>No meals found. Maybe check your filters?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <MealItem meal={itemData.item} navigation={props.navigation} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealsScreen;
