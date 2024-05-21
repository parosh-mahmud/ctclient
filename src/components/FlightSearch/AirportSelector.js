import React, { useState } from "react";
import { Box, Popover, Typography, TextField } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import airports from "./data/Airport";
import useStyles from "./styles";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";

const AirportSelector = ({
  selectedAirport,
  setSelectedAirport,
  searchQuery,
  setSearchQuery,
  label,
  swapAirports,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleAirportSelect = (airport) => {
    setSelectedAirport(airport);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box onClick={handlePopoverClick} className={classes.airportBox}>
        <Box className={classes.airportLabel}>
          {label === "From" ? (
            <FlightTakeoffIcon style={{ color: "#0067FF" }} />
          ) : (
            <FlightLandIcon style={{ color: "#0067FF" }} />
          )}
          <Typography>{label}</Typography>
        </Box>
        <Box className={classes.airportInfo}>
          <Typography className={classes.airportCode}>
            {selectedAirport
              ? `${selectedAirport.city} - ${selectedAirport.code}`
              : "Select an Airport"}
          </Typography>
          <Typography className={classes.airportName}>
            {selectedAirport ? selectedAirport.name : "Select an Airport"}
          </Typography>
        </Box>
        {label === "From" && (
          <Box onClick={swapAirports} className={classes.swapIcon}>
            <SwapHorizontalCircleIcon />
          </Box>
        )}
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
          {(searchQuery
            ? airports.filter((a) =>
                a.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : airports
          ).map((airport, index) => (
            <div
              key={`${airport.code}-${index}`}
              onClick={() => handleAirportSelect(airport)}
              className={classes.airportItem}
            >
              <Box className={classes.airportBox}>
                <Box>
                  <Typography fontWeight="bold">
                    {airport.city}, {airport.country}
                  </Typography>
                  <Typography>{airport.name}</Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold">{airport.code}</Typography>
                </Box>
              </Box>
            </div>
          ))}
        </div>
      </Popover>
    </>
  );
};

export default AirportSelector;
