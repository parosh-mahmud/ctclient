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
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AirlinesIcon from "@mui/icons-material/Airlines";

function HorizontalBoxes({
  flightDataArray,
  onSortFlights,
  onFilterByAirline,
  onFilterByRefundable,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const iconSize = isMobile ? 16 : 18;
  const iconStyle = {
    fontSize: iconSize,
    color: theme.palette.primary.main,
    justifyContent: "center",
    alignItems: "center",
  };

  const marginForMoreSort = {
    [theme.breakpoints.up("xs")]: {
      marginLeft: "25px",
    },
  };

  const stylesForText = {
    fontSize: "12px",
    color: "black",
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      fontSize: "14px",
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

  const [selectedSort, setSelectedSort] = useState({
    takeOff: "Take off",
    price: "Price range",
    refundable: "Refundable",
    layover: "Layover",
    airlines: "Airlines",
  });

  const handleClick = (menu) => (event) => {
    setAnchorEls({ ...anchorEls, [menu]: event.currentTarget });
  };

  const handleClose = (menu) => () => {
    setAnchorEls({ ...anchorEls, [menu]: null });
  };

  const handleSortSelection = (criteria, menu) => {
    onSortFlights(criteria);
    setSelectedSort({ ...selectedSort, [menu]: criteria });
    handleClose(menu)();
  };

  const handleFilterSelection = (criteria, menu) => {
    if (menu === "refundable") {
      onFilterByRefundable(criteria);
    } else {
      onFilterByAirline(criteria);
    }
    setSelectedSort({ ...selectedSort, [menu]: criteria });
    handleClose(menu)();
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

  const isMenuOpen = (menu) => Boolean(anchorEls[menu]);

  return (
    <Grid container justifyContent="space-between" alignItems="center" mt={1}>
      <Grid item xs={2} sm={3} md="auto">
        <IconButton onClick={handleClick("filters")}>
          <TuneIcon sx={iconStyle} />
        </IconButton>
      </Grid>
      <Grid item xs={3} sm={1} md="auto">
        <IconButton onClick={handleClick("takeOff")}>
          <AccessTimeFilledIcon sx={{ ...iconStyle }} />
          <Typography style={{ textTransform: "none" }} sx={stylesForText}>
            {selectedSort.takeOff}
          </Typography>
          <ExpandMoreIcon
            fontSize={isMobile ? "small" : "medium"}
            style={{
              transform: isMenuOpen("takeOff")
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </IconButton>
        <Menu
          id="takeoff-menu"
          anchorEl={anchorEls.takeOff}
          open={isMenuOpen("takeOff")}
          onClose={handleClose("takeOff")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => handleSortSelection("Earlier Flight", "takeOff")}
          >
            Earlier Flight
          </MenuItem>
          <MenuItem
            onClick={() => handleSortSelection("Later Flight", "takeOff")}
          >
            Later Flight
          </MenuItem>
        </Menu>
      </Grid>
      <Grid item xs={3} md="auto">
        <IconButton onClick={handleClick("price")}>
          <LocalOfferIcon sx={iconStyle} />
          <Typography style={{ textTransform: "none" }} sx={stylesForText}>
            {selectedSort.price}
          </Typography>
          <ExpandMoreIcon
            fontSize={isMobile ? "small" : "medium"}
            style={{
              transform: isMenuOpen("price")
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </IconButton>
        <Menu
          id="price-menu"
          anchorEl={anchorEls.price}
          open={isMenuOpen("price")}
          onClose={handleClose("price")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => handleSortSelection("Cheapest", "price")}>
            Cheapest
          </MenuItem>
          <MenuItem onClick={() => handleSortSelection("Highest", "price")}>
            Highest
          </MenuItem>
        </Menu>
      </Grid>
      <Grid
        item
        xs={4}
        sm={1}
        md="none"
        sx={{
          display: {
            xs: "block",
            md: "none",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <IconButton
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowMore(!showMore)}
          sx={marginForMoreSort}
        >
          <Typography style={{ textTransform: "none" }} sx={stylesForText}>
            More sorts
          </Typography>
          <ArrowRightAltIcon
            style={{ rotate: "90deg" }}
            fontSize={isMobile ? "small" : "large"}
          />
        </IconButton>
      </Grid>
      {(showMore || !isMobile) && (
        <>
          <Grid item xs={4} md="auto">
            <IconButton onClick={handleClick("refundable")}>
              <ShieldIcon sx={iconStyle} />
              <Typography sx={stylesForText}>
                {selectedSort.refundable}
              </Typography>
              <ExpandMoreIcon
                fontSize={isMobile ? "small" : "medium"}
                style={{
                  transform: isMenuOpen("refundable")
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </IconButton>
            <Menu
              id="refundable-menu"
              anchorEl={anchorEls.refundable}
              open={isMenuOpen("refundable")}
              onClose={handleClose("refundable")}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={() =>
                  handleFilterSelection("Refundable", "refundable")
                }
              >
                Refundable
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleFilterSelection("Partially Refundable", "refundable")
                }
              >
                Partially Refundable
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleFilterSelection("Non-refundable", "refundable")
                }
              >
                Non-refundable
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={4} md="auto">
            <IconButton onClick={handleClick("layover")}>
              <AirlineStopsIcon sx={iconStyle} />
              <Typography sx={stylesForText}>{selectedSort.layover}</Typography>
              <ExpandMoreIcon
                fontSize={isMobile ? "small" : "medium"}
                style={{
                  transform: isMenuOpen("layover")
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </IconButton>
            <Menu
              id="layover-menu"
              anchorEl={anchorEls.layover}
              open={isMenuOpen("layover")}
              onClose={handleClose("layover")}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={() => handleSortSelection("Maximum", "layover")}
              >
                Maximum
              </MenuItem>
              <MenuItem
                onClick={() => handleSortSelection("Minimum", "layover")}
              >
                Minimum
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={4} md="auto">
            <IconButton onClick={handleClick("airlines")}>
              <AirlinesIcon sx={iconStyle} />
              <Typography sx={stylesForText}>
                {selectedSort.airlines}
              </Typography>
              <ExpandMoreIcon
                fontSize={isMobile ? "small" : "medium"}
                style={{
                  transform: isMenuOpen("airlines")
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </IconButton>
            <Menu
              id="airlines-menu"
              anchorEl={anchorEls.airlines}
              open={isMenuOpen("airlines")}
              onClose={handleClose("airlines")}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {uniqueAirlines.map((airline) => (
                <MenuItem
                  key={airline}
                  onClick={() => handleFilterSelection(airline, "airlines")}
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
