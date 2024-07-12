import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";

const ArrivalInfo = ({ isLoading, segment, isMobile }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "baseline",
      }}
    >
      <Typography fontSize="3rem" fontWeight="bold">
        {isLoading ? (
          <Skeleton width={80} />
        ) : segment.Destination ? (
          new Date(segment.Destination.ArrTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        ) : (
          "N/A"
        )}
      </Typography>
      {isLoading ? (
        <Skeleton variant="text" width={100} height={20} />
      ) : (
        <Typography
          variant={isMobile ? "body2" : "h6"}
          style={{ fontSize: "1rem", fontWeight: "bold" }}
        >
          {segment.Destination
            ? new Date(segment.Destination.ArrTime).toLocaleDateString(
                "en-US",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )
            : ""}
        </Typography>
      )}
      {isLoading ? (
        <Skeleton variant="text" width={100} height={20} />
      ) : (
        <Typography
          variant={isMobile ? "body2" : "h6"}
          style={{
            fontSize: "0.875rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            maxWidth: "100%",
            display: "block",
            marginTop: "-5px",
          }}
        >
          {segment.Destination
            ? segment.Destination.Airport.AirportName
            : "Unknown Airport"}
        </Typography>
      )}
    </Box>
  );
};

export default ArrivalInfo;
