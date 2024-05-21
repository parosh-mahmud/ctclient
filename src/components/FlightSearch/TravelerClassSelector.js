import React, { useState } from "react";
import {
  Box,
  Popover,
  Typography,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import useStyles from "./styles";

const TravelerClassSelector = ({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  selectedClass,
  setSelectedClass,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const travelerCount = (type, action) => {
    if (action === "increment" && adults + children + infants < 10) {
      switch (type) {
        case "adults":
          if (adults < 9) setAdults(adults + 1);
          break;
        case "children":
          setChildren(children + 1);
          break;
        case "infants":
          if (infants < adults) setInfants(infants + 1);
          break;
        default:
          break;
      }
    } else if (action === "decrement") {
      switch (type) {
        case "adults":
          setAdults(adults > 1 ? adults - 1 : adults);
          if (infants > adults - 1) setInfants(adults - 1);
          break;
        case "children":
          setChildren(children > 0 ? children - 1 : children);
          break;
        case "infants":
          setInfants(infants > 0 ? infants - 1 : infants);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <Box onClick={handlePopoverClick} className={classes.travelerBox}>
        <Typography>Traveller & Class</Typography>
        <Box className={classes.travelerInfo}>
          <Typography className={classes.travelerCount}>{`${
            adults + children + infants
          } Person${adults + children + infants > 1 ? "s" : ""}`}</Typography>
          <Typography className={classes.travelClass}>
            {selectedClass}
          </Typography>
        </Box>
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
        <Box className={classes.popoverContent}>
          <Box className={classes.travelerSelector}>
            <Typography>Adults</Typography>
            <Button onClick={() => travelerCount("adults", "decrement")}>
              -
            </Button>
            {adults}
            <Button onClick={() => travelerCount("adults", "increment")}>
              +
            </Button>
          </Box>
          <Divider />
          <Box className={classes.travelerSelector}>
            <Typography>Children</Typography>
            <Button onClick={() => travelerCount("children", "decrement")}>
              -
            </Button>
            {children}
            <Button onClick={() => travelerCount("children", "increment")}>
              +
            </Button>
          </Box>
          <Divider />
          <Box className={classes.travelerSelector}>
            <Typography>Infants</Typography>
            <Button onClick={() => travelerCount("infants", "decrement")}>
              -
            </Button>
            {infants}
            <Button onClick={() => travelerCount("infants", "increment")}>
              +
            </Button>
          </Box>
          <Divider />
          <RadioGroup
            row
            aria-label="class"
            name="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <FormControlLabel
              value="Economy"
              control={<Radio />}
              label="Economy"
            />
            <FormControlLabel
              value="Business"
              control={<Radio />}
              label="Business"
            />
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePopoverClose}
          >
            Done
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default TravelerClassSelector;
