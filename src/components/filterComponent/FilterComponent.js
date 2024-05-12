// import React, { useEffect, useState } from "react";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";

// // Import icons
// import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
// import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
// import TuneIcon from "@mui/icons-material/Tune";
// import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import SyncIcon from "@mui/icons-material/Sync";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ShieldIcon from "@mui/icons-material/Shield";
// import { selectFlightSearchData } from "../../redux/reducers/flightSlice";
// import { useSelector } from "react-redux";
// import Collapse from "@mui/material/Collapse";

// const FilterComponent = ({
//   flightDataArray,
//   onSortFlights,
//   onFilterByAirline,
// }) => {
//   console.log(flightDataArray);
//   const theme = useTheme();
//   const matchesSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const flightSearchData = useSelector(selectFlightSearchData);
//   const [collapseOpen, setCollapseOpen] = useState(false); // State to manage Collapse
//   const toggleCollapse = () => {
//     setCollapseOpen(!collapseOpen);
//   };
//   const [filters, setFilters] = useState({
//     takeOff: "Take Off",
//     priceRange: "Price Range",
//     refundable: "Refundable",
//     layover: "Layover",
//     airline: "Airline",
//   });
//   const [selectedFilters, setSelectedFilters] = useState({
//     takeOff: "",
//     priceRange: "",
//     refundable: "",
//     layover: "",
//     airline: "All Airlines",
//   });

//   const [anchorEl, setAnchorEl] = useState({
//     takeOff: null,
//     priceRange: null,
//     refundable: null,
//     layover: null,
//     airline: null,
//   });

//   // Initialize menuItems without airline names
//   const [menuItems, setMenuItems] = useState({
//     takeOff: ["Earlier flight", "Later flight"],
//     priceRange: ["Cheapest", "Highest"],
//     refundable: ["Refundable", "Partially Refundable", "Non-refundable"],
//     layover: ["Maximum", "Minimum"],
//     airline: [], // Will be populated dynamically
//   });
//   // Icons mapping to the filter keys
//   const filterIcons = {
//     takeOff: <AccessTimeFilledIcon fontSize="20px" />,
//     priceRange: <LocalOfferIcon fontSize="9px" />,
//     refundable: <ShieldIcon />,
//     layover: <AirlineStopsIcon />,
//     airline: <AirplanemodeActiveIcon />,
//   };

//   const handleClick = (event, type) => {
//     setAnchorEl({ ...anchorEl, [type]: event.currentTarget });
//   };
//   // Function to compute unique airline names
//   const getUniqueAirlineNames = (flightData) => {
//     const airlineNames = flightData
//       .flatMap((flight) =>
//         flight.segments.map((segment) => segment.Airline.AirlineName)
//       )
//       .filter((value, index, self) => self.indexOf(value) === index); // Filter for uniqueness
//     return airlineNames;
//   };

//   useEffect(() => {
//     // Update airline names based on the current flight data
//     const uniqueAirlineNames = [
//       "All Airlines",
//       ...getUniqueAirlineNames(flightDataArray),
//     ];
//     setMenuItems((prevItems) => ({
//       ...prevItems,
//       airline: uniqueAirlineNames,
//     }));
//   }, [flightDataArray]);

//   console.log(flightSearchData);

//   const handleClose = (option, type) => {
//     setAnchorEl({ ...anchorEl, [type]: null }); // Close the menu

//     if (option === null && type === "airline") {
//       // Specifically for the airline filter, reset to "All Airlines" when closing without selection
//       setSelectedFilters({ ...selectedFilters, [type]: "All Airlines" });
//     } else {
//       // For other filters or when an option is selected, proceed as before
//       setSelectedFilters({
//         ...selectedFilters,
//         [type]: option || selectedFilters[type],
//       });
//     }

//     if (type === "takeOff" || type === "priceRange") {
//       onSortFlights(option);
//     } else if (type === "airline" && option) {
//       // Apply the airline filter only if an option is selected
//       onFilterByAirline(option === "All Airlines" ? option : option);
//     }
//   };

//   const boxStyle = {
//     width: matchesSmallScreen ? "auto" : "100%", // Full width on desktop
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     borderRadius: 2,
//     p: 2,
//   };

//   const buttonStyle = {
//     margin: matchesSmallScreen ? "0px" : "0 5px",
//   };

//   const textStyle = {
//     fontSize: matchesSmallScreen ? "9px" : "16px", // Larger font size on desktop
//   };

//   return (
//     <Box
//       sx={{
//         ...boxStyle,
//         backgroundColor: "#fff",
//         // boxShadow: 1,
//         borderRadius: 2,
//         p: 2,
//       }}
//     >
//       {matchesSmallScreen && (
//         <Collapse in={collapseOpen}>
//           <Box
//             sx={{
//               marginBottom: 2,
//               backgroundColor: "#f0f0f0",
//               padding: 2,
//               borderRadius: "4px",
//               display: "flex", // Use flex display for horizontal layout
//               flexWrap: "wrap", // Allow items to wrap as needed
//               gap: 1, // Add some space between items
//             }}
//           >
//             {Object.keys(filters).map((filterKey) => {
//               if (!["refundable", "layover", "airline"].includes(filterKey)) {
//                 return null;
//               }

//               return (
//                 <Box key={filterKey} sx={{ flexGrow: 1, minWidth: "50%" }}>
//                   {" "}
//                   {/* Ensure each item can grow and has a minimum width */}
//                   <Button
//                     fullWidth // Button takes full width of its container
//                     variant="outlined"
//                     startIcon={filterIcons[filterKey]}
//                     endIcon={<ExpandMoreIcon />}
//                     sx={{
//                       borderColor: "transparent",
//                       textTransform: "none",
//                       fontSize: "9px",
//                     }}
//                     onClick={(e) => handleClick(e, filterKey)}
//                   >
//                     {selectedFilters[filterKey] || filters[filterKey]}
//                   </Button>
//                   <Menu
//                     id={`${filterKey}-menu`}
//                     anchorEl={anchorEl[filterKey]}
//                     keepMounted
//                     open={Boolean(anchorEl[filterKey])}
//                     onClose={() => handleClose(null, filterKey)}
//                   >
//                     {menuItems[filterKey].map((option) => (
//                       <MenuItem
//                         key={option}
//                         onClick={() => handleClose(option, filterKey)}
//                       >
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </Menu>
//                 </Box>
//               );
//             })}
//           </Box>
//         </Collapse>
//       )}
//       {!matchesSmallScreen && (
//         <IconButton color="primary" sx={{ p: "8px", ...buttonStyle }}>
//           <TuneIcon />
//         </IconButton>
//       )}

//       {Object.keys(filters).map((filterKey) => {
//         if (
//           matchesSmallScreen &&
//           !["takeOff", "priceRange"].includes(filterKey)
//         ) {
//           return null;
//         }

//         return (
//           <div key={filterKey}>
//             <Button
//               variant="outlined"
//               startIcon={filterIcons[filterKey]}
//               endIcon={<ExpandMoreIcon sx={{ fontSize: "9px" }} />}
//               sx={{
//                 ...buttonStyle,
//                 borderColor: "transparent",
//                 textTransform: "none",
//                 fontSize: "9px",
//               }}
//               onClick={(e) => handleClick(e, filterKey)}
//             >
//               {selectedFilters[filterKey] || filters[filterKey]}
//             </Button>
//             <Menu
//               id={`${filterKey}-menu`}
//               anchorEl={anchorEl[filterKey]}
//               keepMounted
//               open={Boolean(anchorEl[filterKey])}
//               onClose={() => handleClose(null, filterKey)}
//             >
//               {menuItems[filterKey].map((option) => (
//                 <MenuItem
//                   key={option}
//                   onClick={() => handleClose(option, filterKey)}
//                 >
//                   {option}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </div>
//         );
//       })}

//       <Box
//         sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
//         onClick={toggleCollapse}
//       >
//         <Typography sx={{ cursor: "pointer", fontSize: "9px" }}>
//           More filters
//         </Typography>
//         <ExpandMoreIcon sx={{ fontSize: "9px" }} />
//       </Box>
//     </Box>
//   );
// };

// export default FilterComponent;

import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShieldIcon from "@mui/icons-material/Shield";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

function HorizontalBoxes({
  flightDataArray,
  onSortFlights,
  onFilterByAirline,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Define styles inside the component using theme
  const stylesForText = {
    fontSize: "14px",
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      fontSize: "20px", // Larger font size on desktop
    },
  };

  const stylesForIcon = {
    fontSize: "14px",
    color: "primary.main",
    [theme.breakpoints.up("md")]: {
      fontSize: "20px", // Larger icon size on desktop
    },
  };

  const [showMore, setShowMore] = useState(false);
  const [anchorEls, setAnchorEls] = useState({
    takeOff: null,
    price: null,
    refundable: null,
    layover: null,
    airlines: null,
  });

  const handleClick = (menu) => (event) => {
    setAnchorEls({ ...anchorEls, [menu]: event.currentTarget });
  };

  const handleClose = (menu) => () => {
    setAnchorEls({ ...anchorEls, [menu]: null });
  };

  const handleSortSelection = (criteria) => {
    onSortFlights(criteria);
    handleClose(criteria)();
  };

  const handleFilterSelection = (criteria) => {
    onFilterByAirline(criteria);
    handleClose(criteria)();
  };

  const [uniqueAirlines, setUniqueAirlines] = useState([]);

  useEffect(() => {
    const airlineSet = new Set(
      flightDataArray.flatMap((flight) =>
        flight.segments.map((segment) => segment.Airline.AirlineName)
      )
    );
    setUniqueAirlines(["All Airlines", ...airlineSet]);
  }, [flightDataArray]);

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      <Grid item xs={3} md="auto">
        <IconButton
          sx={stylesForIcon}
          onClick={handleClick("filters")}
          size="large"
        >
          <TuneIcon />
        </IconButton>
      </Grid>
      <Grid item xs={3} md="auto">
        <IconButton
          sx={stylesForIcon}
          onClick={handleClick("takeOff")}
          size="large"
        >
          <FlightTakeoffIcon />
          <Typography sx={stylesForText}>Take Off</Typography>
          <ExpandMoreIcon />
        </IconButton>
        <Menu
          id="takeoff-menu"
          anchorEl={anchorEls.takeOff}
          open={Boolean(anchorEls.takeOff)}
          onClose={handleClose("takeOff")}
        >
          <MenuItem onClick={() => handleSortSelection("Earlier Flight")}>
            Earlier Flight
          </MenuItem>
          <MenuItem onClick={() => handleSortSelection("Later Flight")}>
            Later Flight
          </MenuItem>
        </Menu>
      </Grid>
      <Grid item xs={3} md="auto">
        <IconButton
          sx={stylesForIcon}
          onClick={handleClick("price")}
          size="large"
        >
          <LocalOfferIcon />
          <Typography sx={stylesForText}>Price Range</Typography>
          <ExpandMoreIcon />
        </IconButton>
        <Menu
          id="price-menu"
          anchorEl={anchorEls.price}
          open={Boolean(anchorEls.price)}
          onClose={handleClose("price")}
        >
          <MenuItem onClick={() => handleSortSelection("Cheapest")}>
            Cheapest
          </MenuItem>
          <MenuItem onClick={() => handleSortSelection("Highest")}>
            Highest
          </MenuItem>
        </Menu>
      </Grid>
      <Grid item xs={3} md="none" sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton
          sx={stylesForIcon}
          size="large"
          onClick={() => setShowMore(!showMore)}
        >
          <ExpandMoreIcon />
          <Typography sx={stylesForText}>More Filters</Typography>
        </IconButton>
      </Grid>
      {/* Conditional items */}
      {(showMore || !isMobile) && (
        <>
          <Grid item xs={4} md="auto">
            <IconButton
              sx={stylesForIcon}
              onClick={handleClick("refundable")}
              size="large"
            >
              <ShieldIcon />
              <Typography sx={stylesForText}>Refundable</Typography>
              <ExpandMoreIcon />
            </IconButton>
            <Menu
              id="refundable-menu"
              anchorEl={anchorEls.refundable}
              open={Boolean(anchorEls.refundable)}
              onClose={handleClose("refundable")}
            >
              <MenuItem onClick={() => handleFilterSelection("Refundable")}>
                Refundable
              </MenuItem>
              <MenuItem
                onClick={() => handleFilterSelection("Partially Refundable")}
              >
                Partially Refundable
              </MenuItem>
              <MenuItem onClick={() => handleFilterSelection("Non-refundable")}>
                Non-refundable
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={4} md="auto">
            <IconButton
              sx={stylesForIcon}
              onClick={handleClick("layover")}
              size="large"
            >
              <AirlineStopsIcon />
              <Typography sx={stylesForText}>Layover</Typography>
              <ExpandMoreIcon />
            </IconButton>
            <Menu
              id="layover-menu"
              anchorEl={anchorEls.layover}
              open={Boolean(anchorEls.layover)}
              onClose={handleClose("layover")}
            >
              <MenuItem onClick={() => handleSortSelection("Maximum")}>
                Maximum
              </MenuItem>
              <MenuItem onClick={() => handleSortSelection("Minimum")}>
                Minimum
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={4} md="auto">
            <IconButton
              sx={stylesForIcon}
              onClick={handleClick("airlines")}
              size="large"
            >
              <AirplanemodeActiveIcon />
              <Typography sx={stylesForText}>Airlines</Typography>
              <ExpandMoreIcon />
            </IconButton>
            <Menu
              id="airlines-menu"
              anchorEl={anchorEls.airlines}
              open={Boolean(anchorEls.airlines)}
              onClose={handleClose("airlines")}
            >
              {uniqueAirlines.map((airline) => (
                <MenuItem
                  key={airline}
                  onClick={() => handleFilterSelection(airline)}
                >
                  {airline}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default HorizontalBoxes;
