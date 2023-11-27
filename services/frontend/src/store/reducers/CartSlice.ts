import { IProductCart } from "@/interfaces/product.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface CartState {
  flag: number;
  products: IProductCart[];
  isLoading: boolean;
  error: string;
}

// flag нужен для отслеживания изменения корзины и ререндера компонентов, в которых используются данные корзины
const initialState: CartState = {
  flag: 0,
  products: [],
  isLoading: false,
  error: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementFlag(state, action: PayloadAction) {
      ++state.flag;
    },
    addProductToCart(state, action: PayloadAction<IProductCart>) {
      state.products.push(action.payload);
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.products,
      };
    },
  },
});

export const { addProductToCart } = cartSlice.actions;
export default cartSlice.reducer;
