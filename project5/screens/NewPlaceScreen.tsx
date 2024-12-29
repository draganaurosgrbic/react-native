import React, { useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch } from "react-redux";
import { Place } from "../models/place";
import { addPlace } from "../store/actions/places";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import { COLORS } from "../constants/colors";
import { MapLocation } from "../models/map-location";

const NewPlaceScreen = (props: {
  navigation: NavigationStackProp;
  route: {
    params?: {
      selectedLocation: MapLocation;
    };
  };
}): JSX.Element => {
  const [place, setPlace] = useState({} as Place);
  const dispatch = useDispatch();

  const formValid = () => {
    if (
      !place.title?.trim() ||
      !place.image?.trim() ||
      place.lat === null ||
      place.lat === undefined ||
      place.lng === null ||
      place.lng === undefined
    ) {
      return false;
    }
    return true;
  };

  const savePlaceHandler = () => {
    if (!formValid()) {
      return;
    }
    dispatch(addPlace(place));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.formControl}
          value={place.title}
          onChangeText={(title) => setPlace({ ...place, title })}
        />
        <ImagePicker onImageTaken={(image) => setPlace({ ...place, image })} />
        <LocationPicker
          onLocationPicked={(location) =>
            setPlace({
              ...place,
              lat: location.latitude,
              lng: location.longitude,
            })
          }
          location={props.route.params?.selectedLocation}
          navigation={props.navigation}
        />

        <Button
          title="Save Place"
          color={COLORS.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  formControl: {
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});

export default NewPlaceScreen;
