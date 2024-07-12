import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Skeleton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowForward as ArrowForwardIcon,
  AirlineSeatReclineNormal as AirlineSeatReclineNormalIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Flight as FlightIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TabComponent from "../tabComponent/TabComponent";
import FlightCardMobile from "./FlightCardMobile";
import { fetchAirPrice } from "../../redux/slices/airPriceSlice";
import "./FlightCard.css";
import {
  selectFlightSearchData,
  selectIsLoadingFlightData,
  selectFlightSearchParams,
} from "../../redux/reducers/flightSlice";
import { setSearchIDResultID } from "../../redux/slices/searchIDResultIDSlice";
import useStyles from "./FlightCardStyles";
import { TabContext } from "@mui/lab";

const BASE_URL = process.env.REACT_APP_API_URL;

export const FlightCard = React.memo(
  ({
    onFetchingStart,
    onFetchingComplete,
    flightData,
    onSelect,
    availability,
    showActions = true,
  }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();
    const searchparams = useSelector(selectFlightSearchParams);
    const [activeTab, setActiveTab] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [airlineLogoUrl, setAirlineLogoUrl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const isLoading = useSelector(selectIsLoadingFlightData);
    const flightSearchData = useSelector(selectFlightSearchData);
    const totalPassenger = searchparams.AdultQuantity;
    const isMenuOpen = Boolean(anchorEl);
    console.log(flightSearchData);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
      if (flightData?.segments?.[0]?.Airline?.AirlineCode) {
        const fetchLogoUrl = async () => {
          try {
            const response = await axios.get(
              `${BASE_URL}/api/airline/${flightData.segments[0].Airline.AirlineCode}`
            );
            setAirlineLogoUrl(response.data.logoUrl);
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
      setShowDetails((prev) => !prev);
      setActiveTab("0");
    };

    const calculateTotalAmount = () => {
      let totalAmount = 0;

      if (Array.isArray(flightData.Fares)) {
        flightData.Fares.forEach((fare) => {
          const baseFare = fare.BaseFare || 0;
          const tax = fare.Tax || 0;
          const otherCharges = fare.OtherCharges || 0;
          const serviceFees = fare.ServiceFee || 0;

          totalAmount +=
            (baseFare + tax + otherCharges + serviceFees) * fare.PassengerCount;
        });
      } else {
        console.error(
          "Fares is not an array or is undefined",
          flightData.Fares
        );
      }

      return totalAmount;
    };

    const calculateDuration = (segment) => {
      if (
        !segment ||
        !segment.Origin ||
        !segment.Destination ||
        !segment.Origin.DepTime ||
        !segment.Destination.ArrTime
      ) {
        console.error("Invalid segment data:", segment);
        return "N/A"; // Return "N/A" if any required data is missing
      }

      const depTime = new Date(segment.Origin.DepTime);
      const arrTime = new Date(segment.Destination.ArrTime);

      const durationInMinutes = (arrTime - depTime) / (1000 * 60);

      const hours = Math.floor(durationInMinutes / 60);
      const minutes = Math.round(durationInMinutes % 60); // Use Math.round to avoid floating point arithmetic issues

      return hours > 0 ? `${hours} Hr ${minutes} Min` : `${minutes} Min`;
    };

    const handleSelect = async () => {
      try {
        onFetchingStart();
        if (!flightData?.segments?.length || !flightData.segments[0]?.Airline) {
          console.error("Incomplete flightData structure");
          return;
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
            segment={flightData.segments[0]}
            classes={classes}
            showActions={showActions}
          />
        ) : (
          <Box
            sx={{
              marginTop: "20px",
              boxShadow: "4",
              borderRadius: "10px",
              paddingBottom: "1px",
            }}
            className="container"
          >
            {flightData.segments.map((segment, index) => (
              <React.Fragment key={index}>
                <div className="flight-card">
                  <div className="grid-item logo">
                    {isLoading ? (
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        width={90}
                        height={90}
                      />
                    ) : (
                      airlineLogoUrl && (
                        <img
                          src={airlineLogoUrl}
                          alt="Airline Logo"
                          width="90"
                          height="90"
                        />
                      )
                    )}
                  </div>

                  <div className="grid-item flight-number">
                    <Box>
                      <Typography fontWeight="bold">
                        {isLoading ? (
                          <Skeleton animation="wave" width={30} />
                        ) : segment.Airline ? (
                          segment.Airline.FlightNumber
                        ) : (
                          "N/A"
                        )}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography fontWeight="bold">
                        {isLoading ? (
                          <Skeleton animation="wave" width={30} />
                        ) : segment.Airline ? (
                          segment.Airline.AirlineCode
                        ) : (
                          "N/A"
                        )}
                      </Typography>
                      <Typography fontWeight="bold">
                        {isLoading ? (
                          <Skeleton animation="wave" width={30} />
                        ) : segment.Equipment ? (
                          `${segment.Equipment}`
                        ) : (
                          "N/A"
                        )}
                      </Typography>
                    </Box>
                  </div>

                  <div className="grid-item aircraft-model"></div>
                  <div className="grid-item airline-name">
                    {" "}
                    <Typography color="#0067FF">
                      {isLoading ? (
                        <Skeleton animation="wave" width={200} height={30} />
                      ) : segment.Airline ? (
                        segment.Airline.AirlineName
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                  </div>

                  <div className="grid-item departure-city">
                    <Typography
                      fontSize="2rem"
                      color="#0067FF"
                      fontWeight="bold"
                      className="city-name"
                    >
                      {isLoading ? (
                        <Skeleton animation="wave" width={80} />
                      ) : segment.Origin ? (
                        segment.Origin.Airport.CityName
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                    <Typography fontSize="1.5rem" className="city-code">
                      {isLoading ? (
                        <Skeleton animation="wave" width={40} />
                      ) : segment.Origin ? (
                        segment.Origin.Airport.CityCode
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                  </div>
                  <div className="grid-item blank"></div>
                  <div className="grid-item arrival-city">
                    <Typography
                      fontSize="2rem"
                      color="#0067FF"
                      fontWeight="bold"
                    >
                      {isLoading ? (
                        <Skeleton animation="wave" width={80} />
                      ) : segment.Destination ? (
                        segment.Destination.Airport.CityName
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                      fontSize="1.5rem"
                      mt="-15px"
                    >
                      {isLoading ? (
                        <Skeleton animation="wave" width={40} />
                      ) : segment.Destination ? (
                        segment.Destination.Airport.CityCode
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                  </div>
                  <div className="grid-item departure-time">
                    <Typography fontSize="3rem" fontWeight="bold">
                      {isLoading ? (
                        <Skeleton animation="wave" width={80} />
                      ) : segment.Origin ? (
                        new Date(segment.Origin.DepTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }
                        )
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                    <Typography
                      variant={isMobile ? "body2" : "h6"}
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginTop: "-15px",
                      }}
                    >
                      {isLoading ? (
                        <Skeleton animation="wave" width={80} />
                      ) : segment.Origin ? (
                        new Date(segment.Origin.DepTime).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      ) : (
                        ""
                      )}
                    </Typography>
                  </div>
                  <div className="grid-item itinerary-icon">
                    {" "}
                    <Box
                      style={{
                        flex: "1",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80%", // Use 100% instead of 200px
                        }}
                      >
                        {isLoading ? (
                          <Skeleton animation="wave" width="100%" height={30} /> // Make Skeleton also responsive
                        ) : (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%", // Ensuring it uses full width
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                  alignItems: "center",
                                  paddingLeft: "3px",

                                  width: "100%", // Ensure internal box also uses full width
                                }}
                              >
                                <Divider
                                  sx={{
                                    borderColor: "#0067FF",
                                    borderWidth: "1px",
                                    width: "30%", // Using percentage instead of fixed value
                                  }}
                                />
                                <Typography
                                  style={{
                                    width: "40%", // Allocate width for the duration text
                                    textAlign: "center", // Center the text

                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    fontSize: "15px",
                                  }}
                                >
                                  {calculateDuration(segment)}
                                </Typography>
                                <Divider
                                  sx={{
                                    borderColor: "#0067FF",
                                    borderWidth: "1px",
                                    width: "30%", // Using percentage for symmetry
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "-15px !important",
                              }}
                            >
                              <FlightIcon
                                style={{
                                  fontSize: isMobile ? "1rem" : "1.5rem",
                                  color: "#0067FF",
                                  transform: "rotate(90deg)",
                                }}
                              />
                              <Divider
                                sx={{
                                  borderColor: "#0067FF",
                                  borderWidth: "1px",
                                  width: "100%", // Full width divider
                                }}
                              />
                              <CircleIcon
                                style={{
                                  fontSize: isMobile ? "12px" : "12px",
                                  color: "#0067FF",
                                  marginLeft: 2,
                                }}
                              />
                            </Box>
                          </>
                        )}
                      </div>
                    </Box>
                  </div>
                  <div className="grid-item arrival-time">
                    {" "}
                    <Typography fontSize="3rem" fontWeight="bold">
                      {isLoading ? (
                        <Skeleton animation="wave" width={80} />
                      ) : segment.Destination ? (
                        new Date(
                          segment.Destination.ArrTime
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                    <Typography
                      variant={isMobile ? "body2" : "h6"}
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginTop: "-15px",
                      }}
                    >
                      {isLoading ? (
                        <Skeleton animation="wave" width={80} />
                      ) : segment.Destination ? (
                        new Date(
                          segment.Destination.ArrTime
                        ).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      ) : (
                        ""
                      )}
                    </Typography>
                  </div>
                  <div className="grid-item departure-airport">
                    {isLoading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={100}
                        height={20}
                      />
                    ) : (
                      <Typography
                        variant={isMobile ? "body2" : "h6"}
                        style={{
                          fontSize: "0.875rem",

                          whiteSpace: "nowrap",
                          width: "100%",
                          maxWidth: "100%",
                          display: "block",
                          marginTop: "-5px",
                        }}
                      >
                        {segment.Origin
                          ? segment.Origin.Airport.AirportName
                          : "Unknown Airport"}
                      </Typography>
                    )}
                  </div>
                  <div className="grid-item blank"></div>
                  <div className="grid-item arrival-airport">
                    {" "}
                    <Typography
                      variant={isMobile ? "body2" : "h6"}
                      style={{
                        fontSize: "0.875rem",
                        whiteSpace: "nowrap",
                        width: "100%",
                        maxWidth: "100%",
                        display: "block",
                        marginTop: "-5px",
                      }}
                    >
                      {isLoading ? (
                        <Skeleton animation="wave" width={100} height={20} />
                      ) : segment.Destination ? (
                        segment.Destination.Airport.AirportName
                      ) : (
                        "Unknown Airport"
                      )}
                    </Typography>
                  </div>
                  {index === 0 && (
                    <>
                      <div className="grid-item price">
                        {" "}
                        <Typography>
                          {isLoading ? (
                            <Skeleton animation="wave" width={90} height={60} />
                          ) : (
                            <Typography fontSize="2rem" fontWeight="bold">
                              BDT {calculateTotalAmount()}
                            </Typography>
                          )}
                        </Typography>
                      </div>
                      <div className="grid-item seat-option">
                        {isLoading ? (
                          <>
                            <Skeleton
                              width={100}
                              height={30}
                              animation="wave"
                            />
                          </>
                        ) : (
                          <>
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center", // Ensure vertical center alignment within Typography
                                justifyContent: "center", // Center the icon and text inside Typography
                                fontWeight: "bold",
                                marginRight: 2, // Optional: adds space between Typography and Button
                              }}
                            >
                              <AirlineSeatReclineNormalIcon
                                style={{
                                  color: "#0067FF",
                                  fontSize: "1.3rem",
                                }}
                              />
                              {availability}
                            </Typography>
                            <Button
                              sx={{
                                textOverflow: "ellipsis",
                                fontSize: "13px",
                                whiteSpace: "nowrap",
                                textAlign: "left",
                                color: "black",
                                textTransform: "none",
                                padding: 0,
                                "& .MuiSvgIcon-root": {
                                  transition: "transform 0.3s",
                                  transform: isMenuOpen
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                },
                              }}
                              onClick={handleClick}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              Economy FL
                            </Button>

                            <Menu
                              anchorEl={anchorEl}
                              open={isMenuOpen}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose}>Demo 1</MenuItem>
                              <MenuItem onClick={handleClose}>Demo 2</MenuItem>
                            </Menu>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
                {index === 0 && (
                  <Divider
                    variant="middle"
                    sx={{
                      my: 2,
                      width: "80%", // Adjust the percentage to control the divider's width
                      marginLeft: "-1px",
                      marginRight: "auto",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
            {showActions && (
              <div
                className="button-container"
                style={{ display: "flex", width: "100%" }}
              >
                <Button
                  sx={{
                    textTransform: "capitalize",
                    color: "white",
                    backgroundColor: "#0067FF",
                    borderBottomRightRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    ":hover": {
                      backgroundColor: "#00008B", // Darker blue on hover
                    },
                  }}
                  onClick={handleViewDetails}
                  className="view-details-button"
                  style={{
                    width: "90%", // Set width to 70%
                    justifyContent: "flex-end",
                    borderTopRightRadius: "0px", // Set top left border radius
                    borderBottomRightRadius: "10px", // Set bottom left border radius
                  }}
                  endIcon={
                    <KeyboardArrowDownIcon
                      style={{
                        transform: showDetails
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    />
                  }
                >
                  {showDetails ? "Hide Details" : "View Details"}
                </Button>
                <Button
                  fullWidth
                  onClick={handleSelect}
                  variant="contained"
                  color="primary"
                  className="select-button"
                  style={{
                    width: "20%", // Set width to 30%
                    justifyContent: "flex-end",
                    borderTopLeftRadius: "0px", // No radius on the top left
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px", // No radius on the bottom left
                    ":hover": {
                      backgroundColor: "#00008B", // Darker blue on hover
                    },
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Select
                </Button>
              </div>
            )}
            {showDetails && (
              <TabComponent
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                flightDataf={flightData}
              />
            )}
          </Box>
        )}
      </TabContext>
    );
  }
);

export const FlightInfoItem = React.memo(
  ({ icon, value, valueStyle, isMobile, isLoading }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("xs"));
    const isSm = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isMd = useMediaQuery(theme.breakpoints.between("sm", "md"));

    let variant;
    if (isXs) {
      variant = "body2";
    } else if (isSm) {
      variant = "body1";
    } else if (isMd) {
      variant = "h6";
    } else {
      variant = "h5";
    }

    return (
      <Box flex="1" display="flex" alignItems="center">
        {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
        {isLoading ? (
          <Skeleton width={60} height={20} />
        ) : (
          <Typography variant={variant} style={{ ...valueStyle, flexGrow: 1 }}>
            {value}
          </Typography>
        )}
      </Box>
    );
  }
);

export default FlightCard;
