import React from "react";
import {
  Popover,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import airports from "./data/Airport";

const FromAirportPopover = ({
  fromAnchorEl,
  handlePopoverClose,
  searchQuery,
  handleSearchQueryChange,
  handleFromAirportSelect,
  searchedAirports,
  classes,
}) => {
  return (
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
                    <Typography fontSize="15px">{airport.name}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight="bold">{airport.code}</Typography>
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
                    <Typography fontSize="15px">{airport.name}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight="bold">{airport.code}</Typography>
                  </Box>
                </Box>
              </div>
            ))}
      </div>
    </Popover>
  );
};

export default FromAirportPopover;
