import {
  Action,
  Store,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import productReducer from "./reducers/ProductsSlice";
import cartReducer from "./reducers/CartSlice";
import userReducer from "./reducers/UserSlice";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  userReducer,
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
