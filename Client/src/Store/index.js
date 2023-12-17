import { createStore, combineReducers } from "redux";
import cartReducer from "./Reducer/cartReducer";
import userReducer from "./Reducer/userReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;