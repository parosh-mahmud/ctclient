import React, { useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
import { selectFlightSearchData } from "../../redux/reducers/flightSlice";
import useStyles, {
  swapIconStyle,
  boxStyle,
  paperStyle,
  typographyPadding,
} from "./styles";

const AirInput = ({
  isFirstChild,
  journeyType,
  onAddCity,
  onRemoveCity,
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
  const styles = useStyles();
  const flightdata = useSelector(selectFlightSearchData);
  console.log(flightdata);
  useEffect(() => {
    if (searchParams.DepartureDateTime) {
      const parsedDate = dayjs(searchParams.DepartureDateTime);
      handleDepartureDateChange(parsedDate);
    }
  }, [searchParams]);

  return (
    <Grid container spacing={1} style={{ paddingBottom: "60px", width: "99%" }}>
      <Grid item sm={12} xs={12} lg={6} md={6} direction="row">
        <Box style={{ ...paperStyle, position: "relative" }}>
          <Box
            onClick={(event) => handlePopoverClick(event, "from")}
            style={{
              ...boxStyle,
              borderRight: "1px solid #E5E7EB",
              borderRadius: "10px 0 0 10px",
              width: "calc(50% - 20px)",
              textAlign: "left",
              paddingLeft: "10px",
            }}
          >
            <Typography
              sx={{
                ...typographyPadding,
                fontFamily: "Google Sans, sans-serif",
                color: "#6C757D",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              From
            </Typography>
            <Typography
              style={{
                ...typographyPadding,
                fontWeight: "bold",
                fontSize: "1.25rem",
                fontFamily: "Google Sans, sans-serif",
                color: "#343A40",
                textAlign: "left",
              }}
            >
              {selectedFromAirport
                ? selectedFromAirport.city
                : "Select an Airport"}
            </Typography>
            <Typography
              style={{
                ...typographyPadding,
                fontSize: "13px",
                fontFamily: "Google Sans, sans-serif",
                color: "#6C757D",
                whiteSpace: "nowrap",
                textAlign: "left",
              }}
            >
              {selectedFromAirport
                ? selectedFromAirport.name
                : "Select an Airport"}
            </Typography>
          </Box>

          <Box onClick={handleSwapAirports} style={swapIconStyle}>
            <SwapHorizIcon style={{ fontSize: "24px", color: "#FF0000" }} />
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
            onClick={(event) => handlePopoverClick(event, "to")}
            style={{
              ...boxStyle,
              borderRadius: "0 10px 10px 0",
              width: "calc(50% - 20px)",
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                ...typographyPadding,
                fontFamily: "Google Sans, sans-serif",
                color: "#6C757D",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              To
            </Typography>
            <Typography
              style={{
                ...typographyPadding,
                fontWeight: "bold",
                fontSize: "1.25rem",
                fontFamily: "Google Sans, sans-serif",
                color: "#343A40",
                textAlign: "left",
              }}
            >
              {selectedToAirport ? selectedToAirport.city : "Select an Airport"}
            </Typography>
            <Typography
              style={{
                ...typographyPadding,
                fontSize: "13px",
                fontFamily: "Google Sans, sans-serif",
                color: "#6C757D",
                whiteSpace: "nowrap",
                textAlign: "left",
              }}
            >
              {selectedToAirport ? selectedToAirport.name : "Select an Airport"}
            </Typography>
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

      <Grid item sm={12} xs={12} lg={6} md={6}>
        <Box style={{ ...paperStyle, position: "relative" }}>
          <Box
            id="travelDateTrigger"
            ref={travelDateRef}
            onClick={handleDPopoverClick}
            style={{
              ...boxStyle,
              borderRight: "1px solid #E5E7EB",
              borderRadius: "10px 0 0 10px",
              width: "calc(33.33% - 20px)",
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Google Sans, sans-serif",
                color: "#6C757D",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              Travel Date
            </Typography>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "1.25rem",
                fontFamily: "Google Sans, sans-serif",
                color: "#343A40",
                textAlign: "left",
              }}
            >
              {selectedDate.format("DD MMM YY")}
            </Typography>
            <Typography
              style={{
                fontSize: "13px",
                fontFamily: "Google Sans, sans-serif",
                color: "#6C757D",
                textAlign: "left",
              }}
            >
              {dayOfWeek}
            </Typography>
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
              ...boxStyle,
              borderRight: "1px solid #E5E7EB",
              width: "calc(33.33% - 20px)",
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Google Sans, sans-serif",
                color: "#6C757D",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              Return Date
            </Typography>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "1.25rem",
                fontFamily: "Google Sans, sans-serif",
                color: "#343A40",
                textAlign: "left",
              }}
            >
              {returnDate ? returnDate.format("DD MMM YY") : "Tap to add"}
            </Typography>
            <Typography
              style={{
                fontSize: "13px",
                fontFamily: "Google Sans, sans-serif",
                color: "#6C757D",
                textAlign: "left",
              }}
            >
              {returnDate ? returnDate.format("dddd") : ""}
            </Typography>
          </Box>

          <ReturnDatePopover
            returnAnchorEl={returnAnchorEl}
            handleRPopoverClose={handleRPopoverClose}
            returnDate={returnDate}
            handleReturnDateChange={handleReturnDateChange}
            classes={classes}
          />

          <Box
            onClick={openModal}
            style={{
              ...boxStyle,
              borderRadius: "0 10px 10px 0",
              width: "calc(33.33% - 20px)",
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Google Sans, sans-serif",
                color: "#6C757D",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              Traveller & Class
            </Typography>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "1.25rem",
                fontFamily: "Google Sans, sans-serif",
                color: "#343A40",
                textAlign: "left",
              }}
            >
              {`${adults + children + infants} Person${
                adults + children + infants > 1 ? "s" : ""
              }`}
            </Typography>
            <Typography
              style={{
                fontSize: "13px",
                fontFamily: "Google Sans, sans-serif",
                color: "#6C757D",
                textAlign: "left",
              }}
            >
              {selectedClass}
            </Typography>
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
