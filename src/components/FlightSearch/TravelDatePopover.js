import React from "react";
import { Popover, Box, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TravelDatePopover = ({
  dAnchorEl,
  handleDPopoverClose,
  selectedDate,
  handleDepartureDateChange,
  classes,
}) => {
  return (
    <Popover
      open={Boolean(dAnchorEl)}
      anchorEl={dAnchorEl}
      onClose={handleDPopoverClose}
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
          />
        </LocalizationProvider>
      </div>
    </Popover>
  );
};

export default TravelDatePopover;
