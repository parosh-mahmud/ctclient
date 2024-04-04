import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
// Import icons
import TuneIcon from "@mui/icons-material/Tune";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SyncIcon from "@mui/icons-material/Sync";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { selectFlightSearchData } from "../../redux/reducers/flightSlice";
import { useSelector } from "react-redux";
const FilterComponent = ({ onSortByPrice }) => {
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

  const [anchorEl, setAnchorEl] = useState({
    takeOff: null,
    priceRange: null,
    refundable: null,
    layover: null,
    airline: null,
  });

  // Icons mapping to the filter keys
  const filterIcons = {
    takeOff: <FlightTakeoffIcon />,
    priceRange: <LocalOfferIcon />,
    refundable: <SyncIcon />,
    layover: <AccessTimeIcon />,
    airline: <AirplanemodeActiveIcon />,
  };

  const handleClick = (event, type) => {
    setAnchorEl({ ...anchorEl, [type]: event.currentTarget });
  };

  const handleClose = (option, type) => {
    setAnchorEl({ ...anchorEl, [type]: null });
    setFilters({ ...filters, [type]: option });
  };

  const handlePriceFilterSelect = (option) => {
    // Trigger sorting in parent component based on selected option
    onSortByPrice(option); // "Cheapest" or "Highest"
    // You can also close the menu here if needed or set any local states
  };

  // Modify the handleClose function or create a new one specific for handling price filter selection
  // For example, if using a new function:
  const handlePriceOptionSelect = (option) => {
    setFilters({
      ...filters,
      priceRange: option === "Cheapest" ? "Cheapest" : "Highest",
    });
    handleClose(); // Close the menu
    handlePriceFilterSelect(option);
  };

  const boxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap", // Allow items to wrap on small screens
  };

  const buttonStyle = {
    margin: matchesSmallScreen ? "5px" : "0 5px", // Adjust margin on small screens
  };

  const menuItems = {
    takeOff: ["Earlier flight", "Later flight"],
    priceRange: ["Cheapest", "Highest"],
    refundable: ["Refundable", "Non-refundable"],
    layover: ["Maximum", "Minimum"],
    airline: ["Any", "Airline A", "Airline B", "Airline C"],
  };

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

      {/* Dynamic filter buttons with specific icons */}
      {Object.keys(filters).map((filterKey) => (
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
            {filters[filterKey]}
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
      ))}

      {/* More Filters */}
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
