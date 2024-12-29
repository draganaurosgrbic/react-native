/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { NavigationStackProp } from "react-navigation-stack";
import { PlacesNavigation } from "../constants/navigation";
import { MapLocation } from "../models/map-location";

const MapScreen = (props: {
  navigation: NavigationStackProp;
  route: { params?: { location: MapLocation } };
}): JSX.Element => {
  const location = props.route.params?.location;
  const [selectedLocation, setSelectedLocation] = useState(location);

  const mapRegion = {
    latitude: selectedLocation?.latitude || 37.78,
    longitude: selectedLocation?.longitude || -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } as Region;

  const selectLocationHandler = (event: {
    nativeEvent: { coordinate: MapLocation };
  }) => {
    if (location) {
      return;
    }
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const savePickedLocationHandler = () => {
    if (selectedLocation) {
      props.navigation.navigate(PlacesNavigation.NEW_PLACE, {
        selectedLocation,
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props.navigation as any).setOptions({
      headerRight: () =>
        !location && (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={savePickedLocationHandler}
          >
            <Text style={styles.headerButtonText}>Save</Text>
          </TouchableOpacity>
        ),
    });
  }, [selectedLocation]);

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Picked Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default MapScreen;
