import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const recommendedBoxStyle = {
  width: '100%', // Adjusted for better responsiveness
  height: 'auto',
  // backgroundColor: 'rgba(255,255,255,0.5)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '5px',
  flexDirection: {
    xs: 'row', // Ensure row layout on extra small devices
    sm: 'row', // Keep row layout for devices wider than the sm breakpoint
  },
  gap: 2, // Consistent gap for simplicity
};

const boxStyle = {
  width: {
    xs: '100%', // Adjust as necessary for full width on small screens
    sm: '280px', // Fixed width on larger screens
  },
  height: 'auto',
  backgroundColor: 'rgba(255,255,255,0.5)',
  border: '1px solid gray',
  borderRadius: '5px',
  cursor: 'pointer',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
};

const headingTextStyle = {
  fontWeight: '',
};

const typographyStyle = {
  display: {
    xs: 'none', // Hide on extra small devices
    sm: 'block', // Show on devices wider than the sm breakpoint
  },
};



const RecommendFilter = ({ flightDataArray, onSortFlights }) => {
  const [sortedFlights, setSortedFlights] = useState([...flightDataArray]);
  const [activeBox, setActiveBox] = useState('recommended');

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
    setActiveBox('fastest'); // Update active box state here
  };

 const handleSortByBaseFare = () => {
    const sortedByBaseFare = [...flightDataArray].sort((a, b) => {
      const baseFareA = parseInt(a.Fares[0].BaseFare);
      const baseFareB = parseInt(b.Fares[0].BaseFare);
      return baseFareA - baseFareB;
    });
    onSortFlights(sortedByBaseFare);
    setActiveBox('cheapest'); // Update active box state here
  };

const getBoxStyle = (boxName) => ({
    ...boxStyle,
    backgroundColor: activeBox === boxName ? '#1565C0' : 'rgba(255,255,255,0.5)',
    border: activeBox === boxName ? '1px solid blue' : '1px solid gray',
    transform: activeBox === boxName ? 'scale(1)' : 'scale(0.9)',
    boxShadow: activeBox === boxName ? '0px 4px 4px rgba(0, 0, 0, 0.2)' : 'none',
    color: activeBox === boxName ? 'white' : 'black',
  });

  return (
    <Box sx={{...recommendedBoxStyle, flexDirection: 'row'}}>
      <Box onClick={() => setActiveBox('recommended')} sx={getBoxStyle('recommended')}>
        <Box sx={headingTextStyle}>Recommended</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Typography sx={typographyStyle}>5H 30</Typography>
          <Typography sx={typographyStyle}>Direct</Typography>
          <Typography sx={typographyStyle}>BDT 61984</Typography>
        </Box>
      </Box>
      <Box onClick={handleSortByBaseFare} sx={getBoxStyle('cheapest')}>
        <Box sx={headingTextStyle}>Cheapest</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Typography sx={typographyStyle}>5H 30</Typography>
          <Typography sx={typographyStyle}>Direct</Typography>
          <Typography sx={typographyStyle}>BDT 61984</Typography>
        </Box>
      </Box>
      <Box onClick={handleSortByDuration} sx={getBoxStyle('fastest')}>
        <Box sx={headingTextStyle}>Fastest</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Typography sx={typographyStyle}>5H 30</Typography>
          <Typography sx={typographyStyle}>Direct</Typography>
          <Typography sx={typographyStyle}>BDT 61984</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendFilter;
