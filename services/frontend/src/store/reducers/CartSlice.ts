import { IProduct } from "@/interfaces/product.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface CartState {
  products: IProduct[];
  checkDB: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: CartState = {
  products: [],
  checkDB: false,
  isLoading: false,
  error: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    firstAddProductToCart(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    addProductToCart(state, action: PayloadAction<IProduct>) {
      state.products = state.products.concat(action.payload);
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((el) => el.id !== action.payload);
    },
    deleteAllProducts(state, action: PayloadAction) {
      state.products = [];
    },
    incrementOneProduct(state, action: PayloadAction<number>) {
      const updatedProducts = state.products.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });

      state.products = updatedProducts;
    },
    decrementOneProduct(state, action: PayloadAction<number>) {
      const updatedProducts = state.products.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });

      state.products = updatedProducts;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.cartReducer.products.length === 0) return { ...state };

      state.products = action.payload.cartReducer.products;
    },
  },
});

export const {
  addProductToCart,
  firstAddProductToCart,
  deleteProduct,
  deleteAllProducts,
  incrementOneProduct,
  decrementOneProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
