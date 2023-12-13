import { ICategory } from "@/interfaces/product.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface CategoriesState {
  categories: ICategory[];
  isLoading: boolean;
  error: string;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addAllCategories(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.categoriesReducer.categories.length === 0)
        return { ...state };

      state.categories = action.payload.categoriesReducer.categories;
    },
  },
});

export const { addAllCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
