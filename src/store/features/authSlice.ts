import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { userType } from "../../types/types";

type WorkoutStateType = {
  isAuth: boolean;
  isOpenProfile: boolean;
  user: null | userType;
};

const initialState: WorkoutStateType = {
  isAuth: false,
  isOpenProfile: false,
  user: null,
};

const authSlice = createSlice({
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
  },
});

export const { setIsAuth, setIsOpenProfile, setUser } = authSlice.actions;
export const authReduser = authSlice.reducer;
