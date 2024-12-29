/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import Input from "../../components/ui/Input";
import { COLORS } from "../../constants/colors";
import { Product } from "../../models/product";
import { saveProduct } from "../../store/actions/products";
import { RootReducer } from "../../store/root-reducer";

enum FormInputKey {
  title = "title",
  description = "description",
  imageUrl = "imageUrl",
  price = "price",
}

const EditProductSCreen = (props: {
  navigation: NavigationStackProp;
  route: {
    params?: {
      productId: string;
    };
  };
}): JSX.Element => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const productId = +(props.route.params?.productId || NaN);
  const product = useSelector((state) =>
    (state as RootReducer).products.myProducts.find(
      (item) => item.id === productId
    )
  );
  const [formValue, setFormValue] = useState({
    ...((product || {}) as Product),
  });
  const [formValidity, setFormValidity] = useState({
    title: !!productId,
    description: !!productId,
    imageUrl: !!productId,
    price: !!productId,
  });

  const formValid = () => {
    return Object.values(formValidity).reduce((a, b) => a && b, true);
  };

  const inputChangeHandler = (
    key: FormInputKey,
    value: string,
    validity: boolean
  ) => {
    setFormValue((prevValue) => {
      return { ...prevValue, [key]: value };
    });
    setFormValidity((prevValidity) => {
      return { ...prevValidity, [key]: validity };
    });
  };

  const submitFormHandler = async () => {
    if (!formValid()) {
      Alert.alert("ERROR!", "Please check the errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(saveProduct({ ...formValue, price: +formValue.price }));
      props.navigation.goBack();
    } catch {
      Alert.alert("ERROR!", "An error occured while saving product", [
        { text: "Okay" },
      ]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (
      props.navigation as unknown as { setOptions: (params: unknown) => void }
    ).setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName="md-checkmark"
            onPress={submitFormHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [formValue, formValidity]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        ></ActivityIndicator>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.form}>
        <Input
          label="Title"
          errorText="Please enter valid title"
          value={formValue.title || ""}
          autoCorrect
          autoCapitalize="sentences"
          keyboardType="default"
          required
          onInputChange={inputChangeHandler.bind(null, FormInputKey.title)}
        />

        <Input
          label="Image URL"
          errorText="Please enter valid image URL"
          value={formValue.imageUrl || ""}
          keyboardType="default"
          required
          onInputChange={inputChangeHandler.bind(null, FormInputKey.imageUrl)}
        />

        {!productId && (
          <Input
            label="Price"
            errorText="Please enter valid price"
            value={formValue.price?.toString() || ""}
            keyboardType="decimal-pad"
            required
            min={0.1}
            number
            onInputChange={inputChangeHandler.bind(null, FormInputKey.price)}
          />
        )}
        <Input
          label="Description"
          errorText="Please enter valid description"
          value={formValue.description || ""}
          autoCorrect
          autoCapitalize="sentences"
          keyboardType="default"
          multiline
          numberOfLines={3}
          required
          minLength={5}
          onInputChange={inputChangeHandler.bind(
            null,
            FormInputKey.description
          )}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    margin: 20,
  },
});

export default EditProductSCreen;
