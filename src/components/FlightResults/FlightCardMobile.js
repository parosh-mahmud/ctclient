import React from "react";
import { Box, Button, Typography, Skeleton } from "@mui/material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FlightIcon from "@mui/icons-material/Flight";

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
  const stopsText =
    Number(segment.StopQuantity) === 0
      ? "Nonstop"
      : `${segment.StopQuantity} Stop${segment.StopQuantity > 1 ? "s" : ""}`;

  return (
    <Box sx={{ boxShadow: 4, padding: 1 }} className={classes.container}>
      {flightData.segments.map((segment, index) => (
        <Box key={index}>
          <Box className={classes.firstRow}>
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
                <Skeleton width={70} height={20} />
              ) : (
                <Typography sx={{ marginLeft: "5px" }} variant="body2">
                  {flightData?.segments?.[0]?.Airline?.AirlineName || "N/A"}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: "2px",
                  }}
                >
                  {isLoading ? (
                    <Skeleton width={70} height={20} />
                  ) : (
                    <Typography
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        color: "green",
                        fontSize: "12px",
                      }}
                    >
                      {segment.Airline ? segment.Airline.AirlineCode : "N/A"}
                    </Typography>
                  )}

                  {isLoading ? (
                    <Skeleton width={70} height={20} />
                  ) : (
                    <Typography
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        color: "green",
                        fontSize: "12px",
                      }}
                    >
                      {segment.Airline ? segment.Airline.FlightNumber : "N/A"}
                    </Typography>
                  )}
                </Box>
                <Box>
                  {isLoading ? (
                    <Skeleton variant="text" width={70} height={20} />
                  ) : (
                    <Typography
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        color: "green",
                        fontSize: "12px",
                      }}
                    >
                      {segment.Equipment ? `${segment.Equipment}` : "N/A"}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={{ marginLeft: 1 }}>
                <Typography sx={{ color: "primary.main" }}>
                  <AirplanemodeActiveIcon />
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={classes.secondRow}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {isLoading ? (
                <Skeleton variant="rectangular" width="4px" height="210px" />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "210px",
                  }}
                >
                  <Typography sx={{ color: "primary.main" }}>
                    <FlightTakeoffIcon fontSize="8px" />
                  </Typography>
                  <Box
                    sx={{
                      height: "50%",
                      width: "2px",
                      backgroundColor: "primary.main",
                      mx: 2,
                    }}
                  />
                  <Typography sx={{ color: "primary.main" }}>
                    <FlightIcon
                      fontSize="8px"
                      sx={{ transform: "rotate(180deg)" }}
                    />
                  </Typography>
                  <Box
                    sx={{
                      height: "50%",
                      width: "2px",
                      backgroundColor: "primary.main",
                      mx: 2,
                    }}
                  />
                  <Typography sx={{ color: "primary.main" }}>
                    <FlightLandIcon fontSize="8px" />
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  height: "210px",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box display="flex" flexDirection="column">
                  {isLoading ? (
                    <Skeleton variant="text" width={70} height={20} />
                  ) : (
                    <Typography alignSelf="baseline">
                      {segment.Origin ? (
                        <>
                          <strong className={classes.cityName}>
                            {segment.Origin.Airport.CityName}
                          </strong>
                          {` (${segment.Origin.Airport.AirportCode})`}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                  )}

                  <Box marginLeft="10px" display="flex" flexDirection="column">
                    {isLoading ? (
                      <Skeleton variant="text" width={70} height={20} />
                    ) : (
                      <Typography
                        alignSelf="baseline"
                        fontSize="24px"
                        fontWeight="bold"
                      >
                        {segment.Origin
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
                    )}

                    {isLoading ? (
                      <Skeleton variant="text" width={70} height={20} />
                    ) : (
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
                    )}
                  </Box>
                </Box>

                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="baseline"
                  marginLeft="10px"
                  gap="70px"
                >
                  {isLoading ? (
                    <Skeleton variant="text" width={70} height={20} />
                  ) : (
                    <Typography fontSize="12px" alignSelf="baseline">
                      {calculateDuration([segment])}
                    </Typography>
                  )}
                  {isLoading ? (
                    <Skeleton variant="text" width={70} height={20} />
                  ) : (
                    <Typography fontSize="12px" alignSelf="baseline">
                      {stopsText}
                    </Typography>
                  )}
                </Box>

                <Box display="flex" flexDirection="column">
                  <Box marginLeft="10px" display="flex" flexDirection="column">
                    {isLoading ? (
                      <Skeleton variant="text" width={70} height={20} />
                    ) : (
                      <Typography alignSelf="baseline" fontSize="12px">
                        {segment.Destination
                          ? new Date(
                              segment.Destination.ArrTime
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              weekday: "long",
                            })
                          : "N/A"}
                      </Typography>
                    )}

                    {isLoading ? (
                      <Skeleton variant="text" width={70} height={20} />
                    ) : (
                      <Typography
                        alignSelf="baseline"
                        fontSize="24px"
                        fontWeight="bold"
                      >
                        {segment.Destination
                          ? new Date(
                              segment.Destination.ArrTime
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                          : "N/A"}
                      </Typography>
                    )}
                  </Box>

                  {isLoading ? (
                    <Skeleton variant="text" width={70} height={20} />
                  ) : (
                    <Typography alignSelf="baseline">
                      {segment.Destination ? (
                        <>
                          <strong className={classes.cityName}>
                            {segment.Destination.Airport.CityName}
                          </strong>
                          {` (${segment.Destination.Airport.AirportCode})`}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          {index < flightData.segments.length - 1 && (
            <Box className={classes.stopDetails}>
              <Typography sx={{ fontSize: "14px", color: "gray" }}>
                {stopsText}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "gray" }}>
                Layover in {segment.Destination.Airport.CityName}
              </Typography>
            </Box>
          )}
        </Box>
      ))}

      <Box className={classes.thirdRow}>
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
            sx={{ backgroundColor: "primary.main" }}
          >
            <span
              style={{ textTransform: "capitalize" }}
              className={classes.buttonText}
            >
              Select
            </span>
          </Button>
        )}
      </Box>
      {showActions && (
        <Box className={classes.fourthRow}>
          <Button
            fullWidth
            className={classes.fullButton}
            variant="outlined"
            endIcon={
              showDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            onClick={handleViewDetails}
          >
            <span
              style={{ textTransform: "capitalize" }}
              className={classes.buttonText}
            >
              View Details
            </span>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FlightCardMobile;
