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
  console.log(flightSearchData);
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);
  const [uniqueAirlines, setUniqueAirlines] = useState([]);
  const [showSortedFlights, setShowSortedFlights] = useState(false);
  const [sortedFlights, setSortedFlights] = useState([]);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [selectedRefundable, setSelectedRefundable] = useState("All");

  useEffect(() => {
    if (flightSearchData?.response?.offersGroup?.length > 0) {
      const airlineNames = flightSearchData.response.offersGroup.flatMap(
        (offerItem) => {
          const offer = offerItem.offer;
          const segments = offer.paxSegmentList.map((item) => item.paxSegment);
          return segments.map(
            (segment) =>
              segment.marketingCarrierInfo?.carrierName || "Unknown Airline"
          );
        }
      );
      const uniqueAirlineNames = [...new Set(airlineNames)];
      setUniqueAirlines(uniqueAirlineNames);
    }
  }, [flightSearchData]);

  const totalFlights = flightSearchData?.response?.offersGroup?.length || 0;

  const handleFilterByAirline = (airlineName) => {
    if (airlineName === "All Airlines") {
      setShowSortedFlights(false);
    } else {
      const filteredFlights = flightSearchData.response.offersGroup.filter(
        (offerItem) => {
          const offer = offerItem.offer;
          const segments = offer.paxSegmentList.map((item) => item.paxSegment);
          return segments.some(
            (segment) =>
              segment.marketingCarrierInfo?.carrierName === airlineName
          );
        }
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
    let sortedFlights = [...flightSearchData.response.offersGroup];

    sortedFlights.sort((a, b) => {
      const offerA = a.offer;
      const offerB = b.offer;

      const baseFareA = offerA.fareDetailList[0]?.fareDetail?.baseFare || 0;
      const baseFareB = offerB.fareDetailList[0]?.fareDetail?.baseFare || 0;

      switch (sortBy) {
        case "Cheapest":
          return baseFareA - baseFareB;
        case "Highest":
          return baseFareB - baseFareA;
        // Add cases for "Earlier Flight" and "Later Flight" as needed
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

    flights.forEach((offerItem) => {
      const offer = offerItem.offer;
      const flightNumber = offer.paxSegmentList[0]?.paxSegment?.flightNumber;
      const baseFare = offer.fareDetailList[0]?.fareDetail?.baseFare || 0;

      const currentFlight = flightMap.get(flightNumber);

      if (!currentFlight || baseFare < currentFlight.baseFare) {
        flightMap.set(flightNumber, { ...offerItem, baseFare });
      }
    });

    return Array.from(flightMap.values());
  };

  const filteredFlights = filterFlightsByLowestBaseFare(
    showSortedFlights
      ? sortedFlights
      : flightSearchData?.response?.offersGroup || []
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
                    flightDataArray={
                      flightSearchData?.response?.offersGroup || []
                    }
                    onSortFlights={handleSortFlights}
                    onFilterByAirline={handleFilterByAirline}
                    onFilterByRefundable={handleFilterByRefundable}
                    // onFilterByStops={handleFilterByStops} // Make sure to implement this function
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
                  {/* <RecommendFilter
                    flightDataArray={flightSearchData.Results}
                    onSortFlights={handleSortFlights}
                  /> */}
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
                  {filteredFlights.map((offerItem) => (
                    <div key={offerItem.offer.offerId}>
                      <FlightCard
                        flightData={offerItem}
                        availability={offerItem.offer.seatsRemaining}
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
