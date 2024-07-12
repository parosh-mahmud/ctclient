import React, { useState, useCallback } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";
import FlightInfoItem from "../FlightResults/FlightInfoItem";
import { TabPanel } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFlightSearchData,
  selectFlightSearchParams,
} from "../../redux/reducers/flightSlice";
import {
  selectSearchIDResultID,
  setSearchIDResultID,
} from "../../redux/slices/searchIDResultIDSlice";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import PlaceIcon from "@mui/icons-material/Place";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  fetchAirPrice,
  selectAirPriceData,
} from "../../redux/slices/airPriceSlice";

const TabComponent = React.memo(
  ({ activeTab, handleTabChange, flightDataf }) => {
    const flightData = useSelector(selectFlightSearchData);
    const segments = flightData?.Results?.[0]?.segments || [];
    const segment = flightDataf.segments[0]; // Assuming you want to display the first segment
    const discount = flightData?.Results?.[0]?.Discount;
    const fares = flightDataf.Fares || [];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const searchIDResultID = useSelector(selectSearchIDResultID);
    const basefare = fares[0]?.BaseFare || 0;
    const tax = fares[0]?.Tax || 0;
    const otherCharges = fares[0]?.OtherCharges || 0;
    const serviceFee = fares[0]?.ServiceFee || 0;
    const passengerCount = fares[0]?.PassengerCount || 0;
    const [cancellationInfo, setCancellationInfo] = useState(null);
    const [isLoadingCancellation, setIsLoadingCancellation] = useState(false);
    const { searchId, resultId } = useSelector(selectSearchIDResultID);
    const airPriceData = useSelector(selectAirPriceData);
    const dispatch = useDispatch();
    const passenger = useSelector(selectFlightSearchParams);

    const calculateSubtotal = () => {
      return fares.reduce((acc, fare) => {
        return (
          acc +
          (fare.BaseFare || 0) +
          (fare.ServiceFee || 0) +
          (fare.OtherCharges || 0) +
          (fare.Tax || 0)
        );
      }, 0);
    };

    const formatDuration = (duration) => {
      return duration ? `${duration} minutes` : "N/A";
    };

    const handleTabChangeWithApiCall = useCallback(
      async (event, newValue, flightData, flightDataf) => {
        handleTabChange(event, newValue);
        if (newValue === "3") {
          const searchId = flightData.SearchId;
          const resultId = flightDataf.ResultID;

          dispatch(
            setSearchIDResultID({
              searchId,
              resultId,
            })
          );

          setIsLoadingCancellation(true);
          try {
            await dispatch(
              fetchAirPrice({
                SearchID: searchId,
                ResultID: resultId,
              })
            );

            const airRules = airPriceData?.airRules;
            const penaltiesRule = airRules?.find(
              (rule) => rule.RuleType === "PE.PENALTIES"
            );
            setCancellationInfo(penaltiesRule);
          } catch (error) {
            console.error("Error fetching cancellation info:", error);
          } finally {
            setIsLoadingCancellation(false);
          }
        }
      },
      [dispatch, airPriceData, handleTabChange]
    );

    return (
      <Paper>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) =>
            handleTabChangeWithApiCall(event, newValue, flightData, flightDataf)
          }
          indicatorColor="primary"
          textColor="primary"
          orientation="horizontal"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            width: "auto",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            backgroundColor: "white",
            margin: "auto",
          }}
        >
          <Tab label="Flight Details" value="0" />
          <Tab label="Fare Summary" value="1" />
          <Tab label="Baggage" value="2" />
          <Tab label="Cancellation" value="3" />
          <Tab label="Date Change" value="4" />
          <Tab label="Fare Rules" value="5" />
          <Tab label="Class" value="6" />
          {/* Add other tabs as needed */}
        </Tabs>

        <TabPanel value={activeTab} index={activeTab}>
          {activeTab === "0" && (
            <Card raised sx={{ margin: "16px", borderRadius: "16px" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Flight Details
                </Typography>
                <Paper
                  elevation={0}
                  sx={{ padding: 2, backgroundColor: "transparent" }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box display="flex" alignItems="center">
                        <AirplaneTicketIcon
                          color="primary"
                          sx={{ marginRight: 1 }}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                          <strong>Operating Carrier:</strong>{" "}
                          {segment?.Airline?.OperatingCarrier || "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box display="flex" alignItems="center">
                        <EventSeatIcon
                          color="primary"
                          sx={{ marginRight: 1 }}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                          <strong>Flight Number:</strong>{" "}
                          {segment?.Airline?.FlightNumber || "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box display="flex" alignItems="left">
                        <FlightTakeoffIcon
                          color="primary"
                          sx={{ marginRight: "5px" }}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                          <strong>Departure Airport:</strong>{" "}
                          {segment?.Origin?.Airport?.AirportName || "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box display="flex" alignItems="left">
                        <FlightLandIcon
                          color="primary"
                          sx={{ marginRight: 1 }}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                          <strong>Destination Airport:</strong>{" "}
                          {segment?.Destination?.Airport?.AirportName || "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box display="flex" alignItems="center">
                        <AccessTimeIcon
                          color="primary"
                          sx={{ marginRight: 1 }}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                          <strong>Journey Duration:</strong>{" "}
                          {formatDuration(segment?.JourneyDuration)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box display="flex" alignItems="center">
                        <PlaceIcon color="primary" sx={{ marginRight: 1 }} />
                        <Typography variant="subtitle1" gutterBottom>
                          <strong>Aircraft:</strong>{" "}
                          {segment?.Equipment || "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </CardContent>
            </Card>
          )}

          {activeTab === "1" && (
            <Box
              sx={{
                flex: "1 0 40%",
                justifyContent: "center",
                alignContent: "center",
                padding: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  marginTop: "5px",
                  borderRadius: "5px",
                  padding: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {isMobile ? (
                  <Grid container spacing={1} alignItems="center">
                    {[
                      {
                        label: "Passenger Type:",
                        value: (
                          <>
                            Adult {passenger.AdultQuantity}
                            {passenger.ChildQuantity > 0 && (
                              <div>Child {passenger.ChildQuantity}</div>
                            )}
                            {passenger.InfantsQuantity > 0 && (
                              <div>Infants {passenger.InfantsQuantity}</div>
                            )}
                          </>
                        ),
                      },
                      { label: "Base fare:", value: basefare },
                      { label: "Taxes:", value: tax },
                      { label: "AIT & VAT:", value: "0" },
                      { label: "Discount:", value: "0" },
                      { label: "Other Charges:", value: otherCharges },
                      { label: "Service fee:", value: serviceFee },
                      { label: "Count:", value: passengerCount },
                      { label: "Sub Total:", value: calculateSubtotal() },
                    ].map((item, index) => (
                      <Grid item xs={12} key={index}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="subtitle1">
                            <strong>{item.label}</strong>
                          </Typography>
                          <Typography variant="body2">{item.value}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={1}>
                          <Typography variant="subtitle1">
                            <strong>Passenger Type:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="subtitle1">
                            <strong>Base fare:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="subtitle1">
                            <strong>Taxes:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="subtitle1">
                            <strong>AIT & VAT:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="subtitle1">
                            <strong>Discount:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="subtitle1">
                            <strong>Other Charges:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="subtitle1">
                            <strong>Service fee:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="subtitle1">
                            <strong>Count:</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="subtitle1">
                            <strong>Sub Total:</strong>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={1}>
                          <Typography variant="body2">
                            Adult {passenger.AdultQuantity}
                            {passenger.ChildQuantity > 0 && (
                              <div>Child {passenger.ChildQuantity}</div>
                            )}
                            {passenger.InfantsQuantity > 0 && (
                              <div>Infants {passenger.InfantsQuantity}</div>
                            )}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="body2">{basefare}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="body2">{tax}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="body2">0</Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="body2">0</Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="body2">
                            {otherCharges}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="body2">{serviceFee}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="body2">
                            {passengerCount}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography variant="body2">
                            {calculateSubtotal()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Box>
          )}

          {activeTab === "2" && (
            <>
              {/* Content for Baggage Tab */}
              {segments.map((seg, index) => (
                <div key={index}>
                  <FlightInfoItem
                    label={`Baggage Details - Segment ${index + 1}`}
                    value={`Cabin: ${
                      seg?.baggageDetails?.[0]?.Cabin || "N/A"
                    }, Checkin: ${seg?.baggageDetails?.[0]?.Checkin || "N/A"}`}
                  />
                </div>
              ))}
            </>
          )}

          {activeTab === "3" && (
            <Box
              sx={{
                flex: "1 0 40%",
                height: "40%",
                justifyContent: "center",
                alignContent: "center",
                padding: "16px",
              }}
            >
              {isLoadingCancellation ? (
                <CircularProgress />
              ) : (
                <Box
                  sx={{
                    height: "auto",
                    width: "auto",
                    backgroundColor: "white",
                    marginTop: "5px",
                    borderRadius: "5px",
                    padding: "16px",
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    {cancellationInfo ? (
                      <div>
                        <strong>{cancellationInfo.RuleType}:</strong>{" "}
                        {cancellationInfo.RuleDetails}
                      </div>
                    ) : (
                      "No data available"
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {activeTab === "4" && (
            <Box
              sx={{
                flex: "1 0 40%",
                height: "40%",
                justifyContent: "center",
                alignContent: "center",
                padding: "16px",
              }}
            >
              {isLoadingCancellation ? (
                <CircularProgress />
              ) : (
                <Box
                  sx={{
                    height: "auto",
                    width: "auto",
                    backgroundColor: "white",
                    marginTop: "5px",
                    borderRadius: "5px",
                    padding: "16px",
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    {cancellationInfo ? (
                      <div>
                        <strong>{cancellationInfo.RuleType}:</strong>{" "}
                        {cancellationInfo.RuleDetails}
                      </div>
                    ) : (
                      "No data available"
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {activeTab === "5" && (
            <Box
              sx={{
                flex: "1 0 40%",
                height: "40%",
                justifyContent: "center",
                alignContent: "center",
                padding: "16px",
              }}
            >
              {isLoadingCancellation ? (
                <CircularProgress />
              ) : (
                <Box
                  sx={{
                    height: "auto",
                    width: "auto",
                    backgroundColor: "white",
                    marginTop: "5px",
                    borderRadius: "5px",
                    padding: "16px",
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    {cancellationInfo ? (
                      <div>
                        <strong>{cancellationInfo.RuleType}:</strong>{" "}
                        {cancellationInfo.RuleDetails}
                      </div>
                    ) : (
                      "No data available"
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {/* Add other TabPanels for additional tabs */}
        </TabPanel>
      </Paper>
    );
  }
);

export default TabComponent;
