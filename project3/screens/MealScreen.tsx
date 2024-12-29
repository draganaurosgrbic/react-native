import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../store/actions/meals";
import { RootReducer } from "../store/root-reducer";

const MealScreen = (props: {
  navigation: NavigationStackProp;
}): JSX.Element => {
  const meal = useSelector((state) => (state as RootReducer).meals.meals).find(
    (meal) => meal.id === props.navigation.getParam("mealId")
  );
  const isFavourite = useSelector((state) =>
    (state as RootReducer).meals.favouriteMeals.some(
      (meal) => meal.id === props.navigation.getParam("mealId")
    )
  );
  const dispatch = useDispatch();

  const toggleFavouriteHandler = () => {
    dispatch(toggleFavourite(meal?.id as string));
  };

  useEffect(() => {
    props.navigation.setParams({
      isFavourite,
    });
  }, [isFavourite]);

  useEffect(() => {
    props.navigation.setParams({
      toggleFavouriteHandler,
    });
  }, [meal?.id]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: meal?.imageUrl }} />
      <View style={styles.details}>
        <Text>{meal?.duration}m</Text>
        <Text>{meal?.complexity.toUpperCase()}</Text>
        <Text>{meal?.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {meal?.ingredients.map((ingredient, index) => (
        <View key={index} style={styles.listItem}>
          <Text>{ingredient}</Text>
        </View>
      ))}
      <Text style={styles.title}>Steps</Text>
      {meal?.steps.map((step, index) => (
        <View key={index} style={styles.listItem}>
          <Text>{step}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    textAlign: "center",
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default MealScreen;
