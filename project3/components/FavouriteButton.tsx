import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackProp } from "react-navigation-stack";
import CustomHeaderButton from "./CustomHeaderButton";

const FavouriteButton = (props: {
  navigation: NavigationStackProp;
}): JSX.Element => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Favourite"
        iconName={
          !props.navigation.getParam("isFavourite")
            ? "md-star-outline"
            : "md-star"
        }
        onPress={props.navigation.getParam("toggleFavouriteHandler")}
      />
    </HeaderButtons>
  );
};

export default FavouriteButton;
