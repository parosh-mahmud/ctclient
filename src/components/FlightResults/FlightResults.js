// FlightResults.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import LayoutPage from "../../pages/LayoutPage";
import FlightCard from "./FlightCard";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FilterByDate from "../filterComponent/FilterByDate";
import { selectFlightSearchData } from "../../redux/reducers/flightSlice";
import FilterComponent from "../filterComponent/FilterComponent";
import SearchForm from "../FlightSearch/SearchForm";
import RecommendFilter from "../filterComponent/RecommendFilter";
import { fetchFlightResults } from "../../redux/reducers/flightSlice";
import { useLocation } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { selectFlightSearchParams } from "../../redux/reducers/flightSlice";
import { selectIsLoadingFlightData } from "../../redux/reducers/flightSlice";
import { KeyboardArrowDown } from "@mui/icons-material";
import { selectFlightError } from "../../redux/reducers/flightSlice";

const FlightResults = () => {
  const flightSearchData = useSelector(selectFlightSearchData);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({});
  const [backdropOpen, setBackdropOpen] = useState(false);
  const currentSearchParams = useSelector(selectFlightSearchParams);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // State to manage the visibility of the collapsible content
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);
  const [uniqueAirlines, setUniqueAirlines] = useState([]);

  useEffect(() => {
    if (flightSearchData?.Results?.length > 0) {
      const airlineNames = flightSearchData.Results.flatMap((flight) =>
        flight.segments.map((segment) => segment.Airline.AirlineName)
      );
      const uniqueAirlineNames = [...new Set(airlineNames)]; // Removes duplicates
      setUniqueAirlines(uniqueAirlineNames);
    }
  }, [flightSearchData.Results]);

  const totalFlights = flightSearchData?.Results?.length || 0;
  const handleFilterByAirline = (airlineName) => {
    if (airlineName === "All Airlines") {
      setShowSortedFlights(false); // Show all flights if "All Airlines" is selected
    } else {
      const filteredFlights = flightSearchData.Results.filter((flight) =>
        flight.segments.some(
          (segment) => segment.Airline.AirlineName === airlineName
        )
      );
      setSortedFlights(filteredFlights);
      setShowSortedFlights(true); // Now showing filtered flights
    }
  };

  // Function to toggle the visibility state
  const handleToggleSearchForm = () => {
    setIsSearchFormVisible((prevVisible) => !prevVisible);
  };

  const loadingState = useSelector((state) => state.flight.isLoadingFlightData);
  const isLoading = useSelector((state) => state.flight.isLoadingFlightData);

  const [showSortedFlights, setShowSortedFlights] = useState(false);
  const [sortedFlights, setSortedFlights] = useState([]);
  const location = useLocation();
  const error = useSelector(selectFlightError);
  // const handleSortFlights = (sortedFlights) => {
  //   setSortedFlights([...sortedFlights]);
  //   setShowSortedFlights(true);
  // };

  flightSearchData.Results.forEach((flight) => {
    // Accessing DepTime from the first segment's origin for each flight
  });

  const handleSortFlights = (sortBy) => {
    let sortedFlights = [...flightSearchData.Results]; // Clone to avoid direct state mutation

    switch (sortBy) {
      case "Cheapest":
        sortedFlights.sort((a, b) => a.Fares[0].BaseFare - b.Fares[0].BaseFare);
        break;
      case "Highest":
        sortedFlights.sort((a, b) => b.Fares[0].BaseFare - a.Fares[0].BaseFare);
        break;
      case "Earlier flight":
        sortedFlights.sort(
          (a, b) =>
            new Date(a.segments[0].Origin.DepTime).getTime() -
            new Date(b.segments[0].Origin.DepTime).getTime()
        );
        break;
      case "Later flight":
        // Ensure descending order: later flights are listed first
        sortedFlights.sort(
          (a, b) =>
            new Date(b.segments[0].Origin.DepTime).getTime() -
            new Date(a.segments[0].Origin.DepTime).getTime()
        );
        break;
      default:
    }

    setSortedFlights(sortedFlights);
    setShowSortedFlights(true);
  };

  const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split("T")[0];

    const updatedSearchParams = {
      ...currentSearchParams, // Use the actual current search parameters
      departureDate: formattedDate,
    };

    dispatch(fetchFlightResults(updatedSearchParams));
  };

  useEffect(() => {
    // This effect will run once on mount and whenever the location.search changes
    const searchParams = new URLSearchParams(location.search);
    const paramsObject = Object.fromEntries(searchParams.entries());
    if (Object.keys(paramsObject).length > 0) {
      dispatch(fetchFlightResults(paramsObject));
    }
  }, [dispatch, location.search]);

  return (
    <LayoutPage>
      {/* first grid */}
      <Grid container style={{ width: "98%", padding: "0" }}>
        <Grid item xs={12}>
          <Box sx={{ height: "auto" }}>
            {/* First Row with Background Color */}
            <Box
              sx={{
                marginTop: "-10px",
                marginBottom: "10px",
                height: "auto",
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: { xs: "96%", md: "60%" }, // Set width to 60% of its parent
                  display: "flex",
                  justifyContent: "center", // Center the button horizontally
                  backgroundColor: "primary.main",
                  borderBottomRightRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              >
                <Button
                  sx={{
                    height: "4rem",
                    textTransform: "none",
                    width: "100%",
                    fontSize: {
                      xs: "0.875rem", // Smaller font size for mobile devices
                      md: "1.300rem", // Larger font size for desktops
                    },
                  }} // Ensure the button fills the Box
                  variant="outlined"
                  onClick={handleToggleSearchForm}
                  endIcon={
                    isSearchFormVisible ? (
                      <KeyboardArrowUpIcon sx={{ color: "white" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ color: "white" }} />
                    )
                  }
                >
                  <span style={{ color: "white" }}> Modify search</span>
                </Button>
              </Box>
            </Box>
            {/* Collapsible Search Form */}
            {/* Collapsible Search Form with Animation */}
            <Collapse in={isSearchFormVisible}>
              <Box
                sx={{
                  padding: 2,
                  height: "auto",
                  // Additional styling as needed
                }}
              >
                {/* The content/form you want to show or hide */}
                <SearchForm searchButtonLabel="Search" />
              </Box>
            </Collapse>

            {/* Second Row with Background Color */}
            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,0.5)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <FilterByDate onDateSelect={handleDateSelect} />
              {/* Content for the second row */}
            </Box>
          </Box>
        </Grid>

        {/* Second Grid */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* First Grid within the Second Grid */}
            <Grid sx={{ width: "70%" }} item xs={isMobile ? 12 : 9}>
              <Box style={{ height: "100%" }}>
                {/* Content for the first Paper within the Second Grid */}

                <Box
                  sx={{
                    width: "100%",
                    minHeight: "36px",
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  {/* Content for filter Flight */}
                  <FilterComponent
                    flightDataArray={flightSearchData.Results}
                    onSortFlights={handleSortFlights}
                    onFilterByAirline={handleFilterByAirline}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex", // Ensure flex layout is used
                    flexWrap: "wrap", // Allow items to wrap if needed
                    justifyContent: "center", // Center items horizontally
                    alignItems: "center", // Align items vertically
                    marginTop: "10px",
                    marginBottom: "5px",
                    backgroundColor: "rgba(255,255,255,0.5)",
                    border: "1px solid white",
                    borderRadius: "5px",
                  }}
                >
                  <RecommendFilter
                    flightDataArray={flightSearchData.Results}
                    onSortFlights={handleSortFlights}
                  />
                </Box>
                {isLoading ? (
                  <Skeleton variant="text" width={100} height={20} />
                ) : (
                  <Typography
                    alignSelf="baseline"
                    sx={{
                      color: "green",
                      // Use a function to apply responsive font sizes based on the theme's breakpoints
                      fontSize: {
                        xs: "14px", // xs represents extra-small to small screens (mobile devices)
                        sm: "18px", // sm and above represents larger screens (tablets, desktops)
                      },
                    }}
                  >
                    {totalFlights} Flight Results {uniqueAirlines.length} Unique
                    Airlines
                  </Typography>
                )}
                <Box style={{ marginTop: "10px" }}>
                  {/* Iterate over flight results */}
                  {showSortedFlights
                    ? // Display sorted flights when showSortedFlights is true
                      sortedFlights.map((flight, index) => (
                        <div key={flight.ResultID}>
                          <FlightCard
                            flightData={flight}
                            availability={flight.Availabilty}
                            isLoading={loadingState}
                          />
                          {/* {index < sortedFlights.length - 1 && (
                            <hr style={{ margin: "10px 0" }} />
                          )} */}
                        </div>
                      ))
                    : // Display unsorted flights when showSortedFlights is false
                      flightSearchData?.Results &&
                      flightSearchData.Results.map((flight, index) => (
                        <div key={flight.ResultID}>
                          <FlightCard
                            flightData={flight}
                            availability={flight.Availabilty}
                            isLoading={loadingState}
                            onFetchingStart={() => setBackdropOpen(true)} // Function to open the backdrop
                            onFetchingComplete={() => setBackdropOpen(false)}
                          />
                          {/* {index < flightSearchData.Results.length - 1 && (
                            // <hr style={{ margin: "10px 0" }} />
                          )} */}
                        </div>
                      ))}
                </Box>
              </Box>
            </Grid>

            {/* Second Grid within the Second Grid */}
            <Grid sx={{ width: "30%" }} item xs={false} sm={false}>
              <Box style={{ height: "100%", padding: 16 }}>
                {/* Content for the second Paper within the Second Grid */}
                Show ad here
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "fixed", // Ensures it's positioned relative to the viewport
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LayoutPage>
  );
};

export default FlightResults;
