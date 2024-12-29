import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { MapLocation } from "../models/map-location";
import { Place } from "../models/place";
import { RootReducer } from "../store/root-reducer";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MapPreview from "../components/MapPreview";
import { PlacesNavigation } from "../constants/navigation";
import { COLORS } from "../constants/colors";

const PlaceScreen = (props: {
  navigation: NavigationStackProp;
  route: {
    params?: {
      placeId: number;
    };
  };
}): JSX.Element => {
  const place = useSelector((state) =>
    (state as RootReducer).places.places.find(
      (place) => place.id === props.route.params?.placeId
    )
  ) as Place;

  const location = {
    latitude: place.lat,
    longitude: place.lng,
  } as MapLocation;

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image style={styles.image} source={{ uri: place.image }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={location}
          onPress={() => {
            props.navigation.navigate(PlacesNavigation.MAP, {
              location,
            });
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "35%",
    minHeight: 300,
    backgroundColor: "#ccc",
  },
  locationContainer: {
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 20,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: COLORS.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceScreen;
