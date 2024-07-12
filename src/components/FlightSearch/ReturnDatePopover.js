import React from "react";
import { Popover, Box, TextField } from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ReturnDatePopover = ({
  returnAnchorEl,
  handleRPopoverClose,
  returnDate,
  handleReturnDateChange,
  classes,
}) => {
  return (
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
            value={returnDate}
            onChange={handleReturnDateChange}
            renderInput={(props) => <TextField {...props} />}
          />
        </LocalizationProvider>
      </div>
    </Popover>
  );
};

export default ReturnDatePopover;
