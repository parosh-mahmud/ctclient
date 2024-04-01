// AirInput.js
import React, { useRef, useState } from "react";
import {
  Box,
  Grid,
  Popover,
  Stack,
  Typography,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const airports = [
  {
    code: "DAC",
    city: "Dhaka",
    country: "Bangladesh",
    name: "Hazrat Shahjalal International Airport",
  },
  {
    code: "JSR",
    city: "Jashore",
    country: "Bangladesh",
    name: "Jashore Airport",
  },
  {
    code: "CXB",
    city: "Coxs Bazar",
    country: "Bangladesh",
    name: "Coxs Bazar Airport",
  },
  {
    code: "CGP",
    city: "Chittagong",
    country: "Bangladesh",
    name: "Shah Amanat International Airport",
  },
  {
    code: "SPD",
    city: "Saidpur",
    country: "Bangladesh",
    name: "Saidpur Airport",
  },
  // Add more airports as needed.
];

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

  return (
    <Grid container spacing={1} style={{ paddingBottom: "60px", width: "99%" }}>
      {/* item 1 */}
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
                <FlightTakeoffIcon style={{ color: "#0067FF" }} />
                <Typography
                  sx={{
                    fontFamily: "Google Sans, sans-serif",
                    marginLeft: "10px",
                  }}
                >
                  From
                </Typography>
              </Typography>
              <Typography
                textAlign="left"
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
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
                  whiteSpace: "nowrap", // Specify the font-family name defined in @font-face
                }}
              >
                {selectedFromAirport
                  ? selectedFromAirport.name
                  : "Select an Airport"}
              </Typography>
            </Stack>
          </Box>

          {/* <Divider orientation="vertical" flexItem  /> */}
          <Box
            onClick={handleSwapAirports}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px", // Adjust the width as needed
              height: "40px", // Adjust the height as needed
              position: "relative", // Optional, if you need to position it relative to something
              zIndex: 1,
              cursor: "pointer",
            }}
          >
            <SwapHorizIcon
              style={{
                fontSize: "45px",
                color: "#212F3C", // Adjust to your desired icon size
              }}
            />
          </Box>

          <Popover
            open={Boolean(fromAnchorEl)}
            anchorEl={fromAnchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transitionDuration={300}
            PaperProps={{
              style: {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            <div className={classes.popover}>
              <TextField
                type="text"
                placeholder="Type to search"
                variant="standard"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                className={classes.input}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />

              {/* Conditionally render airport lists */}
              {searchQuery === ""
                ? airports.map((airport, index) => (
                    <div
                      key={`${airport.code}-${index}`}
                      onClick={() => handleFromAirportSelect(airport)}
                      className={classes.airportItem}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            fontFamily="Google Sans, sans-serif"
                            fontWeight="bold"
                          >
                            {airport.city}, {airport.country}
                          </Typography>
                          <Typography fontSize="15px">
                            {airport.name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography fontWeight="bold">
                            {airport.code}
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  ))
                : searchedAirports.map((airport, index) => (
                    <div
                      key={`${airport.code}-${index}`}
                      onClick={() => handleFromAirportSelect(airport)}
                      className={classes.airportItem}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography fontWeight="bold">
                            {airport.city}, {airport.country}
                          </Typography>
                          <Typography fontSize="15px">
                            {airport.name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography fontWeight="bold">
                            {airport.code}
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  ))}
            </div>
          </Popover>

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
                <FlightLandIcon style={{ color: "#0067FF" }} />
                <Typography marginLeft="10px">To</Typography>
              </Typography>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "23px",
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
          <Popover
            open={Boolean(toAnchorEl)}
            anchorEl={toAnchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transitionDuration={300}
            PaperProps={{
              style: {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            <div className={classes.popover}>
              <TextField
                type="text"
                placeholder="Type to search"
                variant="standard"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                className={classes.input}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />

              {/* Conditionally render airport lists */}
              {searchQuery === ""
                ? airports.map((airport, index) => (
                    <div
                      key={`${airport.code}-${index}`}
                      onClick={() => handleToAirportSelect(airport)}
                      className={classes.airportItem}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            fontFamily="Google Sans, sans-serif"
                            fontWeight="bold"
                          >
                            {airport.city}, {airport.country}
                          </Typography>
                          <Typography
                            fontFamily="Google Sans, sans-serif"
                            fontSize="15px"
                          >
                            {airport.name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            fontFamily="Google Sans, sans-serif"
                            fontWeight="bold"
                          >
                            {airport.code}
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  ))
                : searchedAirports.map((airport, index) => (
                    <div
                      key={`${airport.code}-${index}`}
                      onClick={() => handleToAirportSelect(airport)}
                      className={classes.airportItem}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            fontFamily="Google Sans, sans-serif"
                            fontWeight="bold"
                          >
                            {airport.city}, {airport.country}
                          </Typography>
                          <Typography
                            fontFamily="Google Sans, sans-serif"
                            fontSize="15px"
                          >
                            {airport.name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            fontFamily="Google Sans, sans-serif"
                            fontWeight="bold"
                          >
                            {airport.code}
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  ))}
            </div>
          </Popover>
        </Box>
      </Grid>

      {/* travel date  */}

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
              {/* <CalendarMonthIcon
                style={{ color: "#0067FF", marginLeft: "10px" }}
              /> */}
              <Box
                marginLeft="10px"
                textAlign="left"
                alignItems="center"
                justifyContent="center"
                display="flex"
                flexDirection="row"
              >
                <Typography marginLeft="10px">Travel Date</Typography>
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
                style={{ fontSize: "22px", fontWeight: "bold" }}
              >
                {selectedDate.format("DD MMM YY")}
              </Typography>
              <Typography fontSize="13px" marginLeft="10px" textAlign="left">
                {dayOfWeek}
              </Typography>
            </LocalizationProvider>
          </Box>

          <Popover
            open={Boolean(dAnchorEl)}
            anchorEl={dAnchorEl}
            onClose={handleDPopoverClose} // Close the Popover when it is clicked outside
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transitionDuration={300}
            PaperProps={{
              style: {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            <div className={classes.popover}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDepartureDateChange}
                  renderInput={(props) => <TextField {...props} />}
                  adapter={AdapterDayjs}
                />
              </LocalizationProvider>
            </div>
          </Popover>

          {/* return date */}

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
              {/* <CalendarMonthIcon
                style={{ color: "#0067FF", marginLeft: "10px" }}
              /> */}

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
                  style={{ fontSize: "22px", fontWeight: "bold" }}
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

          <Popover
            open={Boolean(returnAnchorEl)}
            anchorEl={returnAnchorEl}
            onClose={handleRPopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transitionDuration={300}
            PaperProps={{
              style: {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            <div className={classes.popover}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={returnDate} // Use the returnDate state variable as the value for the DateCalendar
                  onChange={handleReturnDateChange} // Call handleReturnDateChange when the user selects a return date
                  renderInput={(props) => <TextField {...props} />}
                  adapter={AdapterDayjs}
                />
              </LocalizationProvider>
            </div>
          </Popover>
        </Box>
      </Grid>

      {/* item 3 */}
      <Grid item sm={12} xs={12} lg={2} md={2}>
        <Box style={paperStyle}>
          {/* Travller class */}

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
                  style={{ fontSize: "22px", fontWeight: "bold" }}
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

            {/* Conditionally show "Add Another City" and "Remove" for multi-city inputs */}
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

          <Popover
            open={isModalOpen}
            anchorEl={dAnchorEl} // Ensure this is correctly set to the button/input field
            onClose={closeModal}
            anchorOrigin={{
              vertical: "center", // Adjust these values
              horizontal: "right", // Adjust these values
            }}
            transformOrigin={{
              vertical: "top", // Adjust to 'top' if you want it to appear below the button/input
              horizontal: "right", // Aligns to the end of the anchor element
            }}
            transitionDuration={300}
            PaperProps={{
              style: {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            <Box
              style={{ padding: 20, minWidth: 200, boxSizing: "border-box" }}
            >
              <Box style={{ marginBottom: 10 }}>
                <Typography fontFamily="Google Sans, sans-serif">
                  Adults
                </Typography>
                <Button onClick={() => travelerCount("adults", "decrement")}>
                  -
                </Button>
                {adults}
                <Button onClick={() => travelerCount("adults", "increment")}>
                  +
                </Button>
              </Box>
              <Divider style={{ margin: "8px 0" }} />
              <Box style={{ marginBottom: 10 }}>
                <Typography fontFamily="Google Sans, sans-serif">
                  Children
                </Typography>
                <Button onClick={() => travelerCount("children", "decrement")}>
                  -
                </Button>
                {children}
                <Button onClick={() => travelerCount("children", "increment")}>
                  +
                </Button>
              </Box>
              <Box style={{ marginBottom: 10 }}>
                <Typography fontFamily="Google Sans, sans-serif">
                  Infants
                </Typography>
                <Button onClick={() => travelerCount("infants", "decrement")}>
                  -
                </Button>
                {infants}
                <Button onClick={() => travelerCount("infants", "increment")}>
                  +
                </Button>
              </Box>

              <Divider style={{ margin: "8px 0" }} />
              <RadioGroup
                row
                aria-label="class"
                name="class"
                value={selectedClass}
                onChange={handleClassChange}
              >
                <FormControlLabel
                  value="Economy"
                  control={<Radio />}
                  label="Economy"
                />
                <FormControlLabel
                  value="Business"
                  control={<Radio />}
                  label="Business"
                />
              </RadioGroup>
              <Button
                fontFamily="Google Sans, sans-serif"
                variant="contained"
                color="primary"
                onClick={closeModal}
              >
                Done
              </Button>
            </Box>
          </Popover>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AirInput;
