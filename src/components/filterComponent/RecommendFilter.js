import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const recommendedBoxStyle = {
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  gap: 2,
};

const boxStyle = {
  width: { xs: "100%", sm: "280px" },
  height: "auto",
  padding: "8px", // Added padding for better layout
  backgroundColor: "rgba(255,255,255,0.5)",
  borderRadius: "5px", // Slightly larger border radius
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

const headingTextStyle = {
  fontSize: "14px",
  fontWeight: "bold", // Bold text for emphasis
};

const typographyStyle = {
  display: { xs: "none", sm: "block" }, // Responsive display
  fontSize: "12px", // Smaller font size for secondary text
};

const RecommendFilter = ({ flightDataArray, onSortFlights }) => {
  const [sortedFlights, setSortedFlights] = useState([...flightDataArray]);
  const [activeBox, setActiveBox] = useState("recommended");

  useEffect(() => {
    setSortedFlights([...flightDataArray]);
  }, [flightDataArray]);

  const handleSortByDuration = () => {
    const sortedByDuration = [...flightDataArray].sort((a, b) => {
      const durationA = parseInt(a.segments[0].JourneyDuration);
      const durationB = parseInt(b.segments[0].JourneyDuration);
      return durationA - durationB;
    });
    onSortFlights(sortedByDuration);
    setActiveBox("fastest");
  };

  const handleSortByBaseFare = () => {
    const sortedByBaseFare = [...flightDataArray].sort((a, b) => {
      const baseFareA = parseInt(a.Fares[0].BaseFare);
      const baseFareB = parseInt(b.Fares[0].BaseFare);
      return baseFareA - baseFareB;
    });
    onSortFlights(sortedByBaseFare);
    setActiveBox("cheapest");
  };

  const getBoxStyle = (boxName) => ({
    ...boxStyle,
    backgroundColor:
      activeBox === boxName ? "#007bff" : "rgba(255,255,255,0.5)", // Primary color for active
    color: activeBox === boxName ? "#fff" : "#000",
    transform: activeBox === boxName ? "scale(1.05)" : "scale(1)",
    boxShadow:
      activeBox === boxName ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
  });

  return (
    <Box sx={recommendedBoxStyle}>
      <Box
        onClick={() => setActiveBox("recommended")}
        sx={getBoxStyle("recommended")}
      >
        <Typography sx={headingTextStyle}>Recommended</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={typographyStyle}>5H 30</Typography>
          <Typography sx={typographyStyle}>Direct</Typography>
          <Typography sx={typographyStyle}>BDT 61984</Typography>
        </Box>
      </Box>
      <Box onClick={handleSortByBaseFare} sx={getBoxStyle("cheapest")}>
        <Typography sx={headingTextStyle}>Cheapest</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={typographyStyle}>11H 30</Typography>
          <Typography sx={typographyStyle}>1 Stop</Typography>
          <Typography sx={typographyStyle}>BDT 61597</Typography>
        </Box>
      </Box>
      <Box onClick={handleSortByDuration} sx={getBoxStyle("fastest")}>
        <Typography sx={headingTextStyle}>Fastest</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={typographyStyle}>5H 30</Typography>
          <Typography sx={typographyStyle}>Direct</Typography>
          <Typography sx={typographyStyle}>BDT 68952</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendFilter;
