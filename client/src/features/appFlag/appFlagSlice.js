// src/features/appFlag/appFlagSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOption: null, // "calculator" or "grading"
};

export const appFlagSlice = createSlice({
  name: "appFlag",
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
      localStorage.setItem("landingGateway", action.payload);
    },
    loadSelectedOption: (state) => {
      const saved = localStorage.getItem("landingGateway");
      if (saved) state.selectedOption = saved;
    },
  },
});

export const { setSelectedOption, loadSelectedOption } = appFlagSlice.actions;

export default appFlagSlice.reducer;
