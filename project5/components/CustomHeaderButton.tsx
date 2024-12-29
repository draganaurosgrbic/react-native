import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  HeaderButton,
  HeaderButtonProps,
} from "react-navigation-header-buttons";

const CustomHeaderButton = (props: HeaderButtonProps): JSX.Element => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color="white"
    />
  );
};

export default CustomHeaderButton;
