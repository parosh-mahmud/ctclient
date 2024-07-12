import React from "react";
import { Box, Divider, Typography, Skeleton } from "@mui/material";
import {
  Flight as FlightIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";

const FlightDuration = ({ isLoading, isMobile, calculateDuration }) => {
  return (
    <Box
      style={{
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          <Skeleton width="100%" height={30} /> // Make Skeleton also responsive
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
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: "15px",
                  }}
                >
                  {calculateDuration()}
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
                marginTop: "-15px",
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
  );
};

export default FlightDuration;
