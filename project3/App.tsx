import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import MainNavigator from "./navigation/MainNavigator";
import mealsReducer from "./store/reducers/meals";

const store = createStore(
  combineReducers({
    meals: mealsReducer,
  })
);

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
