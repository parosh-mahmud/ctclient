import React from "react";
import {
  Box,
  Typography,
  Skeleton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AirlineSeatReclineNormal as AirlineSeatReclineNormalIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

const FlightActions = ({
  isLoading,
  availability,
  handleMenuOpen,
  anchorEl,
  handleMenuClose,
  handleSelect,
  calculateTotalAmount,
}) => {
  return (
    <Box className="flight-actions">
      <Typography>
        {isLoading ? (
          <Skeleton width={90} height={30} />
        ) : (
          <Typography fontSize="1.5rem" fontWeight="bold">
            BDT {calculateTotalAmount()}
          </Typography>
        )}
      </Typography>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isLoading ? (
          <Skeleton width={90} height={30} />
        ) : (
          <Typography
            sx={{
              display: "flex",
              fontWeight: "bold",
              justifyContent: "end",
              alignContent: "flex-end",
              alignItems: "self-end",
            }}
          >
            <AirlineSeatReclineNormalIcon
              style={{
                color: "#0067FF",
                fontSize: "1.3rem",
              }}
            />

            {availability}
          </Typography>
        )}
        <Button
          variant="text"
          style={{ textTransform: "capitalize", fontSize: "10px" }}
          onClick={handleMenuOpen}
          endIcon={
            anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          {isLoading ? <Skeleton width={90} height={30} /> : "Economy Flex"}
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Economy Flex</MenuItem>
        <MenuItem onClick={handleMenuClose}>Demo 1</MenuItem>
        <MenuItem onClick={handleMenuClose}>Demo 2</MenuItem>
      </Menu>
      <Button
        onClick={handleSelect}
        variant="contained"
        color="primary"
        className="flight-select-button"
        style={{ justifyContent: "flex-end", marginTop: "33px" }}
        endIcon={<ArrowForwardIcon />}
      >
        Select
      </Button>
    </Box>
  );
};

export default FlightActions;
