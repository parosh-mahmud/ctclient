import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
// import { FlightTakeoff, FlightLand, ArrowRightAlt } from '@material-ui/icons';
import { FaPlaneArrival } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TabContext } from "@mui/lab";
import TabComponent from "../tabComponent/TabComponent";
import FlightIcon from "@mui/icons-material/Flight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircleIcon from "@mui/icons-material/Circle";
import Skeleton from "@mui/material/Skeleton";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { fetchAirPrice } from "../../redux/slices/airPriceSlice";
import { selectFlightSearchData } from "../../redux/reducers/flightSlice";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { setSearchIDResultID } from "../../redux/slices/searchIDResultIDSlice";
import { selectIsLoadingFlightData } from "../../redux/reducers/flightSlice";

import { useMediaQuery, useTheme } from "@mui/material";
import FlightCardMobile from "./FlightCardMobile";

const BASE_URL = process.env.REACT_APP_API_URL;
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgba(255,255,255,0.5)",
    display: "flex",
    flexDirection: "column", // Default to column layout for mobile
    borderRadius: "5px",

    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  content: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  firstRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  secondRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  thirdRow: {
    display: "flex",
    justifyContent: "",
    flexDirection: "column",
    marginBottom: theme.spacing(1),
  },
  fourthRow: {
    display: "flex",
    justifyContent: "flex-end",
  },

  fullButton: {
    display: "flex", // Ensure the button contents use flexbox
    justifyContent: "space-between", // Space between text and icon
    width: "100%", // Full width button
  },
  buttonText: {
    flex: 1, // Make text occupy the full width available
    textAlign: "left", // Align text to the left
  },
  firstBox: {
    width: "100%", // Full width on mobile devices
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  },
  cityName: {
    color: theme.palette.primary.main,
  },
  nestedBoxes: {
    display: "flex",
    flexDirection: "column", // Stack nested boxes on mobile
    justifyContent: "space-between",
  },
  nestedBox: {
    width: "100%", // Each nested box takes full width on mobile
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
    marginBottom: theme.spacing(2), // Add some space between nested boxes
  },
  secondBox: {
    width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center items horizontally
    justifyContent: "flex-end", // Align items to the bottom
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      alignItems: "flex-end", // Adjust alignment for larger screens
      width: "50%",
      marginTop: 0,
    },
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(1),
    textAlign: "right",
    [theme.breakpoints.down("sm", "xs")]: {
      padding: theme.spacing(0.5),
      fontSize: "0.75rem",
      width: "90%",
      padding: "6px 8px",
      margin: "0 auto",
    },
  },
  // Use breakpoints to adjust layout for larger screens
  [theme.breakpoints.up("sm")]: {
    container: {
      flexDirection: "row",
    },
    nestedBoxes: {
      flexDirection: "row", // Side by side nested boxes for larger screens
    },
    nestedBox: {
      width: "50%", // Each takes half the width on larger screens
      margin: theme.spacing(0, 1), // Add margin between nested boxes
    },
    firstBox: {
      width: "90%", // Adjust width for larger screens
    },
    secondBox: {
      width: "10%", // Adjust width for the action buttons on larger screens
    },
  },
}));

export const FlightCard = ({
  onFetchingStart,
  onFetchingComplete,
  flightData,
  onSelect,
  availability,

  showActions = true,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const segment = flightData.segments[0];
  const segmentReturn = flightData.segments[1];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [airlineLogoUrl, setAirlineLogoUrl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isLoading = useSelector(selectIsLoadingFlightData);

  const flightSearchData = useSelector(selectFlightSearchData);

  useEffect(() => {
    if (flightData?.segments?.[0]?.Airline?.AirlineCode) {
      const fetchLogoUrl = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/airline/${flightData.segments[0].Airline.AirlineCode}`
          );
          setAirlineLogoUrl(response.data.logoUrl);
          // console.log("Logo URL:", response.data.logoUrl);
        } catch (error) {
          console.error("Error fetching airline logo:", error);
        }
      };
      fetchLogoUrl();
    }
  }, [flightData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetails = () => {
    setShowDetails((prev) => !prev); // Toggle visibility of details
    setActiveTab("0"); // Always open Flight Details tab when toggling
  };

  const calculateTotalAmount = () => {
    if (flightData && flightData.Fares && flightData.Fares[0]) {
      const baseFare = flightData.Fares[0].BaseFare || 0;
      const tax = flightData.Fares[0].Tax || 0;
      const discount = flightData.Fares[0].Discount || 0;
      const totalFare = flightData.TotalFare || 0;
      return totalFare + discount;
    } else {
      return 0; // or any default value you want to return when data is not available
    }
  };

  const calculateDuration = () => {
    const depTime = new Date(segment.Origin.DepTime);
    const arrTime = new Date(segment.Destination.ArrTime);

    const durationInMinutes = (arrTime - depTime) / (1000 * 60); // Convert milliseconds to minutes

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours > 0) {
      return `${hours} Hr ${minutes} Min`;
    } else {
      return `${minutes} Min`;
    }
  };

  // console.log(Result_ID)
  // console.log(SearchIDs)

  const handleSelect = async () => {
    try {
      onFetchingStart(); // Show backdrop
      // Validate flightData structure before proceeding
      if (!flightData?.segments?.length || !flightData.segments[0]?.Airline) {
        console.error("Incomplete flightData structure");
        return; // Exit the function if data is not structured as expected
      }

      const requestBody = {
        SearchID: flightSearchData.SearchId,
        ResultID: flightData.ResultID,
      };

      await dispatch(fetchAirPrice(requestBody));
      dispatch(
        setSearchIDResultID({
          searchId: flightSearchData.SearchId,
          resultId: flightData.ResultID,
        })
      );
      history.push("/airprebookform");

      if (typeof onSelect === "function") {
        onSelect(flightData);
      }
      onFetchingComplete();
    } catch (error) {
      console.error("Error fetching airPrice:", error);
      onFetchingComplete();
    }
  };

  return (
    <TabContext value={activeTab.toString()}>
      {isMobile ? (
        <FlightCardMobile
          flightData={flightData}
          isLoading={isLoading}
          onSelect={onSelect}
          calculateTotalAmount={calculateTotalAmount}
          calculateDuration={calculateDuration}
          handleSelect={handleSelect}
          showDetails={showDetails}
          handleViewDetails={handleViewDetails}
          airlineLogoUrl={airlineLogoUrl}
          isMobile={isMobile}
          segment={segment}
          classes={classes}
          showActions={showActions}
        />
      ) : (
        // Your existing desktop layout goes here
        <Box sx={{ boxShadow: 3 }} className={classes.container}>
          <Box className={classes.firstBox}>
            {/* Content for the first box */}
            <div style={{ display: "flex" }}>
              {/* First Box */}
              <Box
                style={{
                  width: "50%",

                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  style={{
                    flex: "8",

                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ justifyContent: "center" }}>
                    {/* box 1.1 */}
                    <Box sx={{ display: "flex" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          paddingRight: "10px",
                          marginTop: "-25px",
                        }}
                      >
                        {/* airline logo here */}
                        {isLoading ? (
                          <Skeleton variant="circular" width={90} height={90} />
                        ) : (
                          airlineLogoUrl && (
                            <img
                              src={airlineLogoUrl}
                              alt="Airline Logo"
                              width="80"
                              height="80"
                            />
                          )
                        )}
                      </Box>
                      <Box sx={{}}>
                        {/* airline code + flight number */}
                        <Box sx={{ display: "flex" }}>
                          <Typography variant={isMobile ? "body2" : "h6"}>
                            <FlightInfoItem
                              isLoading={isLoading}
                              isMobile={isMobile}
                              valueStyle={{ fontWeight: "bold" }}
                              value={
                                segment.Airline
                                  ? segment.Airline.AirlineCode
                                  : "N/A"
                              }
                            />
                          </Typography>

                          <Typography variant={isMobile ? "body2" : "h6"}>
                            <FlightInfoItem
                              isMobile={isMobile}
                              isLoading={isLoading}
                              valueStyle={{ fontWeight: "bold" }}
                              value={
                                segment.Airline
                                  ? segment.Airline.FlightNumber
                                  : "N/A"
                              }
                            />
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant={isMobile ? "body2" : "h6"}>
                            <FlightInfoItem
                              isMobile={isMobile}
                              isLoading={isLoading}
                              valueStyle={{ fontWeight: "bold" }}
                              label="Aircraft: "
                              value={
                                segment.Equipment
                                  ? `${segment.Equipment}`
                                  : "N/A"
                              }
                            />
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant={isMobile ? "body2" : "h6"}
                            sx={{ display: "flex" }}
                          >
                            {isLoading ? (
                              <Skeleton width={90} height={30} />
                            ) : (
                              <AirlineSeatReclineNormalIcon
                                style={{
                                  fontSize: isMobile ? "1.5rem" : "2rem",
                                }}
                              />
                            )}

                            <FlightInfoItem
                              isMobile={isMobile}
                              isLoading={isLoading}
                              valueStyle={{ fontWeight: "bold" }}
                              value={availability}
                            />
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant={isMobile ? "body2" : "h6"}>
                        <FlightInfoItem
                          isMobile={isMobile}
                          isLoading={isLoading}
                          value={
                            segment.Airline
                              ? segment.Airline.AirlineName
                              : "N/A"
                          }
                        />
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "2",

                    justifyContent: "center", // Center content horizontally
                    alignItems: "center", // Center content vertically
                  }}
                >
                  <Typography variant={isMobile ? "body2" : "h6"}>
                    {" "}
                    <FlightInfoItem
                      isMobile={isMobile}
                      isLoading={isLoading}
                      valueStyle={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: "2rem",
                      }}
                      value={
                        segment.Origin ? segment.Origin.Airport.CityName : "N/A"
                      }
                    />
                  </Typography>
                  <Typography variant={isMobile ? "body2" : "h6"}>
                    {" "}
                    <FlightInfoItem
                      isMobile={isMobile}
                      isLoading={isLoading}
                      value={
                        segment.Origin ? segment.Origin.Airport.CityCode : "N/A"
                      }
                    />
                  </Typography>
                </Box>
              </Box>

              {/* Second Box */}
              <Box
                style={{
                  width: "50%",

                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: "1",
                  }}
                >
                  <Box>
                    {/* time */}
                    <Typography variant={isMobile ? "body2" : "h6"}>
                      {" "}
                      <FlightInfoItem
                        isMobile={isMobile}
                        isLoading={isLoading}
                        valueStyle={{ fontWeight: "bold", fontSize: "2rem" }}
                        value={
                          segment.Destination
                            ? new Date(
                                segment.Origin.DepTime
                              ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            : "N/A"
                        }
                        icon={
                          <FaPlaneArrival
                            style={{ fontSize: isMobile ? "1.5rem" : "2rem" }}
                          />
                        }
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box
                  style={{
                    flex: "1",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    {isLoading ? (
                      <Skeleton width={90} height={30} />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FlightIcon
                          style={{
                            fontSize: isMobile ? "1rem" : "1.5rem",
                            transform: "rotate(90deg)",
                          }}
                        />
                        <MoreHorizIcon
                          style={{ fontSize: isMobile ? "1rem" : "1.5rem" }}
                        />
                        <MoreHorizIcon
                          style={{
                            fontSize: isMobile ? "1rem" : "1.5rem",
                            marginLeft: "-5px",
                          }}
                        />
                        <CircleIcon
                          style={{ fontSize: isMobile ? "1rem" : "1.5rem" }}
                        />
                      </Box>
                    )}

                    <Box>
                      {/* duration */}

                      <FlightInfoItem
                        isLoading={isLoading}
                        isMobile={isMobile}
                        value={calculateDuration()}
                        icon={<FaPlaneArrival />}
                      />
                    </Box>
                  </div>
                </Box>

                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: "1",
                  }}
                >
                  <Typography variant={isMobile ? "body2" : "h6"}>
                    {" "}
                    <FlightInfoItem
                      isMobile={isMobile}
                      isLoading={isLoading}
                      valueStyle={{ fontWeight: "bold", fontSize: "2rem" }}
                      value={
                        segment.Destination
                          ? new Date(
                              segment.Destination.ArrTime
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                          : "N/A"
                      }
                      icon={<FaPlaneArrival />}
                    />
                  </Typography>
                </Box>
                <Box
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant={isMobile ? "body2" : "h6"}>
                    <FlightInfoItem
                      isMobile={isMobile}
                      isLoading={isLoading}
                      valueStyle={{
                        fontSize: "2rem",
                        color: "green",
                        fontWeight: "bold",
                      }}
                      value={
                        segment.Destination
                          ? segment.Destination.Airport.CityName
                          : "N/A"
                      }
                    />
                    <FlightInfoItem
                      isMobile={isMobile}
                      value={
                        segment.Destination
                          ? segment.Destination.Airport.CityCode
                          : "N/A"
                      }
                    />
                  </Typography>
                </Box>
              </Box>
            </div>

            {/* flight card with showActions false */}
            {segmentReturn && segmentReturn.TripIndicator === "InBound" && (
              <div>
                <FlightCard
                  flightData={{ ...flightData, segments: [segmentReturn] }} // Pass only the inbound segment
                  availability={availability}
                  isLoading={isLoading}
                  showActions={false} // Hide actions for this specific FlightCard
                  showDetails={false} // Ensuring details are not expandable for this card
                />
              </div>
            )}

            {showActions && (
              <Button
                sx={{
                  textTransform: "capitalize",
                }}
                // variant="contained"
                color="primary"
                backgroundColor="rgba(255,255,255,0.5)"
                onClick={handleViewDetails}
                className={classes.button}
                style={{ justifyContent: "flex-end" }}
                endIcon={
                  showDetails ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                {showDetails ? "Hide Details" : "View Details"}
              </Button>
            )}
          </Box>
          {showActions && (
            <Box className={classes.secondBox}>
              {/* Content for the second box */}
              <Typography variant={isMobile ? "body2" : "h6"}>
                {isLoading ? (
                  <Skeleton width={90} height={30} />
                ) : (
                  <Typography
                    variant={isMobile ? "body2" : "h6"}
                    fontWeight="bold"
                  >
                    BDT {calculateTotalAmount()}
                  </Typography>
                )}
              </Typography>

              <Button
                variant="text"
                style={{ textTransform: "capitalize", fontSize: "10px" }}
                onClick={handleMenuOpen}
                endIcon={
                  anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
              >
                Economy Flex
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Economy Flex</MenuItem>
                <MenuItem onClick={handleMenuClose}>Demo 1</MenuItem>
                <MenuItem onClick={handleMenuClose}>Demo 2</MenuItem>
              </Menu>
              <Button
                onClick={handleSelect}
                variant="contained"
                color="primary"
                className={classes.button}
                style={{ justifyContent: "flex-end" }}
                endIcon={<ArrowForwardIcon />}
              >
                Select
              </Button>
            </Box>
          )}
        </Box>
      )}
      {/* Additional content shown when View Details button is clicked */}
      {showDetails && (
        <TabComponent activeTab={activeTab} handleTabChange={handleTabChange} />
      )}
    </TabContext>
  );
};

export const FlightInfoItem = ({ label, value, valueStyle }) => {
  const theme = useTheme();
  // Define breakpoints for responsiveness
  const isXs = useMediaQuery(theme.breakpoints.down("xs")); // Extra-small devices
  const isSm = useMediaQuery(theme.breakpoints.between("xs", "sm")); // Small devices
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "md")); // Medium devices
  // You can continue for lg and xl if needed
  const isLoading = useSelector(selectIsLoadingFlightData);

  // Determine the typography variant based on the screen size
  let variant;
  if (isXs) {
    variant = "body2";
  } else if (isSm) {
    variant = "body1";
  } else if (isMd) {
    variant = "h6";
  } else {
    variant = "h5"; // Default for larger than 'md'
  }

  // Adjust styles dynamically based on screen size
  const dynamicValueStyle = {
    ...valueStyle,
    fontSize: isXs ? "0.75rem" : isSm ? "0.875rem" : isMd ? "1rem" : "1.25rem",
  };

  return (
    <Box flex="1 1 50%" display="flex" alignItems="center">
      {isLoading ? (
        <Skeleton width={60} height={20} style={{ marginRight: 10 }} />
      ) : (
        <Typography variant={variant}>{label}</Typography>
      )}
      {isLoading ? (
        <Skeleton width={90} height={30} style={{ marginLeft: 10 }} />
      ) : (
        <Typography variant={variant} style={dynamicValueStyle}>
          {value}
        </Typography>
      )}
    </Box>
  );
};

export default FlightCard;
