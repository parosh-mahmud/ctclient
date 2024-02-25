import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, ButtonBase, useMediaQuery, useTheme } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import RampRightIcon from '@mui/icons-material/RampRight';
import AirlinesIcon from '@mui/icons-material/Airlines';

const FilterComponent = () => {
 const theme = useTheme();
  const matchesSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [filters, setFilters] = useState({
    takeOff: 'Take Off',
    priceRange: 'Price Range',
    refundable: 'Refundable',
    layover: 'Layover',
    airline: 'Airline',
  });
const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', // Allow items to wrap on small screens
  };
const buttonStyle = {
    margin: matchesSmallScreen ? '5px' : '0 5px', // Adjust margin on small screens
  };

  const textStyle = {
    marginLeft: 4,
    marginRight: 4,
    fontSize: matchesSmallScreen ? '0.875rem' : '1rem', // Adjust font size on small screens
  };

  const [anchorEl, setAnchorEl] = useState({
    takeOff: null,
    priceRange: null,
    refundable: null,
    layover: null,
    airline: null,
  });

  const handleClick = (event, type) => {
    setAnchorEl({ ...anchorEl, [type]: event.currentTarget });
  };

  const handleClose = (option, type) => {
    setAnchorEl({ ...anchorEl, [type]: null });
    setFilters({ ...filters, [type]: option });
  };

  // Map of icons for each filter type
  const filterIcons = {
    takeOff: <AccessTimeIcon />,
    priceRange: <LocalOfferIcon />,
    refundable: <PriceCheckIcon />,
    layover: <RampRightIcon />,
    airline: <AirlinesIcon />,
  };

  // Menu items for each filter type
  const menuOptions = {
    takeOff: ['Earlier Flight', 'Later Flight'],
    priceRange: ['Cheapest', 'Highest'],
    refundable: ['Refundable', 'Non Refundable'],
    layover: ['Maximum', 'Minimum'],
    airline: ['Airline 1', 'Airline 2'], // Add more airline options as needed
  };

  return (
    <div style={boxStyle}>
      <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TuneIcon />
      </Box>

      {Object.keys(filters).map((filterType) => (
        <Box key={filterType} style={buttonStyle}>
          <ButtonBase onClick={(e) => handleClick(e, filterType)}>
            {filterIcons[filterType]}
            <Typography variant="body1" style={textStyle}>
              {filters[filterType]}
            </Typography>
            <ArrowDropDownIcon />
          </ButtonBase>
          <Menu
            anchorEl={anchorEl[filterType]}
            open={Boolean(anchorEl[filterType])}
            onClose={() => handleClose(filters[filterType], filterType)}
          >
            {menuOptions[filterType].map((option) => (
              <MenuItem key={option} onClick={() => handleClose(option, filterType)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ))}

      <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>More Filters</Typography>
        <ArrowDropDownIcon />
      </Box>
    </div>
  );
};

export default FilterComponent;
