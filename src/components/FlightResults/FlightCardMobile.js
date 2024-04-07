import React from "react";
import { Box, Button, Typography, Skeleton } from "@mui/material";
import { FaPlaneArrival } from "react-icons/fa";
import FlightIcon from "@mui/icons-material/Flight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            {/* time */}
            <Typography variant={isMobile ? "body2" : "h6"}>
              {" "}
              <FlightInfoItem
                isMobile={isMobile}
                isLoading={isLoading}
                valueStyle={{ fontWeight: "bold", fontSize: "2rem" }}
                value={
                  segment.Destination
                    ? new Date(segment.Origin.DepTime).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )
                    : "N/A"
                }
                icon={
                  <FaPlaneArrival
                    style={{ fontSize: isMobile ? "1.5rem" : "2rem" }}
                  />
                }
              />
            </Typography>
          </Box>
          <Box>
            {isLoading ? (
              <Skeleton width={90} height={30} />
            ) : (
              <Typography variant="body2">
                {flightData?.segments?.[0]?.Origin?.Airport?.CityCode}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {isLoading ? (
            <Skeleton width={90} height={30} />
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FlightIcon
                  style={{
                    fontSize: isMobile ? "1rem" : "1.5rem",
                    transform: "rotate(90deg)",
                  }}
                />
                <MoreHorizIcon
                  style={{ fontSize: isMobile ? "1rem" : "1.5rem" }}
                />
                <MoreHorizIcon
                  style={{
                    fontSize: isMobile ? "1rem" : "1.5rem",
                    marginLeft: "-5px",
                  }}
                />
                <CircleIcon
                  style={{ fontSize: isMobile ? "1rem" : "1.5rem" }}
                />
              </Box>

              <Box>
                {/* duration */}

                <FlightInfoItem
                  isLoading={isLoading}
                  isMobile={isMobile}
                  value={calculateDuration()}
                  icon={<FaPlaneArrival />}
                />
              </Box>
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            {/* time */}
            <Typography
              style={{ fontSize: "18px" }}
              variant={isMobile ? "body2" : "h6"}
            >
              {" "}
              <FlightInfoItem
                isMobile={isMobile}
                isLoading={isLoading}
                valueStyle={{ fontWeight: "bold", fontSize: "2rem" }}
                value={
                  segment.Destination
                    ? new Date(segment.Destination.ArrTime).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )
                    : "N/A"
                }
                icon={<FaPlaneArrival />}
              />
            </Typography>
          </Box>
          <Box>
            {isLoading ? (
              <Skeleton width={90} height={30} />
            ) : (
              <Typography variant="body2">
                {flightData?.segments?.[0]?.Destination?.Airport?.CityCode}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      {/* second row end */}

      <Box className={classes.thirdRow}>
        {/* Select button with total price */}
        {isLoading ? (
          <Skeleton width={90} height={30} />
        ) : (
          <Typography alignSelf="flex-end" fontSize="18px">
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
