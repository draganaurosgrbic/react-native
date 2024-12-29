import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch } from "react-redux";
import { COLORS } from "../constants/colors";
import { Filters } from "../model/filters";
import { setFilters as setFiltersAction } from "../store/actions/meals";

const FilterSwitch = (props: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}): JSX.Element => {
  return (
    <View style={styles.switch}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{
          true: COLORS.primary,
          false: "#ccc",
        }}
        thumbColor={COLORS.primary}
        value={props.value}
        onValueChange={props.onValueChange}
      />
    </View>
  );
};

const FiltersScreen = (props: {
  navigation: NavigationStackProp;
}): JSX.Element => {
  const [filters, setFilters] = useState({
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
    isLactoseFree: false,
  } as Filters);

  const dispatch = useDispatch();

  const saveFiltersHandler = () => {
    dispatch(setFiltersAction(filters));
  };

  useEffect(() => {
    props.navigation.setParams({
      saveFiltersHandler,
    });
  }, [filters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Vegan"
        value={filters.isVegan}
        onValueChange={(value) => setFilters({ ...filters, isVegan: value })}
      />
      <FilterSwitch
        label="Vegetarian"
        value={filters.isVegetarian}
        onValueChange={(value) =>
          setFilters({ ...filters, isVegetarian: value })
        }
      />
      <FilterSwitch
        label="Gluten-free"
        value={filters.isGlutenFree}
        onValueChange={(value) =>
          setFilters({ ...filters, isGlutenFree: value })
        }
      />
      <FilterSwitch
        label="Lactose-free"
        value={filters.isLactoseFree}
        onValueChange={(value) =>
          setFilters({ ...filters, isLactoseFree: value })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 25,
  },
  switch: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
});

export default FiltersScreen;
