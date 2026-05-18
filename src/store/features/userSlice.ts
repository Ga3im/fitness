import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { userType } from "../../types/types";

type WorkoutStateType = {
  isAuth: boolean;
  isOpenProfile: boolean;
  isFavoriteTabata: boolean;
  user: null | userType;
};

const initialState: WorkoutStateType = {
  isAuth: false,
  isOpenProfile: false,
  isFavoriteTabata: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsOpenProfile: (state, action: PayloadAction<boolean>) => {
      state.isOpenProfile = action.payload;
    },
    setUser: (state, action: PayloadAction<userType | null>) => {
      state.user = action.payload;
    },
    setIsFavoriteTabata: (state, action) => {
      state.isFavoriteTabata = action.payload;
    },
  },
});

export const { setIsAuth, setIsOpenProfile, setUser, setIsFavoriteTabata } =
  userSlice.actions;
export const authReduser = userSlice.reducer;
