import { combineReducers, legacy_createStore } from "redux";
import TrendingReducer from "./Reducers/TrendingReducer";
import ShopListReducer from "./Reducers/ShopListReducer";
import AuthReducer from "./Reducers/AuthReducer";
import cartToolkitReducer from "./Reducers/cartToolkitReducer";
import orderReducer from "./Reducers/orderReducer";

import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   TrendingReducer,
//   ShopListReducer,
//   AuthReducer,
//   CartReducer,
// });

// const store = legacy_createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = configureStore({
  reducer: {
    TrendingReducer,
    ShopListReducer,
    AuthReducer,
    cartToolkitReducer,
    orderReducer,
  },
});

export default store;
