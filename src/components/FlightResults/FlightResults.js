import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
  Backdrop,
  CircularProgress,
  Collapse,
} from "@mui/material";
import LayoutPage from "../../pages/LayoutPage";
import FlightCard from "./FlightCard";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FilterByDate from "../filterComponent/FilterByDate";
import FilterComponent from "../filterComponent/FilterComponent";
import SearchForm from "../FlightSearch/SearchForm";
import RecommendFilter from "../filterComponent/RecommendFilter";

import {
  fetchFlightResults,
  selectFlightSearchData,
  selectFlightSearchParams,
  selectIsLoadingFlightData,
  selectFlightError,
  setSearchParams,
} from "../../redux/reducers/flightSlice";
import { useLocation } from "react-router-dom";

const FlightResults = () => {
  const flightSearchData = useSelector(selectFlightSearchData);
  const dispatch = useDispatch();
  const currentSearchParams = useSelector(selectFlightSearchParams);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(currentSearchParams);
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);
  const [uniqueAirlines, setUniqueAirlines] = useState([]);
  const [showSortedFlights, setShowSortedFlights] = useState(false);
  const [sortedFlights, setSortedFlights] = useState([]);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [selectedRefundable, setSelectedRefundable] = useState("All");

  useEffect(() => {
    if (flightSearchData?.Results?.length > 0) {
      const airlineNames = flightSearchData.Results.flatMap((flight) =>
        flight.segments.map((segment) => segment.Airline.AirlineName)
      );
      const uniqueAirlineNames = [...new Set(airlineNames)];
      setUniqueAirlines(uniqueAirlineNames);
    }
  }, [flightSearchData.Results]);

  const totalFlights = flightSearchData?.Results?.length || 0;

  const handleFilterByAirline = (airlineName) => {
    if (airlineName === "All Airlines") {
      setShowSortedFlights(false);
    } else {
      const filteredFlights = flightSearchData.Results.filter((flight) =>
        flight.segments.some(
          (segment) => segment.Airline.AirlineName === airlineName
        )
      );
      setSortedFlights(filteredFlights);
      setShowSortedFlights(true);
    }
  };

  const handleToggleSearchForm = () => {
    setIsSearchFormVisible((prevVisible) => !prevVisible);
  };

  const isLoading = useSelector(selectIsLoadingFlightData);
  const error = useSelector(selectFlightError);
  const location = useLocation();

  const handleSortFlights = (sortBy) => {
    let sortedFlights = [...flightSearchData.Results];

    sortedFlights.sort((a, b) => {
      switch (sortBy) {
        case "Cheapest":
          return a.Fares[0].BaseFare - b.Fares[0].BaseFare;
        case "Highest":
          return b.Fares[0].BaseFare - a.Fares[0].BaseFare;
        case "Earlier Flight":
          return (
            new Date(a.segments[0].Origin.DepTime).getTime() -
            new Date(b.segments[0].Origin.DepTime).getTime()
          );
        case "Later Flight":
          return (
            new Date(b.segments[0].Origin.DepTime).getTime() -
            new Date(a.segments[0].Origin.DepTime).getTime()
          );
        default:
          return 0;
      }
    });

    setSortedFlights(sortedFlights);
    setShowSortedFlights(true);
  };

  const handleFilterByRefundable = (refundStatus) => {
    setSelectedRefundable(refundStatus);
    let filteredFlights;
    switch (refundStatus) {
      case "Refundable":
        filteredFlights = flightSearchData.Results.filter(
          (flight) => flight.IsRefundable === true
        );
        break;
      case "Partially Refundable":
        filteredFlights = flightSearchData.Results.filter(
          (flight) => flight.IsRefundable === true
        );
        break;
      case "Non-refundable":
        filteredFlights = flightSearchData.Results.filter(
          (flight) => flight.IsRefundable === false
        );
        break;
      default:
        filteredFlights = flightSearchData.Results;
    }
    setSortedFlights(filteredFlights);
    setShowSortedFlights(true);
  };

  const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const updatedSearchParams = {
      ...currentSearchParams,
      Segments: [
        {
          ...currentSearchParams.Segments[0],
          DepartureDateTime: `${formattedDate}T00:00:00Z`,
        },
      ],
    };
    dispatch(setSearchParams(updatedSearchParams));
    dispatch(fetchFlightResults(updatedSearchParams));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramsObject = Object.fromEntries(searchParams.entries());
    if (Object.keys(paramsObject).length > 0) {
      dispatch(fetchFlightResults(paramsObject));
    }
  }, [dispatch, location.search]);

  const handleFetchingStart = () => {
    setBackdropOpen(true);
  };

  const handleFetchingComplete = () => {
    setBackdropOpen(false);
  };

  const filterFlightsByLowestBaseFare = (flights) => {
    const flightMap = new Map();

    flights.forEach((flight) => {
      const flightNumber = flight.segments[0].Airline.FlightNumber;
      const currentFlight = flightMap.get(flightNumber);

      if (
        !currentFlight ||
        flight.Fares[0].BaseFare < currentFlight.Fares[0].BaseFare
      ) {
        flightMap.set(flightNumber, flight);
      }
    });

    return Array.from(flightMap.values());
  };

  const filteredFlights = filterFlightsByLowestBaseFare(
    showSortedFlights ? sortedFlights : flightSearchData?.Results || []
  );

  return (
    <LayoutPage>
      <Grid container style={{ width: "98%", padding: "0" }}>
        <Grid item xs={12}>
          <Box sx={{ height: "auto" }}>
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
                  width: { xs: "96%", md: "60%" },
                  display: "flex",
                  justifyContent: "center",
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
                      xs: "0.875rem",
                      md: "1.300rem",
                    },
                  }}
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
                  <span style={{ color: "white" }}>Modify search</span>
                </Button>
              </Box>
            </Box>
            <Collapse in={isSearchFormVisible}>
              <Box
                sx={{
                  padding: 2,
                  height: "auto",
                }}
              >
                <SearchForm searchButtonLabel="Search" />
              </Box>
            </Collapse>
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
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid sx={{ width: "70%" }} item xs={isMobile ? 12 : 9}>
              <Box style={{ height: "100%" }}>
                <Box
                  sx={{
                    width: "100%",
                    minHeight: "36px",
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  <FilterComponent
                    flightDataArray={flightSearchData.Results}
                    onSortFlights={handleSortFlights}
                    onFilterByAirline={handleFilterByAirline}
                    onFilterByRefundable={handleFilterByRefundable}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
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
                      fontSize: {
                        xs: "14px",
                        sm: "18px",
                      },
                    }}
                  >
                    {totalFlights} Flight Results {uniqueAirlines.length} Unique
                    Airlines
                  </Typography>
                )}
                <Box>
                  {filteredFlights.map((flight) => (
                    <div key={flight.ResultID}>
                      <FlightCard
                        flightData={flight}
                        availability={flight.Availabilty}
                        isLoading={isLoading}
                        onFetchingStart={handleFetchingStart}
                        onFetchingComplete={handleFetchingComplete}
                        showActions={true}
                      />
                    </div>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid sx={{ width: "30%" }} item xs={false} sm={false}>
              <Box style={{ height: "100%", padding: 16 }}>Show ad here</Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "fixed",
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
