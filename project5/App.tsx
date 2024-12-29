import React from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { initDatabase } from "./helpers/db";
import { placesReducer } from "./store/reducer/places";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import PlacesNavigator from "./navigation/PlacesNavigator";

initDatabase()
  .then(() => console.log("Database initialization finished"))
  .catch((err) => console.log(err));

const store = createStore(
  combineReducers({ places: placesReducer }),
  applyMiddleware(ReduxThunk)
);

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  );
}
