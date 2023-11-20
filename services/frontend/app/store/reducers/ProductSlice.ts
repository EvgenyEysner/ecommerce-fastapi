import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductsState {
  product: any;
  products: any[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductsState = {
  product: null,
  products: [],
  isLoading: false,
  error: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<any>) {
      state.product = action.payload;
    },
    addAllProducts(state, action: PayloadAction<any[] | any>) {
      state.products = action.payload;
    },
  },
});

export default productsSlice.reducer;
