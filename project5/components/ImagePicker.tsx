import { launchCameraAsync } from "expo-image-picker";
import {
  ImageInfo,
  ImagePickerResult,
} from "expo-image-picker/build/ImagePicker.types";
import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";

const ImagePicker = (props: {
  onImageTaken: (image: string) => void;
}): JSX.Element => {
  const [pickedImage, setPickedImage] = useState("");

  const imageTakenHandler = async () => {
    const image = (await launchCameraAsync()) as ImageInfo & ImagePickerResult;
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <TouchableOpacity style={styles.imagePreview} onPress={imageTakenHandler}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </TouchableOpacity>
      <Button
        title="Take Image"
        color={COLORS.primary}
        onPress={imageTakenHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
