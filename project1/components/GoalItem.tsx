import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Goal } from "./Goal";

const GoalItem = (props: { goal: Goal; onDelete: () => void }): JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onDelete}>
      <View style={styles.goalItem}>
        <Text>{props.goal.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    padding: 10,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#ccc",
  },
});

export default GoalItem;
