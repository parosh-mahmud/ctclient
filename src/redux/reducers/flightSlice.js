import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import airports from "../../components/FlightSearch/data/Airport"; // Make sure to import the airports data

const BASE_URL = process.env.REACT_APP_API_URL;

// Find default airports
const defaultFromAirport = airports.find((airport) => airport.city === "Dhaka");
const defaultToAirport = airports.find((airport) => airport.city === "Jashore");

// Async thunk for fetching flight results
export const fetchFlightResults = createAsyncThunk(
  "flight/fetchFlightResults",
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/airSearch`,
        searchParams
      );
      return { data: response.data, searchParams }; // Return both data and searchParams
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Something went wrong"
      );
    }
  }
);

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    searchData: { Results: [] },
    searchParams: {},
    isLoadingFlightData: false,
    error: null,
    hasResults: false,
    selectedFromAirport: defaultFromAirport,
    selectedToAirport: defaultToAirport,
  },
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
      console.log("Search Params:", state.searchParams); // Logging searchParams here
    },
    updateSearchParametersAndSetLoading: (state, action) => {
      state.searchParams = action.payload;
      state.isLoadingFlightData = true;
      console.log("Updated Search Params and set loading:", state.searchParams); // Logging searchParams here
    },
    resetFlightState: (state) => {
      state.searchData = null;
      state.searchParams = null;
      state.isLoadingFlightData = false;
      state.error = null;
      state.hasResults = false;
    },
    setFromAirport: (state, action) => {
      state.selectedFromAirport = action.payload;
    },
    setToAirport: (state, action) => {
      state.selectedToAirport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightResults.pending, (state) => {
        state.isLoadingFlightData = true;
        state.error = null;
      })
      .addCase(fetchFlightResults.fulfilled, (state, action) => {
        state.searchData = action.payload.data || { Results: [] };
        state.searchParams = action.payload.searchParams;
        state.isLoadingFlightData = false;
        state.hasResults = action.payload.data?.Results?.length > 0;
      })
      .addCase(fetchFlightResults.rejected, (state, action) => {
        state.isLoadingFlightData = false;
        state.error = action.payload;
        state.hasResults = false;
      });
  },
});

// Actions and selectors
export const {
  setSearchParams,
  resetFlightState,
  updateSearchParametersAndSetLoading,
  setFromAirport,
  setToAirport,
} = flightSlice.actions;

export const selectFlightSearchData = (state) => state.flight.searchData;
export const selectFlightSearchParams = (state) => state.flight.searchParams;
export const selectIsLoadingFlightData = (state) =>
  state.flight.isLoadingFlightData;
export const selectFlightError = (state) => state.flight.error;
export const selectHasFlightResults = (state) => state.flight.hasResults;
export const selectFromAirport = (state) => state.flight.selectedFromAirport;
export const selectToAirport = (state) => state.flight.selectedToAirport;

export default flightSlice.reducer;
