import { getLastKnownPositionAsync } from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { COLORS } from "../constants/colors";
import { PlacesNavigation } from "../constants/navigation";
import { MapLocation } from "../models/map-location";
import MapPreview from "./MapPreview";

const LocationPicker = (props: {
  navigation: NavigationStackProp;
  location?: MapLocation;
  onLocationPicked: (location: MapLocation) => void;
}): JSX.Element => {
  const [userLocation, setUserLocation] = useState(
    undefined as unknown as MapLocation
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (props.location) {
      setUserLocation(props.location);
      props.onLocationPicked(props.location);
    }
  }, [props.location]);

  const pickOnMapHandler = () => {
    props.navigation.navigate(PlacesNavigation.MAP);
  };

  const fetchLocationHandler = async () => {
    setIsFetching(true);
    try {
      const location = await getLastKnownPositionAsync({});
      setUserLocation(location?.coords as MapLocation);
      props.onLocationPicked(location?.coords as MapLocation);
    } catch {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [
          {
            text: "Okay",
          },
        ]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={userLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Text>No location picked yet.</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={COLORS.primary}
          onPress={fetchLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={COLORS.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    width: "100%",
    height: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default LocationPicker;
