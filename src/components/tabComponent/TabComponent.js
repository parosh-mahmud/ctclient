import React from "react";
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { FlightInfoItem } from "../FlightResults/FlightCard";
import { TabPanel } from "@mui/lab";
import FlightCard from "../FlightResults/FlightCard";
import { useSelector } from "react-redux";
import { selectFlightSearchData } from "../../redux/reducers/flightSlice";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import PlaceIcon from "@mui/icons-material/Place";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
const TabComponent = ({ activeTab, handleTabChange }) => {
  // Use useSelector to directly access the flight data from the Redux store
  const flightData = useSelector(selectFlightSearchData);

  // Ensure flightData is not undefined or null before accessing properties
  const segments = flightData?.Results?.[0]?.segments || [];
  const segment = segments[0]; // Assuming you want to display the first segment

  // Helper function to format duration
  const formatDuration = (duration) => {
    return duration ? `${duration} minutes` : "N/A";
  };
  return (
    <Paper>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
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
        <Tab label="Baggage" value="2" /> {/* Add new tab for Baggage */}
        <Tab label="Cancellation" value="3" />
        <Tab label="Date Change" value="4" />
        <Tab label="Fare Rules" value="5" />
        <Tab label="Class" value="6" />
        {/* Add other tabs as needed */}
      </Tabs>

      <TabPanel value={activeTab} index="0">
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
                        {segment.Airline?.OperatingCarrier || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center">
                      <EventSeatIcon color="primary" sx={{ marginRight: 1 }} />
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>Flight Number:</strong>{" "}
                        {segment.Airline?.FlightNumber || "N/A"}
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
                        {segment.Origin?.Airport.AirportName || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="left">
                      <FlightLandIcon color="primary" sx={{ marginRight: 1 }} />
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>Destination Airport:</strong>{" "}
                        {segment.Destination?.Airport.AirportName || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center">
                      <AccessTimeIcon color="primary" sx={{ marginRight: 1 }} />
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>Journey Duration:</strong>{" "}
                        {formatDuration(segment.JourneyDuration)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center">
                      <PlaceIcon color="primary" sx={{ marginRight: 1 }} />
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>Aircraft:</strong> {segment.Equipment || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </CardContent>
          </Card>
        )}

        {activeTab === "1" && (
          <>
            {/* Content for Fare Summary Tab */}
            {/* Here, you are rendering the FlightCard component */}
            {/* <FlightCard flightData={segments} /> */}
          </>
        )}

        {activeTab === "2" && (
          <>
            {/* Content for Baggage Tab */}
            {segments.map((seg, index) => (
              <div key={index}>
                <FlightInfoItem
                  label={`Baggage Details - Segment ${index + 1}`}
                  value={`Cabin: ${seg.baggageDetails[0]?.Cabin}, Checkin: ${seg.baggageDetails[0]?.Checkin}`}
                />
              </div>
            ))}
          </>
        )}

        {/* Add other TabPanels for additional tabs */}
      </TabPanel>
    </Paper>
  );
};

export default TabComponent;
