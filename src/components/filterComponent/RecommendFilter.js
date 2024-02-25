import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const recommendedBoxStyle = {
  width: '98%',
  height: 'auto',
  backgroundColor: 'rgba(255,255,255,0.5)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '5px',
  flexDirection: {
    xs: 'column', // Stack the boxes vertically on extra small devices
    sm: 'row', // Use row layout on devices wider than the sm breakpoint
  },
  gap: {
    xs: 2, // Add some vertical space between items on small devices
    sm: 0, // No gap needed for row layout
  },
};

const boxStyle = {
  width: {
    xs: '100%', // Full width on extra small devices
    sm: '280px', // Fixed width on devices wider than the sm breakpoint
  },
  height: 'auto', // Adjust height automatically
  backgroundColor: 'rgba(255,255,255,0.5)',
  border: '1px solid gray',
  borderRadius: '5px',
  cursor: 'pointer',
  padding: '10px', // Adjust padding if necessary
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center', // Center items for a better look on small screens
};

const headingTextStyle = {
  fontWeight: 'bold',
}

const RecommendFilter = ({flightDataArray,onSortFlights}) => {

   const [sortedFlights, setSortedFlights] = useState([...flightDataArray]);

useEffect(() => {
    // Whenever flightDataArray changes, update the sorted flights
    setSortedFlights([...flightDataArray]);
  }, [flightDataArray]);

  const handleSortByDuration = () => {
  const sortedByDuration = [...flightDataArray].sort((a, b) => {
    // Assuming the duration is in minutes, adjust the comparison as needed
    const durationA = parseInt(a.segments[0].JourneyDuration);
    const durationB = parseInt(b.segments[0].JourneyDuration);
    return durationA - durationB;
  });

  onSortFlights(sortedByDuration);
};

 const handleSortByBaseFare = () => {
    const sortedByBaseFare = [...flightDataArray].sort((a, b) => {
      const baseFareA = a.Fares[0].BaseFare;
      const baseFareB = b.Fares[0].BaseFare;
      return baseFareA - baseFareB;
    });
    onSortFlights(sortedByBaseFare);
  };

  return (
    <Box sx={recommendedBoxStyle}>
      <Box sx={boxStyle}>
        <Box sx={headingTextStyle}>Recommended</Box>
        <Box sx={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
          <Typography>5H 30</Typography>
          <Typography>Direct</Typography>
          <Typography>BDT 61984</Typography>
          
        </Box>
      </Box>
      <Box onClick={handleSortByBaseFare} sx={boxStyle}>
        <Box sx={headingTextStyle} >Cheapest</Box>
        <Box sx={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
          <Typography>5H 30</Typography>
          <Typography>Direct</Typography>
          <Typography>BDT 61984</Typography>
        </Box>
      </Box>
      <Box onClick={handleSortByDuration} sx={boxStyle}>
        <Box sx={headingTextStyle}>Fastest</Box>
        <Box sx={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}>
          <Typography>5H 30</Typography>
          <Typography>Direct</Typography>
          <Typography>BDT 61984</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendFilter;
