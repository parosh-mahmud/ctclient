import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch } from "react-redux";
import { setFlightSearchData } from "../../redux/slices/flightSlice";

const FilterByDate = ({ onDateSelect }) => {
  const dispatch = useDispatch();
  const theme = useTheme(); // Using theme for consistent styling
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Enhanced styling for responsiveness and visual feedback
  const boxStyle = (isActive) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: { xs: "85px", sm: "100px", md: "170px" }, // Responsive width
    height: "70px",
    marginRight: "5px",
    textAlign: "center",
    borderRadius: "5px",
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: isActive
      ? theme.palette.primary.main
      : "rgba(255,255,255,0.5)",
    color: isActive ? "white" : theme.palette.primary.main,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
    transition: "background-color 0.3s, color 0.3s",
  });

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => formatDate(new Date());

  const [activeBox, setActiveBox] = useState(3);

  const getRelativeDate = (daysOffset) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysOffset);
    return formatDate(currentDate);
  };

  const handleBoxClick = (boxNumber, daysOffset) => {
    setActiveBox(boxNumber);
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + daysOffset);
    onDateSelect(selectedDate); // Assuming you pass the selected date to a parent component
  };

  useEffect(() => {
    setActiveBox(3);
    // Assuming you might want to fetch or dispatch something on component mount
  }, [dispatch]);
  // Determine the range of dates to display based on activeBox and isMobile
  const visibleDates = isMobile
    ? [activeBox - 1, activeBox, activeBox + 1]
    : [...Array(7).keys()];

  return (
    <Box sx={{ display: "flex", alignItems: "center", overflowX: "auto" }}>
      <IconButton
        onClick={() =>
          handleBoxClick(Math.max(activeBox - 1, 1), activeBox - 3)
        }
        disabled={activeBox === 1}
      >
        <ArrowBackIcon />
      </IconButton>
      {[...Array(7)].map(
        (_, index) =>
          visibleDates.includes(index + 1) && (
            <Box
              key={index}
              onClick={() => handleBoxClick(index + 1, index - 2)}
              sx={boxStyle(activeBox === index + 1)}
            >
              <Typography variant="body2">
                {getRelativeDate(index - 2)}
              </Typography>
            </Box>
          )
      )}
      <IconButton
        onClick={() =>
          handleBoxClick(Math.min(activeBox + 1, 7), activeBox - 1)
        }
        disabled={activeBox === 7}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default FilterByDate;
