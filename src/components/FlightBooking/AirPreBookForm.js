import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAirPriceData } from "../../redux/slices/airPriceSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import FlightCard from "../FlightResults/FlightCard";
import PassengerDetailsForm from "../ReservationForm/PassengerDetailsForm";
import AirPriceShow from "./AirPriceShow";
import LayoutPage from "../../pages/LayoutPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
console.log(AirPriceShow);
const AirPreBookForm = () => {
  const airPriceData = useSelector(selectAirPriceData);

  const flightData = airPriceData?.Results?.[0];
  const segment = flightData?.segments?.[0];
  const segmentReturn = flightData?.segments?.[1];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log("flightData:", flightData);

  return (
    <LayoutPage>
      <Grid
        container
        justifyContent="center"
        alignItems="flex-start"
        style={{ marginTop: "30px", padding: "20px" }}
        spacing={4}
      >
        {/* Main content area (first and second column stacked) */}
        <Grid item xs={12} md={8} container direction="column" spacing={2}>
          {/* First column */}
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Flight Summary</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12}>
                {segment && (
                  <FlightCard
                    flightData={{ segments: [segment] }}
                    showActions={false}
                  />
                )}
                {segmentReturn && (
                  <>
                    <hr />
                    <FlightCard
                      flightData={{ segments: [segmentReturn] }}
                      showActions={false}
                    />
                  </>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Second column */}
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>Traveler Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12}>
                <PassengerDetailsForm />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Additional content to the right */}
        <Grid item xs={12} md={4}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography>Price Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AirPriceShow />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </LayoutPage>
  );
};

export default AirPreBookForm;
