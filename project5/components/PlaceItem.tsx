import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { COLORS } from "../constants/colors";
import { PlacesNavigation } from "../constants/navigation";
import { Place } from "../models/place";

const PlaceItem = (props: {
  navigation: NavigationStackProp;
  place: Place;
}): JSX.Element => {
  const selectPlaceHandler = () => {
    props.navigation.navigate(PlacesNavigation.PLACE, {
      placeId: props.place.id,
      placeTitle: props.place.title,
    });
  };

  return (
    <TouchableOpacity style={styles.placeItem} onPress={selectPlaceHandler}>
      <Image style={styles.image} source={{ uri: props.place.image }} />
      <View style={styles.info}>
        <Text style={styles.title}>{props.place.title}</Text>
        <Text style={styles.address}>{props.place.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 35,
    backgroundColor: "#ccc",
  },
  info: {
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 25,
  },
  title: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "#666",
  },
});

export default PlaceItem;
