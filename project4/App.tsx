import React from "react";
import { setNotificationHandler } from "expo-notifications";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { userReducer } from "./store/reducers/user";
import { cartReducer } from "./store/reducers/cart";
import { ordersReducer } from "./store/reducers/orders";
import { productsReducer } from "./store/reducers/products";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import StartupScreen from "./screens/StartupScreen";

setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const store = createStore(
  combineReducers({
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  }),
  applyMiddleware(ReduxThunk)
);

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StartupScreen />
    </Provider>
  );
}
