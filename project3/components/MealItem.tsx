import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { Navigation } from "../constants/navigation";
import { Meal } from "../model/meal";
import { RootReducer } from "../store/root-reducer";

const MealItem = (props: {
  meal: Meal;
  navigation: NavigationStackProp;
}): JSX.Element => {
  const isFavourite = useSelector((state) =>
    (state as RootReducer).meals.favouriteMeals.some(
      (meal) => meal.id === props.meal.id
    )
  );

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate(Navigation.MEAL, {
          mealId: props.meal.id,
          mealTitle: props.meal.title,
          isFavourite,
        });
      }}
    >
      <View style={styles.mealItem}>
        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
          <ImageBackground
            style={styles.image}
            source={{ uri: props.meal.imageUrl }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {props.meal.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ ...styles.mealRow, ...styles.mealFooter }}>
          <Text>{props.meal.duration}m</Text>
          <Text>{props.meal.complexity.toUpperCase()}</Text>
          <Text>{props.meal.affordability.toUpperCase()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    flex: 1,
    height: 200,
    margin: 10,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealFooter: {
    height: "15%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default MealItem;
