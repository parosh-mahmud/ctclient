import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";

const AirlineInfo = ({ isLoading, airlineLogoUrl, segment }) => {
  return (
    <Box sx={{ justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            paddingRight: "10px",
            marginTop: "-25px",
          }}
        >
          {isLoading ? (
            <Skeleton variant="circular" width={90} height={90} />
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "baseline",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography fontWeight="bold">
              {isLoading ? (
                <Skeleton width={30} />
              ) : segment.Airline ? (
                segment.Airline.AirlineCode
              ) : (
                "N/A"
              )}
            </Typography>
            <Typography fontWeight="bold">
              {isLoading ? (
                <Skeleton width={30} />
              ) : segment.Airline ? (
                segment.Airline.FlightNumber
              ) : (
                "N/A"
              )}
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight="bold">
              {isLoading ? (
                <Skeleton width={30} />
              ) : segment.Equipment ? (
                `${segment.Equipment}`
              ) : (
                "N/A"
              )}
            </Typography>
          </Box>
          <Box></Box>
        </Box>
      </Box>
      <Box>
        <Typography color="#0067FF">
          {isLoading ? (
            <Skeleton width={50} />
          ) : segment.Airline ? (
            segment.Airline.AirlineName
          ) : (
            "N/A"
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default AirlineInfo;
