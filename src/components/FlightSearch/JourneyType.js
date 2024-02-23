import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import SearchForm from './SearchForm';

const Oneway = () => {
  const [journeyType, setJourneyType] = useState('1'); // Initialize with '1' for One Way

  const handleJourneyTypeChange = (event) => {
    setJourneyType(event.target.value);
  };

  return (
    <div>
      {/* One way, Return, Multicity */}
      <FormControl component="fieldset">
        <RadioGroup 
          aria-label="journeyType" 
          name="journeyType" 
          value={journeyType} 
          onChange={handleJourneyTypeChange}
        >
          <FormControlLabel value="1" control={<Radio />} label={<Typography variant="body1">One Way</Typography>} />
          <FormControlLabel value="2" control={<Radio />} label={<Typography variant="body1">Return</Typography>} />
          <FormControlLabel value="3" control={<Radio />} label={<Typography variant="body1">Multicity</Typography>} />
        </RadioGroup>
      </FormControl>

      {/* Pass journeyType as a prop to SearchForm */}
    </div>
  );
};

export default Oneway;
