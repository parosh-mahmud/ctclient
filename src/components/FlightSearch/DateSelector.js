import React, { useRef, useState } from "react";
import { Box, Popover, Typography } from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useStyles from "./styles";

const DateSelector = ({ selectedDate, setSelectedDate, label }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAnchorEl(null);
  };

  return (
    <>
      <Box onClick={handlePopoverClick} className={classes.dateBox}>
        <Typography>{label}</Typography>
        <Box className={classes.dateInfo}>
          <Typography className={classes.date}>
            {selectedDate.format("DD MMM YY")}
          </Typography>
          <Typography className={classes.dayOfWeek}>
            {selectedDate.format("dddd")}
          </Typography>
        </Box>
        {open ? (
          <KeyboardArrowUpIcon className={classes.dateIcon} />
        ) : (
          <KeyboardArrowDownIcon className={classes.dateIcon} />
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={selectedDate} onChange={handleDateChange} />
          </LocalizationProvider>
        </div>
      </Popover>
    </>
  );
};

export default DateSelector;
