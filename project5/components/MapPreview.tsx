import React, { ReactNode } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { MapLocation } from "../models/map-location";

const MapPreview = (props: {
  location?: MapLocation;
  children?: ReactNode;
  style?: { [key: string]: unknown };
  onPress: () => void;
}): JSX.Element => {
  const image =
    props.location &&
    `https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${props.location.longitude},${props.location.latitude}&size=400,200&z=10&l=map&pt=${props.location.longitude},${props.location.latitude},pm2rdl1`;
  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...props.style }}
      onPress={props.onPress}
    >
      {image ? (
        <Image style={styles.image} source={{ uri: image }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
