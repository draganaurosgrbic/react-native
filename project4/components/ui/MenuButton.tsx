import React from "react";
import { NavigationDrawerProp } from "react-navigation-drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./CustomHeaderButton";

const MenuButton = (props: {
  navigation: NavigationDrawerProp;
}): JSX.Element => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName="md-menu"
        onPress={props.navigation.toggleDrawer}
      />
    </HeaderButtons>
  );
};

export default MenuButton;
