import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";

const CityInfo = ({ isLoading, cityName, cityCode }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "2",
        justifyContent: "center",
        alignItems: "end",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        <Typography fontSize="2rem" color="#0067FF" fontWeight="bold">
          {isLoading ? <Skeleton width={80} /> : cityName ? cityName : "N/A"}
        </Typography>
      </Box>

      <Box>
        <Typography fontSize="1.5rem" mt="-15px">
          {isLoading ? <Skeleton width={40} /> : cityCode ? cityCode : "N/A"}
        </Typography>
      </Box>
    </Box>
  );
};

export default CityInfo;
