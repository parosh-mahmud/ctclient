// In your flightSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const flightSlice = createSlice({
  name: "flight",
  initialState: {
    flightData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setFlightData: (state, action) => {
      state.flightData = action.payload;
    },
    // Other reducers...
  },
});

export const { setFlightData } = flightSlice.actions;

export default flightSlice.reducer;
