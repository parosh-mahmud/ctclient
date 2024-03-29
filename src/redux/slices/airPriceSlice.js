// airPriceSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL
const airPriceSlice = createSlice({
  name: 'airPrice',
  initialState: {
    airPriceData: null,
    isLoadingAirPrice: false,
  },
  reducers: {
    setAirPriceData: (state, action) => {
      state.airPriceData = action.payload;
      state.isLoadingAirPrice = false;
    },
    setLoadingAirPrice: (state) => {
      state.isLoadingAirPrice = true;
    },
  },
});

export const { setAirPriceData, setLoadingAirPrice } = airPriceSlice.actions;

export const fetchAirPrice = (requestData) => async (dispatch) => {
  try {
    dispatch(setLoadingAirPrice());

    const response = await axios.post(`${BASE_URL}/api/airPrice`, requestData);

    dispatch(setAirPriceData(response.data));

    console.log('Air Price API Response:', response.data);
  } catch (error) {
    console.error('Error fetching air price:', error.message);
  }
};

export const selectAirPriceData = (state) => state.airPrice.airPriceData;

export default airPriceSlice.reducer;
