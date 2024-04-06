import React, { useState, useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import DashBoardHeader from "../components/Header/MainHeader";
import SearchFlight from "../components/FlightSearch/AirSearchForm";
const DashBoard = () => {
  return (
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg={"white"}
      w="100%"
      borderRadius="lg"
      borderWidth="1px"
    >
      <SearchFlight />
    </Box>
  );
};

export default DashBoard;
