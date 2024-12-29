import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch } from "react-redux";
import { COLORS } from "../../constants/colors";

const ListScreen = (props: {
  navigation: NavigationStackProp;
  data: unknown[];
  renderItem: (itemData: { item: unknown }) => JSX.Element;
  fetchData: () => void;
  isLoading?: boolean;
}): JSX.Element => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      await dispatch(props.fetchData());
    } catch {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const sub = props.navigation.addListener("focus", loadData);

    return () => {
      try {
        sub?.remove();
      } catch {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (sub as any)();
        } catch {
          console.log("ERROR!");
        }
      }
    };
  }, []);

  if (isLoading || props.isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Text>An error occured!</Text>
        <Button title="Try again" color={COLORS.primary} onPress={loadData} />
      </View>
    );
  }

  if (!props.data?.length) {
    return (
      <View style={styles.screen}>
        <Text>No data found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      {...props}
      keyExtractor={(item) => (item as { id: number }).id.toString()}
      refreshing={isLoading}
      onRefresh={loadData}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListScreen;
