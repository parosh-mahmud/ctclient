import React from "react";
import { Box, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import CustomIconButton from "./CustomIconButton";

const JourneyTypeSelector = ({ selectedOption, setSelectedOption }) => {
  const handleOptionChange = (newValue) => {
    setSelectedOption(newValue);
  };

  return (
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
  );
};

export default JourneyTypeSelector;
