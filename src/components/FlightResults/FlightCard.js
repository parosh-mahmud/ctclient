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
  Flight as FlightIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TabComponent from "../tabComponent/TabComponent";
import FlightCardMobile from "./FlightCardMobile";
import "./FlightCard.css";
import { TabContext } from "@mui/lab";
import fetchAirports from "../../services/api";

const BASE_URL = process.env.REACT_APP_API_URL;

export const FlightCard = React.memo(
  ({
    onFetchingStart,
    onFetchingComplete,
    flightData,
    onSelect,
    availability,
    showActions = true,
    isLoading,
  }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [activeTab, setActiveTab] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [airlineLogoUrl, setAirlineLogoUrl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const [departureInfo, setDepartureInfo] = useState({});
    const [arrivalInfo, setArrivalInfo] = useState({});

    // Correctly extracting segments
    const segments =
      flightData?.offer?.paxSegmentList?.map((item) => item.paxSegment) || [];

    useEffect(() => {
      const fetchDepartureInfo = async () => {
        try {
          const result = await fetchAirports(
            segments[0]?.departure?.iatA_LocationCode
          );
          if (result.length > 0) {
            setDepartureInfo(result[0]);
          }
        } catch (error) {
          console.error("Error fetching departure airport data:", error);
        }
      };

      const fetchArrivalInfo = async () => {
        try {
          const result = await fetchAirports(
            segments[0]?.arrival?.iatA_LocationCode
          );
          if (result.length > 0) {
            setArrivalInfo(result[0]);
          }
        } catch (error) {
          console.error("Error fetching arrival airport data:", error);
        }
      };

      fetchDepartureInfo();
      fetchArrivalInfo();
    }, [segments]);

    useEffect(() => {
      const fetchLogoUrl = async () => {
        const airlineCode = segments[0]?.marketingCarrierInfo?.carrierDesigCode;

        if (!airlineCode) {
          console.error("Airline code is missing in flight data");
          return;
        }

        try {
          const response = await axios.get(
            `${BASE_URL}/api/airline/${airlineCode}`
          );

          if (response?.data?.logoUrl) {
            setAirlineLogoUrl(response.data.logoUrl);
          } else {
            console.error("No logo URL found in response");
          }
        } catch (error) {
          console.error("Error fetching airline logo:", error);
        }
      };

      fetchLogoUrl();
    }, [segments]);

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
      if (segments.length === 0) return; // Prevent undefined access
      setShowDetails((prev) => !prev);
      setActiveTab("0");
    };

    const calculateTotalAmount = () => {
      let totalAmount = 0;

      if (Array.isArray(flightData.offer.fareDetailList)) {
        flightData.offer.fareDetailList.forEach((fareItem) => {
          const fareDetail = fareItem.fareDetail;
          const baseFare = fareDetail.baseFare || 0;
          const tax = fareDetail.tax || 0;
          const otherFee = fareDetail.otherFee || 0;
          const discount = fareDetail.discount || 0;
          const vat = fareDetail.vat || 0;
          const paxCount = fareDetail.paxCount || 1;

          totalAmount +=
            (baseFare + tax + otherFee + vat - discount) * paxCount;
        });
      }

      return totalAmount;
    };

    const calculateDuration = (segment) => {
      const durationInMinutes = parseInt(segment.duration, 10);

      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;

      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    const handleSelect = async () => {
      try {
        onFetchingStart();

        const requestBody = {
          offerId: flightData.offer.offerId,
        };

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
            calculateTotalAmount={calculateTotalAmount}
            calculateDuration={calculateDuration}
            handleSelect={handleSelect}
            showDetails={showDetails}
            handleViewDetails={handleViewDetails}
            airlineLogoUrl={airlineLogoUrl}
            isMobile={isMobile}
            segment={segments[0]}
            showActions={showActions}
          />
        ) : (
          <Box
            sx={{
              marginTop: "20px",
              boxShadow: showActions ? "4" : "none",
              borderRadius: "10px",
              paddingBottom: "1px",
            }}
            className="container"
          >
            {segments.map((segment, index) => (
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
                        ) : (
                          segment.marketingCarrierInfo
                            ?.marketingCarrierFlightNumber
                        )}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography fontWeight="bold">
                        {isLoading ? (
                          <Skeleton animation="wave" width={30} />
                        ) : (
                          segment.marketingCarrierInfo?.carrierDesigCode
                        )}
                      </Typography>
                      <Typography fontWeight="bold">
                        {isLoading ? (
                          <Skeleton animation="wave" width={30} />
                        ) : (
                          segment.iatA_AircraftType?.iatA_AircraftTypeCode
                        )}
                      </Typography>
                    </Box>
                  </div>

                  <div className="grid-item departure-city">
                    <Typography
                      fontSize="2rem"
                      color="#0067FF"
                      fontWeight="bold"
                      className="city-name"
                    >
                      {departureInfo.city || "Loading..."}
                    </Typography>
                    <Typography fontSize="1.5rem" className="city-code">
                      {segment.departure?.iatA_LocationCode || "Unknown Code"}
                    </Typography>
                  </div>
                  <div className="grid-item blank"></div>
                  <div className="grid-item arrival-city">
                    <Typography
                      fontSize="2rem"
                      color="#0067FF"
                      fontWeight="bold"
                    >
                      {arrivalInfo.city || "Loading..."}
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
                      {segment.arrival?.iatA_LocationCode || "Unknown Code"}
                    </Typography>
                  </div>
                  <div className="grid-item departure-time">
                    <Typography fontSize="3rem" fontWeight="bold">
                      {new Date(
                        segment.departure.aircraftScheduledDateTime
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Typography>
                    <Typography
                      variant={isMobile ? "body2" : "h6"}
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginTop: "-15px",
                      }}
                    >
                      {new Date(
                        segment.departure.aircraftScheduledDateTime
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                  </div>

                  <div className="grid-item itinerary-icon">
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
                          width: "80%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              alignItems: "center",
                              paddingLeft: "3px",
                              width: "100%",
                            }}
                          >
                            <Divider
                              sx={{
                                borderColor: "#0067FF",
                                borderWidth: "1px",
                                width: "30%",
                              }}
                            />
                            <Typography
                              style={{
                                width: "40%",
                                textAlign: "center",
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
                                width: "30%",
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
                              width: "100%",
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
                      </div>
                    </Box>
                  </div>

                  <div className="grid-item arrival-time">
                    <Typography fontSize="3rem" fontWeight="bold">
                      {new Date(
                        segment.arrival.aircraftScheduledDateTime
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Typography>
                    <Typography
                      variant={isMobile ? "body2" : "h6"}
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginTop: "-15px",
                      }}
                    >
                      {new Date(
                        segment.arrival.aircraftScheduledDateTime
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                  </div>

                  {/* Additional Information */}
                  <div className="grid-item departure-airport">
                    {departureInfo.name || "Loading..."}
                  </div>
                  <div className="grid-item blank"></div>
                  <div className="grid-item arrival-airport">
                    {arrivalInfo.name || "Loading..."}
                  </div>

                  {index === 0 && (
                    <>
                      {showActions && (
                        <div className="grid-item price">
                          <Typography fontSize="2rem" fontWeight="bold">
                            BDT {calculateTotalAmount(flightData)}
                          </Typography>
                        </div>
                      )}
                      <div className="grid-item seat-option">
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            marginRight: 2,
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
                          onClick={handleMenuOpen}
                          endIcon={<KeyboardArrowDownIcon />}
                        >
                          Economy FL
                        </Button>

                        <Menu
                          anchorEl={anchorEl}
                          open={isMenuOpen}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleMenuClose}>Demo 1</MenuItem>
                          <MenuItem onClick={handleMenuClose}>Demo 2</MenuItem>
                        </Menu>
                      </div>
                    </>
                  )}
                </div>

                {showActions && (
                  <Divider
                    variant="middle"
                    sx={{
                      my: 2,
                      width: "80%",
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
                      backgroundColor: "#00008B",
                    },
                  }}
                  onClick={handleViewDetails}
                  className="view-details-button"
                  style={{
                    width: "90%",
                    justifyContent: "flex-end",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "10px",
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
                    width: "20%",
                    justifyContent: "flex-end",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    ":hover": {
                      backgroundColor: "#00008B",
                    },
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Select
                </Button>
              </div>
            )}
            {showDetails &&
              segments.length > 0 && ( // Check if segments are available
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

export default FlightCard;
