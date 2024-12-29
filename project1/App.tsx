import React, { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import { Goal } from "./components/Goal";

export default function App(): JSX.Element {
  const [goals, setGoals] = useState([] as Goal[]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (title: string) => {
    setGoals((prevGoals) => [
      ...prevGoals,
      {
        id: prevGoals.length + 1,
        title,
      },
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (id: number) => {
    setGoals((prevGoals) => prevGoals.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.screen}>
      <GoalInput
        visible={isAddMode}
        onAdd={addGoalHandler}
        onCancel={setIsAddMode.bind(null, false)}
      />
      <Button
        title="Add New Goal"
        color="orange"
        onPress={setIsAddMode.bind(null, true)}
      />
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => (
          <GoalItem
            goal={itemData.item}
            onDelete={removeGoalHandler.bind(null, itemData.item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 50,
    paddingVertical: 80,
  },
});
