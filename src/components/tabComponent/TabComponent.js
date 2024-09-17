import React, { useState, useCallback, useEffect } from "react";
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
  useMediaQuery,
  useTheme,
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
    const segments =
      flightDataf?.offer?.paxSegmentList?.map((item) => item.paxSegment) || [];
    const segment = segments[0]; // Display the first segment as an example
    const fares = flightDataf?.offer?.fareDetailList || [];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const searchIDResultID = useSelector(selectSearchIDResultID);
    const basefare = fares[0]?.fareDetail?.baseFare || 0;
    const tax = fares[0]?.fareDetail?.tax || 0;
    const otherCharges = fares[0]?.fareDetail?.otherFee || 0;
    const serviceFee = 0; // Assuming no service fee available
    const passengerCount = fares[0]?.fareDetail?.paxCount || 1;
    const [cancellationInfo, setCancellationInfo] = useState(null);
    const [isLoadingCancellation, setIsLoadingCancellation] = useState(false);
    const { searchId, resultId } = searchIDResultID;
    const airPriceData = useSelector(selectAirPriceData);
    const dispatch = useDispatch();
    const passenger = useSelector(selectFlightSearchParams);

    const calculateSubtotal = () => {
      return fares.reduce((acc, fare) => {
        return (
          acc +
          (fare.fareDetail.baseFare || 0) +
          (fare.fareDetail.otherFee || 0) +
          (fare.fareDetail.tax || 0)
        );
      }, 0);
    };

    const formatDuration = (duration) => {
      return duration ? `${duration} minutes` : "N/A";
    };

    const handleTabChangeWithApiCall = useCallback(
      async (event, newValue) => {
        handleTabChange(event, newValue);
        if (newValue === "3") {
          setIsLoadingCancellation(true);
          try {
            await dispatch(
              fetchAirPrice({
                SearchID: flightDataf.offer.offerId,
                ResultID: flightDataf.offer.offerId,
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
      [dispatch, airPriceData, handleTabChange, flightDataf]
    );

    return (
      <Paper>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) =>
            handleTabChangeWithApiCall(event, newValue)
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
                          {segment?.marketingCarrierInfo?.carrierName || "N/A"}
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
                          {segment?.flightNumber || "N/A"}
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
                          {segment?.departure?.iatA_LocationCode || "N/A"}
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
                          {segment?.arrival?.iatA_LocationCode || "N/A"}
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
                          {formatDuration(segment?.duration)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box display="flex" alignItems="center">
                        <PlaceIcon color="primary" sx={{ marginRight: 1 }} />
                        <Typography variant="subtitle1" gutterBottom>
                          <strong>Aircraft:</strong>{" "}
                          {segment?.iatA_AircraftType?.iatA_AircraftTypeCode ||
                            "N/A"}
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
                    {/* Render fare details for mobile view */}
                    {/* Similar to existing code, map through details */}
                  </Grid>
                ) : (
                  <Grid container spacing={2} alignItems="center">
                    {/* Render fare details for desktop view */}
                    {/* Similar to existing code, map through details */}
                  </Grid>
                )}
              </Box>
            </Box>
          )}

          {/* Repeat similar updates for the other Tab Panels */}
        </TabPanel>
      </Paper>
    );
  }
);

export default TabComponent;
