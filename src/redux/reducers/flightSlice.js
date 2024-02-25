import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

// Async thunk for fetching flight results
export const fetchFlightResults = createAsyncThunk(
  'flight/fetchFlightResults',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/airSearch`, searchParams);
      return { data: response.data, searchParams }; // Return both data and searchParams
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const flightSlice = createSlice({
  name: 'flight',
  initialState: {
    searchData: null,
    searchParams: null,
    isLoadingFlightData: false,
    error: null,
    hasResults: false, // Flag to indicate if search results are empty
  },
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    resetFlightState: (state) => {
      state.searchData = null;
      state.searchParams = null;
      state.isLoadingFlightData = false;
      state.error = null;
      state.hasResults = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightResults.pending, (state) => {
        state.isLoadingFlightData = true;
        state.error = null;
      })
      .addCase(fetchFlightResults.fulfilled, (state, action) => {
        state.searchData = action.payload.data;
        state.searchParams = action.payload.searchParams; // Store the last search parameters
        state.isLoadingFlightData = false;
        state.hasResults = !!action.payload.data && action.payload.data.length > 0;
      })
      .addCase(fetchFlightResults.rejected, (state, action) => {
        state.isLoadingFlightData = false;
        state.error = action.payload;
        state.hasResults = false;
      });
  },
});

// Actions and selectors
export const { setSearchParams, resetFlightState } = flightSlice.actions;

export const selectFlightSearchData = (state) => state.flight.searchData;
export const selectFlightSearchParams = (state) => state.flight.searchParams;
export const selectIsLoadingFlightData = (state) => state.flight.isLoadingFlightData;
export const selectFlightError = (state) => state.flight.error;
export const selectHasFlightResults = (state) => state.flight.hasResults;

export default flightSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// // flightSlice.js
// const BASE_URL = process.env.REACT_APP_API_URL

// const flightSlice = createSlice({
//   name: 'flight',
//   initialState: {
//     searchData: null,
//     isLoadingFlightData: false,
//   },
//   reducers: {
//     setFlightSearchData: (state, action) => {
//       state.searchData = action.payload;
//       state.isLoadingFlightData = false;
//     },
//     setLoadingFlightData: (state) => {
//       state.isLoadingFlightData = true;
//     },
//   },
// });

// export const { setFlightSearchData, setLoadingFlightData } = flightSlice.actions;

// // Async action using Thunk middleware
// export const fetchFlightResults = (formData) => async (dispatch) => {
//   try {
//     // Dispatch loading status
//     dispatch(setLoadingFlightData());

//     // Make the API call using formData
//     const response = await axios.post(`${BASE_URL}/api/airSearch`, formData);

//     // Dispatch the result to the store
//     dispatch(setFlightSearchData(response.data));

//     console.log('API Response:', response.data);
//   } catch (error) {
//     console.error('Error fetching flight results:', error.message);
//   }
// };

// export const selectFlightSearchData = (state) => state.flight.searchData;

// export default flightSlice.reducer;
