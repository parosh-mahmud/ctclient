import React from "react";
import {
  Popover,
  Box,
  Typography,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const TravelerClassPopover = ({
  isModalOpen,
  dAnchorEl,
  closeModal,
  travelerCount,
  adults,
  children,
  infants,
  selectedClass,
  handleClassChange,
  classes,
}) => {
  return (
    <Popover
      open={isModalOpen}
      anchorEl={dAnchorEl}
      onClose={closeModal}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transitionDuration={300}
      PaperProps={{
        style: {
          backgroundColor: "rgba(255,255,255,0.9)",
        },
      }}
    >
      <Box style={{ padding: 20, minWidth: 200, boxSizing: "border-box" }}>
        <Box style={{ marginBottom: 10 }}>
          <Typography fontFamily="Google Sans, sans-serif">Adults</Typography>
          <Button onClick={() => travelerCount("adults", "decrement")}>
            -
          </Button>
          {adults}
          <Button onClick={() => travelerCount("adults", "increment")}>
            +
          </Button>
        </Box>
        <Divider style={{ margin: "8px 0" }} />
        <Box style={{ marginBottom: 10 }}>
          <Typography fontFamily="Google Sans, sans-serif">Children</Typography>
          <Button onClick={() => travelerCount("children", "decrement")}>
            -
          </Button>
          {children}
          <Button onClick={() => travelerCount("children", "increment")}>
            +
          </Button>
        </Box>
        <Box style={{ marginBottom: 10 }}>
          <Typography fontFamily="Google Sans, sans-serif">Infants</Typography>
          <Button onClick={() => travelerCount("infants", "decrement")}>
            -
          </Button>
          {infants}
          <Button onClick={() => travelerCount("infants", "increment")}>
            +
          </Button>
        </Box>
        <Divider style={{ margin: "8px 0" }} />
        <RadioGroup
          row
          aria-label="class"
          name="class"
          value={selectedClass}
          onChange={handleClassChange}
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
          fontFamily="Google Sans, sans-serif"
          variant="contained"
          color="primary"
          onClick={closeModal}
        >
          Done
        </Button>
      </Box>
    </Popover>
  );
};

export default TravelerClassPopover;
