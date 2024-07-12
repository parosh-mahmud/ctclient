import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";

const DepartureInfo = ({ isLoading, segment, isMobile }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: "1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "end",
        }}
      >
        <Typography fontSize="3rem" fontWeight="bold">
          {isLoading ? (
            <Skeleton width={80} />
          ) : segment.Origin ? (
            new Date(segment.Origin.DepTime).toLocaleTimeString("en-US", {
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
            {segment.Origin
              ? new Date(segment.Origin.DepTime).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
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
            {segment.Origin
              ? segment.Origin.Airport.AirportName
              : "Unknown Airport"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DepartureInfo;
