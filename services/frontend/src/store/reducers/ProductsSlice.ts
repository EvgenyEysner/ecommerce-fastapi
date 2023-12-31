import { IProduct } from "@/interfaces/product.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface ProductsState {
  products: IProduct[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addAllProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.productReducer.products.length === 0)
        return { ...state };

      state.products = action.payload.productReducer.products;
    },
  },
});

export const { addAllProducts } = productsSlice.actions;
export default productsSlice.reducer;
