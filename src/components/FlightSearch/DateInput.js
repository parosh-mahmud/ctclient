import React from "react";
import { Box, Typography, Popover, TextField } from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { selectFlightSearchParams } from "../../redux/reducers/flightSlice";

const DateInput = ({
  label,
  selectedDate,
  onClick,
  isPopoverOpen,
  anchorEl,
  onClose,
  onChange,
  dayOfWeek,
}) => {
  return (
    <Box>
      <Box
        onClick={onClick}
        style={{
          borderRight: "none",
          border: "1px solid #0067FF",
          borderRadius: "5px",
          width: "100%",
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
            <Typography marginLeft="10px">{label}</Typography>
            {isPopoverOpen ? (
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
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={onClose}
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
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={onChange}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
        </div>
      </Popover>
    </Box>
  );
};

export default DateInput;
