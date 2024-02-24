import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

// Define an async thunk for fetching flight results
export const fetchFlightResults = createAsyncThunk(
  'flight/fetchFlightResults',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/airSearch`, formData);
      return response.data; // Automatically dispatched as fulfilled action
    } catch (error) {
      // Use `rejectWithValue` to return a custom error payload
      return rejectWithValue(error.response.data);
    }
  }
);

const flightSlice = createSlice({
  name: 'flight',
  initialState: {
    searchData: null,
    searchParams: null, // Store the last search parameters
    isLoadingFlightData: false,
    error: null, // Store the error if any
  },
  reducers: {
    // You can still keep simple reducers here
    setLoadingFlightData: (state) => {
      state.isLoadingFlightData = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightResults.pending, (state) => {
        state.isLoadingFlightData = true;
        state.error = null; // Clear error on new fetch
      })
      .addCase(fetchFlightResults.fulfilled, (state, action) => {
        state.searchData = action.payload;
        state.isLoadingFlightData = false;
      })
      .addCase(fetchFlightResults.rejected, (state, action) => {
        state.isLoadingFlightData = false;
        state.error = action.payload || 'Failed to fetch flight results'; // Default error message
      });
  },
});

export const { setLoadingFlightData } = flightSlice.actions;

// Selector to get the flight search data
export const selectFlightSearchData = (state) => state.flight.searchData;

// Selector to get the loading state
export const selectIsLoadingFlightData = (state) => state.flight.isLoadingFlightData;

// Selector to get the last search parameters
export const selectFlightSearchParams = (state) => state.flight.searchParams;

// Selector to get any error
export const selectFlightError = (state) => state.flight.error;

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
