import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type WorkoutSettingStateType = {
  theme: "night" | "light";
};

const initialState: WorkoutSettingStateType = {
  theme: "light",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"night" | "light">) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = settingSlice.actions;
export const settingReducer = settingSlice.reducer;
