import { IUser } from "@/interfaces/user.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface userState {
  user: IUser | null;
  isLoading: boolean;
  error: string;
}

const initialState: userState = {
  user: null,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.userReducer.user) return { ...state };

      state.user = action.payload.userReducer.user;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
