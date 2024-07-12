import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FromAirportPopover from "./FromAirportPopover";
import ToAirportPopover from "./ToAirportPopover";
import TravelDatePopover from "./TravelDatePopover";
import ReturnDatePopover from "./ReturnDatePopover";
import TravelerClassPopover from "./TravelerClassPopover";
import { selectFlightSearchParams } from "../../redux/reducers/flightSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import useStyles from "./styles";

const AirInput = ({
  isFirstChild,
  canRemove,
  journeyType,
  onAddCity,
  onRemoveCity,
  paperStyle,
  selectedFromAirport,
  selectedToAirport,
  handlePopoverClick,
  fromAnchorEl,
  toAnchorEl,
  handlePopoverClose,
  handleSearchQueryChange,
  searchQuery,
  searchedAirports,
  handleFromAirportSelect,
  handleToAirportSelect,
  handleDPopoverClick,
  dAnchorEl,
  handleDPopoverClose,
  selectedDate,
  handleSwapAirports,
  dayOfWeek,
  handleDepartureDateChange,
  handleRPopoverClick,
  returnAnchorEl,
  handleRPopoverClose,
  returnDate,
  handleReturnDateChange,
  openModal,
  isModalOpen,
  closeModal,
  adults,
  children,
  infants,
  selectedClass,
  handleClassChange,
  classes,
  travelerCount,
  isTravelDatePopoverOpen,
  isReturnDatePopoverOpen,
}) => {
  const travelDateRef = useRef(null);
  const searchParams = useSelector(selectFlightSearchParams);
  console.log(searchParams.AdultQuantity);
  console.log(searchParams);
  const styles = useStyles();
  // Effect to update selectedDate from searchParams
  useEffect(() => {
    if (searchParams.DepartureDateTime) {
      const parsedDate = dayjs(searchParams.DepartureDateTime);
      handleDepartureDateChange(parsedDate);
    }
  }, [searchParams]);

  return (
    <Grid container spacing={1} style={{ paddingBottom: "60px", width: "99%" }}>
      <Grid item sm={12} xs={12} lg={6} md={6} direction="row">
        <Box style={paperStyle}>
          <Box
            onClick={(event) => handlePopoverClick(event, "from")}
            style={{
              border: "1px solid #0067FF",
              width: "calc(50% - 20px)",
              height: "96px",
              cursor: "pointer",
              overflow: "hidden",
              borderRadius: "5px",
            }}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{ marginLeft: "10px" }}
            >
              <Typography style={{ fontSize: "1em", display: "flex" }}>
                {/* <FlightTakeoffIcon style={{ color: "#0067FF" }} /> */}
                <Typography
                  sx={{
                    fontFamily: "Google Sans, sans-serif",
                    // marginLeft: "10px",
                  }}
                >
                  From
                </Typography>
              </Typography>
              <Typography
                textAlign="left"
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  fontFamily: "Google Sans, sans-serif",
                  textAlign: "left",
                  color: "#212F3C",
                }}
              >
                {selectedFromAirport
                  ? `${selectedFromAirport.city} - ${selectedFromAirport.code}`
                  : "Select an Airport"}
              </Typography>
              <Typography
                textAlign="left"
                sx={{
                  fontSize: "13px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedFromAirport
                  ? selectedFromAirport.name
                  : "Select an Airport"}
              </Typography>
            </Stack>
          </Box>

          <Box
            onClick={handleSwapAirports}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              position: "relative",
              zIndex: 1,
              cursor: "pointer",
            }}
          >
            <SwapHorizIcon
              style={{
                fontSize: "45px",
                color: "#212F3C",
              }}
            />
          </Box>

          <FromAirportPopover
            fromAnchorEl={fromAnchorEl}
            handlePopoverClose={handlePopoverClose}
            searchQuery={searchQuery}
            handleSearchQueryChange={handleSearchQueryChange}
            handleFromAirportSelect={handleFromAirportSelect}
            searchedAirports={searchedAirports}
            classes={classes}
          />

          <Box
            id="toAirportTrigger"
            onClick={(event) => handlePopoverClick(event, "to")}
            style={{
              border: "1px solid #0067FF",
              width: "calc(50% - 20px)",
              height: "96px",
              cursor: "pointer",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="baseline"
              style={{ marginLeft: "10px" }}
            >
              <Typography style={{ fontSize: "1em", display: "flex" }}>
                {/* <FlightLandIcon style={{ color: "#0067FF" }} /> */}
                <Typography>To</Typography>
              </Typography>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#212F3C",
                }}
              >
                {selectedToAirport
                  ? `${selectedToAirport.city} - ${selectedToAirport.code}`
                  : "Select an Airport"}
              </Typography>
              <Typography
                textAlign="left"
                style={{ fontSize: "13px", whiteSpace: "nowrap" }}
              >
                {selectedToAirport
                  ? selectedToAirport.name
                  : "Select an Airport"}
              </Typography>
            </Stack>
          </Box>

          <ToAirportPopover
            toAnchorEl={toAnchorEl}
            handlePopoverClose={handlePopoverClose}
            searchQuery={searchQuery}
            handleSearchQueryChange={handleSearchQueryChange}
            handleToAirportSelect={handleToAirportSelect}
            searchedAirports={searchedAirports}
            classes={classes}
          />
        </Box>
      </Grid>

      <Grid item sm={12} xs={12} lg={4} md={4}>
        <Box style={paperStyle}>
          <Box
            id="travelDateTrigger"
            ref={travelDateRef}
            onClick={handleDPopoverClick}
            style={{
              borderRight: "none",
              border: "1px solid #0067FF",
              borderBottomLeftRadius: "5px",
              borderTopLeftRadius: "5px",
              width: "50%",
              height: "96px",
              float: "left",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Box
                marginLeft="10px"
                textAlign="left"
                alignItems="center"
                justifyContent="center"
                display="flex"
                flexDirection="row"
              >
                <Typography>Travel Date</Typography>
                {isTravelDatePopoverOpen ? (
                  <KeyboardArrowUpIcon style={{ fontSize: "30px" }} />
                ) : (
                  <KeyboardArrowDownIcon style={{ fontSize: "24px" }} />
                )}
              </Box>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography
                color="#212F3C"
                marginLeft="10px"
                textAlign="left"
                style={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                {selectedDate.format("DD MMM YY")}
              </Typography>
              <Typography fontSize="13px" marginLeft="10px" textAlign="left">
                {dayOfWeek}
              </Typography>
            </LocalizationProvider>
          </Box>

          <TravelDatePopover
            dAnchorEl={dAnchorEl}
            handleDPopoverClose={handleDPopoverClose}
            selectedDate={selectedDate}
            handleDepartureDateChange={handleDepartureDateChange}
            classes={classes}
          />

          <Box
            id="returnDateTrigger"
            onClick={(event) => handleRPopoverClick(event)}
            style={{
              width: "50%",
              height: "96px",
              float: "left",
              boxSizing: "border-box",
              border: "1px solid #0067FF",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
              borderLeft: "none",
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <Box style={{ display: "flex" }}>
              <Typography marginLeft="10px">Return</Typography>
              {isReturnDatePopoverOpen ? (
                <KeyboardArrowUpIcon style={{ fontSize: "30px" }} />
              ) : (
                <KeyboardArrowDownIcon style={{ fontSize: "24px" }} />
              )}
            </Box>
            {returnDate ? (
              <>
                <Typography
                  marginLeft="10px"
                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                >
                  {returnDate.format("DD MMM YY")}
                </Typography>
                <Typography marginLeft="10px">
                  {returnDate.format("dddd")}
                </Typography>
              </>
            ) : (
              <Typography
                marginLeft="10px"
                textAlign="left"
                style={{ fontSize: "13px" }}
              >
                Tap here to add return date
              </Typography>
            )}
          </Box>

          <ReturnDatePopover
            returnAnchorEl={returnAnchorEl}
            handleRPopoverClose={handleRPopoverClose}
            returnDate={returnDate}
            handleReturnDateChange={handleReturnDateChange}
            classes={classes}
          />
        </Box>
      </Grid>

      <Grid item sm={12} xs={12} lg={2} md={2}>
        <Box style={paperStyle}>
          <Box
            onClick={openModal}
            style={{
              width: "100%",
              height: "96px",
              cursor: "pointer",
              border: "1px solid #0067FF",
              borderRadius: "5px",
              boxSizing: "border-box",
              flexWrap: "wrap",
            }}
          >
            {(isFirstChild || journeyType !== "multicity") && (
              <Box sx={{ marginLeft: "10px" }}>
                <Typography textAlign="left">Traveller & Class</Typography>
                <Typography
                  color="#212F3C"
                  textAlign="left"
                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                >{`${adults + children + infants} Person${
                  adults + children + infants > 1 ? "s" : ""
                }`}</Typography>
                <Typography
                  color="#212F3C"
                  textAlign="left"
                  fontSize="13px"
                  style={{ fontStyle: "italic", fontWeight: "bold" }}
                >
                  {selectedClass}
                </Typography>
              </Box>
            )}

            {journeyType === "multicity" && !isFirstChild && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontFamily="Google Sans, sans-serif"
                  fontSize="50px"
                  size="small"
                  variant="outlined"
                  onClick={onAddCity}
                  style={{ flex: 1 }}
                >
                  +
                </Typography>
                <Typography
                  fontFamily="Google Sans, sans-serif"
                  fontSize="50px"
                  size="small"
                  variant="outlined"
                  onClick={onRemoveCity}
                  style={{ flex: 1 }}
                >
                  -
                </Typography>
              </Box>
            )}
          </Box>

          <TravelerClassPopover
            isModalOpen={isModalOpen}
            dAnchorEl={dAnchorEl}
            closeModal={closeModal}
            travelerCount={travelerCount}
            adults={adults}
            children={children}
            infants={infants}
            selectedClass={selectedClass}
            handleClassChange={handleClassChange}
            classes={classes}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AirInput;
