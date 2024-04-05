import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
// Import icons
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import TuneIcon from "@mui/icons-material/Tune";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SyncIcon from "@mui/icons-material/Sync";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShieldIcon from "@mui/icons-material/Shield";
import { selectFlightSearchData } from "../../redux/reducers/flightSlice";
import { useSelector } from "react-redux";

const FilterComponent = ({
  flightDataArray,
  onSortFlights,
  onFilterByAirline,
}) => {
  console.log(flightDataArray);
  const theme = useTheme();
  const matchesSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const flightSearchData = useSelector(selectFlightSearchData);
  const [filters, setFilters] = useState({
    takeOff: "Take Off",
    priceRange: "Price Range",
    refundable: "Refundable",
    layover: "Layover",
    airline: "Airline",
  });
  const [selectedFilters, setSelectedFilters] = useState({
    takeOff: "",
    priceRange: "",
    refundable: "",
    layover: "",
    airline: "",
  });

  const [anchorEl, setAnchorEl] = useState({
    takeOff: null,
    priceRange: null,
    refundable: null,
    layover: null,
    airline: null,
  });

  // Initialize menuItems without airline names
  const [menuItems, setMenuItems] = useState({
    takeOff: ["Earlier flight", "Later flight"],
    priceRange: ["Cheapest", "Highest"],
    refundable: ["Refundable", "Non-refundable"],
    layover: ["Maximum", "Minimum"],
    airline: [], // Will be populated dynamically
  });
  // Icons mapping to the filter keys
  const filterIcons = {
    takeOff: <AccessTimeFilledIcon />,
    priceRange: <LocalOfferIcon />,
    refundable: <ShieldIcon />,
    layover: <AirlineStopsIcon />,
    airline: <AirplanemodeActiveIcon />,
  };

  const handleClick = (event, type) => {
    setAnchorEl({ ...anchorEl, [type]: event.currentTarget });
  };
  // Function to compute unique airline names
  const getUniqueAirlineNames = (flightData) => {
    const airlineNames = flightData
      .flatMap((flight) =>
        flight.segments.map((segment) => segment.Airline.AirlineName)
      )
      .filter((value, index, self) => self.indexOf(value) === index); // Filter for uniqueness
    return airlineNames;
  };

  useEffect(() => {
    // Update airline names based on the current flight data
    const uniqueAirlineNames = getUniqueAirlineNames(flightDataArray);
    setMenuItems((prevItems) => ({
      ...prevItems,
      airline: uniqueAirlineNames,
    }));
  }, [flightDataArray]);

  console.log(flightSearchData);

  const handleClose = (option, type) => {
    setAnchorEl({ ...anchorEl, [type]: null }); // Close the menu

    if (option) {
      setSelectedFilters({ ...selectedFilters, [type]: option });

      if (type === "airline") {
        onFilterByAirline(option); // Call the new prop function
      } else if (type === "priceRange") {
        onSortFlights(option); // Existing sorting logic
      }
    }
  };
  const boxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    margin: matchesSmallScreen ? "5px" : "0 5px",
  };
  const uniqueAirlineNames = getUniqueAirlineNames(flightDataArray);

  return (
    <Box
      sx={{
        ...boxStyle,
        backgroundColor: "#fff",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
      }}
    >
      {/* Filters icon */}
      <IconButton color="primary" sx={{ p: "8px", ...buttonStyle }}>
        <TuneIcon />
      </IconButton>

      {/* Conditionally render buttons based on screen size */}
      {Object.keys(filters).map((filterKey) => {
        // Conditional rendering based on screen size remains the same

        return (
          <div key={filterKey}>
            <Button
              variant="outlined"
              startIcon={filterIcons[filterKey]}
              endIcon={<ExpandMoreIcon />}
              sx={{
                ...buttonStyle,
                borderColor: "transparent",
                textTransform: "none",
              }}
              onClick={(e) => handleClick(e, filterKey)}
            >
              {/* Display the selected filter if one exists, otherwise show the default */}
              {selectedFilters[filterKey] || filters[filterKey]}
            </Button>
            <Menu
              id={`${filterKey}-menu`}
              anchorEl={anchorEl[filterKey]}
              keepMounted
              open={Boolean(anchorEl[filterKey])}
              onClose={() => handleClose(null, filterKey)}
            >
              {menuItems[filterKey].map((option) => (
                <MenuItem
                  key={option}
                  onClick={() => handleClose(option, filterKey)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        );
      })}

      {/* Always show "More Filters" */}
      <Box
        sx={{
          ml: "auto",
          display: "flex",
          alignItems: "center",
          ...buttonStyle,
        }}
      >
        <Typography sx={{ cursor: "pointer" }}>More Filters</Typography>
        <ExpandMoreIcon />
      </Box>
    </Box>
  );
};

export default FilterComponent;
