import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchParams,
  fetchFlightResults,
  selectFlightSearchParams,
} from "../../redux/reducers/flightSlice";

const FilterByDate = ({ onDateSelect }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const currentSearchParams = useSelector(selectFlightSearchParams);
  const boxStyle = (isActive) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: { xs: "85px", sm: "100px", md: "170px" },
    height: "35px",
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
    return date.toLocaleDateString("en-US", options);
  };

  const [activeBox, setActiveBox] = useState(3);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (currentSearchParams && currentSearchParams.Segments) {
      const departureDate = new Date(
        currentSearchParams.Segments[0].DepartureDateTime
      );
      departureDate.setHours(0, 0, 0, 0); // Normalize departure date

      const newDates = [];
      for (let i = -3; i <= 3; i++) {
        const date = new Date(departureDate);
        date.setDate(departureDate.getDate() + i);
        newDates.push(date);
      }

      setDates(newDates);

      const initialActiveBox = 3; // Center box

      setActiveBox(initialActiveBox);
    }
  }, [currentSearchParams]);

  const handleBoxClick = (boxNumber) => {
    setActiveBox(boxNumber);
    const selectedDate = dates[boxNumber];
    onDateSelect(selectedDate);

    const newSearchParams = {
      ...currentSearchParams,
      Segments: [
        {
          ...currentSearchParams.Segments[0],
          DepartureDateTime: selectedDate.toISOString(),
        },
      ],
    };
    dispatch(setSearchParams(newSearchParams));
    dispatch(fetchFlightResults(newSearchParams));
  };

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -100, // Adjust this value based on your needs
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 100, // Adjust this value based on your needs
        behavior: "smooth",
      });
    }
  };

  const visibleDates = isMobile
    ? dates.slice(
        Math.max(0, activeBox - 1),
        Math.min(dates.length, activeBox + 2)
      )
    : dates;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={() => {
          scrollLeft();
          handleBoxClick(Math.max(activeBox - 1, 0));
        }}
        disabled={activeBox === 0}
      >
        <ArrowBackIcon sx={{ color: "primary.main" }} />
      </IconButton>
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {visibleDates.map((date, index) => {
          const boxIndex = isMobile
            ? index + Math.max(0, activeBox - 1)
            : index;
          return (
            <Box
              key={boxIndex}
              onClick={() => handleBoxClick(boxIndex)}
              sx={boxStyle(activeBox === boxIndex)}
            >
              <Typography variant="body2">{formatDate(date)}</Typography>
            </Box>
          );
        })}
      </Box>
      <IconButton
        onClick={() => {
          scrollRight();
          handleBoxClick(Math.min(activeBox + 1, dates.length - 1));
        }}
        disabled={activeBox === dates.length - 1}
      >
        <ArrowForwardIcon sx={{ color: "primary.main" }} />
      </IconButton>
    </Box>
  );
};

export default FilterByDate;
