import React from "react";
import {
  Box,
  Typography,
  Grid,
  Popover,
  TextField,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import AirInput from "./AirInput";

const JourneyType = ({
  selectedOption,
  handleOptionChange,
  airInputs,
  handleAddCity,
  handleRemoveCity,
  ...props
}) => {
  return (
    <>
      <Grid container style={props.gridContainerStyle}>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "10px",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            aria-label="journey-type"
            name="journey-type"
          >
            <CustomIconButton
              value="oneway"
              selectedValue={selectedOption}
              onChange={() => handleOptionChange("oneway")}
              Icon={KeyboardBackspaceIcon}
              label="One Way"
            />
            <CustomIconButton
              value="return"
              selectedValue={selectedOption}
              onChange={() => handleOptionChange("return")}
              Icon={RestartAltIcon}
              label="Return"
              rotate={true}
            />
            <CustomIconButton
              value="multicity"
              selectedValue={selectedOption}
              onChange={() => handleOptionChange("multicity")}
              Icon={CallSplitIcon}
              label="Multi City"
              rotate={true}
            />
          </Box>
        </Grid>

        {airInputs.map((input, index) => (
          <AirInput
            key={input.id}
            isFirstChild={index === 0}
            canRemove={airInputs.length > 1 && index !== 0}
            journeyType={selectedOption}
            onAddCity={handleAddCity}
            onRemoveCity={() => handleRemoveCity(input.id)}
            {...props}
          />
        ))}
      </Grid>
    </>
  );
};

const CustomIconButton = ({
  value,
  selectedValue,
  onChange,
  Icon,
  label,
  rotate,
}) => {
  const isSelected = selectedValue === value;
  const iconStyle = rotate ? { transform: "rotate(270deg)" } : {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight: "16px",
        marginBottom: "10px",
        marginTop: "10px",
        justifyContent: "center",
        backgroundColor: isSelected ? "#0067FF" : "transparent",
        color: isSelected ? "#fff" : "inherit",
        padding: "6px 12px",
        borderRadius: "5px",
        border: isSelected ? "1px solid #0067FF" : "1px solid transparent",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: isSelected ? "#0056cc" : "#f0f0f0",
          borderColor: isSelected ? "#0056cc" : "#ccc",
        },
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
      onClick={() => onChange(value)}
    >
      <Icon color={isSelected ? "inherit" : "action"} style={iconStyle} />
      <Typography
        variant="caption"
        sx={{
          marginLeft: "8px",
          color: "inherit",
          fontSize: {
            xs: "10px",
            sm: "14px",
          },
          fontFamily: "Google Sans",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default JourneyType;
