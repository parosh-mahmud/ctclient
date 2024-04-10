import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

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
import Collapse from "@mui/material/Collapse";

const FilterComponent = ({
  flightDataArray,
  onSortFlights,
  onFilterByAirline,
}) => {
  console.log(flightDataArray);
  const theme = useTheme();
  const matchesSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const flightSearchData = useSelector(selectFlightSearchData);
  const [collapseOpen, setCollapseOpen] = useState(false); // State to manage Collapse
  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };
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
    airline: "All Airlines",
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
    refundable: ["Refundable", "Partially Refundable", "Non-refundable"],
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
    const uniqueAirlineNames = [
      "All Airlines",
      ...getUniqueAirlineNames(flightDataArray),
    ];
    setMenuItems((prevItems) => ({
      ...prevItems,
      airline: uniqueAirlineNames,
    }));
  }, [flightDataArray]);

  console.log(flightSearchData);

  const handleClose = (option, type) => {
    setAnchorEl({ ...anchorEl, [type]: null }); // Close the menu

    if (option === null && type === "airline") {
      // Specifically for the airline filter, reset to "All Airlines" when closing without selection
      setSelectedFilters({ ...selectedFilters, [type]: "All Airlines" });
    } else {
      // For other filters or when an option is selected, proceed as before
      setSelectedFilters({
        ...selectedFilters,
        [type]: option || selectedFilters[type],
      });
    }

    if (type === "takeOff" || type === "priceRange") {
      onSortFlights(option);
    } else if (type === "airline" && option) {
      // Apply the airline filter only if an option is selected
      onFilterByAirline(option === "All Airlines" ? option : option);
    }
  };

  const boxStyle = {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    margin: matchesSmallScreen ? "0px" : "0 5px",
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
      {matchesSmallScreen && (
        <Collapse in={collapseOpen}>
          <Box
            sx={{
              marginBottom: 2,
              backgroundColor: "#f0f0f0",
              padding: 2,
              borderRadius: "4px",
              display: "flex", // Use flex display for horizontal layout
              flexWrap: "wrap", // Allow items to wrap as needed
              gap: 1, // Add some space between items
            }}
          >
            {Object.keys(filters).map((filterKey) => {
              if (!["refundable", "layover", "airline"].includes(filterKey)) {
                return null;
              }

              return (
                <Box key={filterKey} sx={{ flexGrow: 1, minWidth: "50%" }}>
                  {" "}
                  {/* Ensure each item can grow and has a minimum width */}
                  <Button
                    fullWidth // Button takes full width of its container
                    variant="outlined"
                    startIcon={filterIcons[filterKey]}
                    endIcon={<ExpandMoreIcon />}
                    sx={{
                      borderColor: "transparent",
                      textTransform: "none",
                    }}
                    onClick={(e) => handleClick(e, filterKey)}
                  >
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
                </Box>
              );
            })}
          </Box>
        </Collapse>
      )}
      {!matchesSmallScreen && (
        <IconButton color="primary" sx={{ p: "8px", ...buttonStyle }}>
          <TuneIcon />
        </IconButton>
      )}

      {Object.keys(filters).map((filterKey) => {
        if (
          matchesSmallScreen &&
          !["takeOff", "priceRange"].includes(filterKey)
        ) {
          return null;
        }

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

      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={toggleCollapse}
      >
        <Typography sx={{ cursor: "pointer" }}>More Filters</Typography>
        <ExpandMoreIcon />
      </Box>
    </Box>
  );
};

export default FilterComponent;
