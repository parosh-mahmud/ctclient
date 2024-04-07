import React from "react";
import { Box, Button, Typography, Skeleton, Divider } from "@mui/material";
import { FaPlaneArrival } from "react-icons/fa";
import FlightIcon from "@mui/icons-material/Flight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import { FlightInfoItem } from "./FlightCard";
const FlightCardMobile = ({
  flightData,
  isLoading,
  onSelect,
  calculateTotalAmount,
  calculateDuration,
  handleSelect,
  showDetails,
  handleViewDetails,
  airlineLogoUrl,
  isMobile,
  segment,
  classes,
  showActions,
}) => {
  return (
    // Mobile layout
    <Box className={classes.container}>
      <Box className={classes.firstRow}>
        {/* Airline logo and name */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <Skeleton variant="circle" width={40} height={40} />
          ) : (
            airlineLogoUrl && (
              <img
                src={airlineLogoUrl}
                alt="Airline Logo"
                style={{ width: 60, height: 60 }}
              />
            )
          )}
          {isLoading ? (
            <Skeleton width={90} height={30} />
          ) : (
            <Typography sx={{ marginLeft: "5px" }} variant="body2">
              {flightData?.segments?.[0]?.Airline?.AirlineName || "N/A"}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {isLoading ? (
                <Skeleton width={90} height={30} />
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    color: "green",
                  }}
                >
                  <FlightInfoItem
                    isLoading={isLoading}
                    isMobile={isMobile}
                    value={
                      segment.Airline ? segment.Airline.AirlineCode : "N/A"
                    }
                  />
                </Typography>
              )}

              {isLoading ? (
                <Skeleton width={90} height={30} />
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    color: "green",
                  }}
                >
                  <FlightInfoItem
                    isLoading={isLoading}
                    isMobile={isMobile}
                    value={
                      segment.Airline ? segment.Airline.FlightNumber : "N/A"
                    }
                  />
                </Typography>
              )}
            </Box>

            <Typography
              sx={{ display: "flex", flexDirection: "row", color: "green" }}
            >
              Boeing{" "}
              <FlightInfoItem
                isMobile={isMobile}
                isLoading={isLoading}
                value={segment.Equipment ? `${segment.Equipment}` : "N/A"}
              />{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.secondRow}>
        {/* Time and city code */}

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              height: "210px",
            }}
          >
            {/* Ensure elements are in a row */}
            <Typography>
              <FlightTakeoffIcon />
            </Typography>
            {/* Vertical Divider */}
            <Box
              sx={{
                height: "50%", // Adjust as needed
                width: "2px", // Control the thickness of your divider here
                backgroundColor: "primary.main",
                mx: 2, // Margin for visual spacing on either side
              }}
            />
            <Typography>
              <FlightIcon sx={{ transform: "rotate(180deg)" }} />
            </Typography>
            <Box
              sx={{
                height: "50%", // Adjust as needed
                width: "2px", // Control the thickness of your divider here
                backgroundColor: "primary.main",
                mx: 2, // Margin for visual spacing on either side
              }}
            />
            <Typography>
              <FlightLandIcon />
            </Typography>
          </Box>

          {/* context box */}
          <Box
            sx={{
              display: "flex",
              height: "210px", // Adjust as needed
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" flexDirection="column">
              <Typography alignSelf="baseline">
                {segment.Origin ? (
                  <>
                    <strong>{segment.Origin.Airport.CityName}</strong>
                    {` (${segment.Origin.Airport.CityCode})`}
                  </>
                ) : (
                  "N/A"
                )}
              </Typography>

              <Box marginLeft="10px" display="flex" flexDirection="column">
                <Typography
                  alignSelf="baseline"
                  fontSize="24px"
                  fontWeight="bold"
                >
                  {segment.Destination
                    ? new Date(segment.Origin.DepTime).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )
                    : "N/A"}
                </Typography>

                <Typography alignSelf="baseline" fontSize="12px">
                  {segment.Origin
                    ? new Date(segment.Origin.DepTime).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          weekday: "long",
                        }
                      )
                    : "N/A"}
                </Typography>
              </Box>
            </Box>

            <Typography alignSelf="baseline">{calculateDuration()}</Typography>

            <Box display="flex" flexDirection="column">
              <Box marginLeft="10px" display="flex" flexDirection="column">
                <Typography alignSelf="baseline" fontSize="12px">
                  {segment.Destination
                    ? new Date(segment.Destination.ArrTime).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          weekday: "long",
                        }
                      )
                    : "N/A"}
                </Typography>

                <Typography
                  alignSelf="baseline"
                  fontSize="24px"
                  fontWeight="bold"
                >
                  {segment.Destination
                    ? new Date(segment.Destination.ArrTime).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true, // Adjusted to use 12-hour format
                        }
                      )
                    : "N/A"}
                </Typography>
              </Box>

              <Typography alignSelf="baseline">
                {segment.Destination ? (
                  <>
                    <strong>{segment.Destination.Airport.CityName}</strong>
                    {` (${segment.Destination.Airport.CityCode})`}
                  </>
                ) : (
                  "N/A"
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* second row end */}

      <Box className={classes.thirdRow}>
        {/* Select button with total price */}
        {isLoading ? (
          <Skeleton width={90} height={30} />
        ) : (
          <Typography fontWeight="bold" alignSelf="flex-end" fontSize="18px">
            BDT{" "}
            {new Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
            }).format(calculateTotalAmount())}
          </Typography>
        )}
        {showActions && (
          <Button
            onClick={handleSelect}
            className={classes.fullButton}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
          >
            <span className={classes.buttonText}>Select</span>
          </Button>
        )}
      </Box>
      {showActions && (
        <Box className={classes.fourthRow}>
          {/* View details button */}
          <Button
            fullWidth
            className={classes.fullButton}
            variant="outlined"
            endIcon={
              showDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            onClick={handleViewDetails}
          >
            <span className={classes.buttonText}>View Details</span>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FlightCardMobile;
