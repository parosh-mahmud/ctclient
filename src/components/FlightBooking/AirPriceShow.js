import React from "react";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { selectAirPriceData } from "../../redux/slices/airPriceSlice";
import { useSelector } from "react-redux";

const AirPriceShow = () => {
  const airPriceData = useSelector(selectAirPriceData);
  console.log(airPriceData);

  // Function to calculate the total fare
  const calculateTotalFare = () => {
    const results = airPriceData?.Results ?? [];
    if (results.length > 0) {
      const fares = results[0].Fares;
      let totalFare = 0;

      fares.forEach((fare) => {
        totalFare +=
          fare.BaseFare +
          fare.Tax +
          fare.OtherCharges +
          fare.ServiceFee +
          fare.Discount -
          fare.Discount;
      });

      return totalFare;
    }

    return 0;
  };

  const boxStyle = {
    width: "100%",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid white", // Add any additional styling you need
  };

  const customStyle = {
    fontWeight: "bold",
  };

  return (
    <Box
      container
      sx={{ padding: "10px", borderRadius: "5px", border: "1px solid white" }}
    >
      <Box
        sx={{
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          Fare Summary
        </Typography>
      </Box>

      {/* Conditional rendering for each Box if airPriceData.Results exists */}
      {airPriceData?.Results?.[0]?.Fares?.map((fare, index) => (
        <React.Fragment key={index}>
          <Box style={boxStyle}>
            <Typography>Base fare</Typography>
            <Typography style={customStyle}>{fare.BaseFare}</Typography>
          </Box>
          <Box style={boxStyle}>
            <Typography>Taxes</Typography>
            <Typography style={customStyle}>{fare.Tax}</Typography>
          </Box>
          <Box style={boxStyle}>
            <Typography>AIT & VAT</Typography>
            <Typography style={customStyle}>{fare.ServiceFee}</Typography>
          </Box>
          <Box style={boxStyle}>
            <Typography>Other Charge & fees</Typography>
            <Typography style={customStyle}>{fare.OtherCharges}</Typography>
          </Box>
          <Box style={boxStyle}>
            <Typography>Discount</Typography>
            <Typography style={customStyle}>{fare.Discount}</Typography>
          </Box>
        </React.Fragment>
      ))}

      <Box style={boxStyle}>
        <Typography>Grand Total</Typography>
        <Typography style={customStyle}>{calculateTotalFare()}</Typography>
      </Box>
      {/* promo code box */}
      <Box
        sx={{
          height: "80px",
          backgroundColor: "primary.main",
          padding: "10px",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", color: "white" }}
        >
          <Typography>Apply promo</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            InputProps={{
              sx: {
                "& .MuiInputBase-input::placeholder": {
                  color: "white", // Change this to your desired placeholder color
                },
              },
            }}
            variant="standard"
            placeholder="Enter your promo code"
          />
          <Button sx={{ backgroundColor: "white" }} variant="contained">
            <Typography sx={{ color: "primary.main" }}>Apply</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AirPriceShow;
