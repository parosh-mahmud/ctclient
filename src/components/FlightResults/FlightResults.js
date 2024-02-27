// FlightResults.js
import React, { useEffect, useState } from 'react';
import { Box, Grid,   useMediaQuery, useTheme } from '@mui/material';

import LayoutPage from '../../pages/LayoutPage';
import FlightCard from './FlightCard';
import { useDispatch, useSelector } from 'react-redux';
// import { setSearchID, setSelectedResultID } from '../../redux/reducers/flightSlice';
import { setSearchID, selectSearchID, selectResults } from '..//../redux/reducers/flightSliceNew';
import FilterByDate from '../filterComponent/FilterByDate';
import { selectFlightSearchData } from '../../redux/reducers/flightSlice';
import FilterComponent from '../filterComponent/FilterComponent';
import SearchForm from '../FlightSearch/SearchForm';
import RecommendFilter from '../filterComponent/RecommendFilter';
import { fetchFlightResults } from '../../redux/reducers/flightSlice';
import { useLocation } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { selectFlightSearchParams } from '../../redux/reducers/flightSlice';





const FlightResults = () => {
  const dispatch = useDispatch();
 const [searchParams, setSearchParams] = useState({});
const [backdropOpen, setBackdropOpen] = useState(false);
const currentSearchParams = useSelector(selectFlightSearchParams);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

const loadingState = useSelector((state) => state.flight.isLoadingFlightData);
const flightSearchData = useSelector(selectFlightSearchData);
console.log(flightSearchData)


 const [showSortedFlights, setShowSortedFlights] = useState(false);
  const [sortedFlights, setSortedFlights] = useState([]);
const location = useLocation();
  const handleSortFlights = (sortedFlights) => {
    setSortedFlights([...sortedFlights]);
    setShowSortedFlights(true);
  };

 const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    
    const updatedSearchParams = {
        ...currentSearchParams, // Use the actual current search parameters
        departureDate: formattedDate,
    };

    dispatch(fetchFlightResults(updatedSearchParams));
};

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramsObject = Object.fromEntries(searchParams.entries());
    if (Object.keys(paramsObject).length > 0) {
      dispatch(fetchFlightResults(paramsObject));
    }
  }, [dispatch, location.search]);





  return (
    <LayoutPage>
      {/* first grid */}
 <Grid container spacing={2} style={{width:'98%',margin:'auto'}}>
 
  <Grid item xs={12}>
    <Box style={{ height: 'auto', padding: "10px" }}>
      {/* First Row with Background Color */}
      <Box sx={{  padding: 2,height:'auto', }}>
        
        {/* Content for the first row */}
       <SearchForm searchButtonLabel="Modify Search" />
      </Box>

      {/* Second Row with Background Color */}
      <Box sx={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: 2, display: 'flex',
        justifyContent: 'center', alignItems:'center',borderRadius:'5px'}}>
        <FilterByDate onDateSelect={handleDateSelect} />
        {/* Content for the second row */}
        
      </Box>
    </Box>
  </Grid>

      {/* Second Grid */}
      <Grid item xs={12} >
        <Grid container spacing={2}>
          {/* First Grid within the Second Grid */}
          <Grid item  xs={isMobile ? 12 : 9} >
            <Box style={{ height: '100%', padding: 16 }}>
              {/* Content for the first Paper within the Second Grid */}
              
             <Box sx={{width:'100%', minHeight:'36px', backgroundColor: 'rgba(255,255,255,0.5)', border:'1px solid white', borderRadius:'5px'}}>
  {/* Content for filter Flight */}
  <FilterComponent/>
</Box>
<Box sx={{ width: '100%',
  display: 'flex', // Ensure flex layout is used
  flexWrap: 'wrap', // Allow items to wrap if needed
  justifyContent: 'center', // Center items horizontally
  alignItems: 'center', // Align items vertically
  marginTop: '10px',
  marginBottom: '5px',
  backgroundColor: 'rgba(255,255,255,0.5)',
  border: '1px solid white',
  borderRadius: '5px',}}>
  <RecommendFilter flightDataArray={flightSearchData.Results} onSortFlights={handleSortFlights} />
</Box>

            <Box style={{ marginTop: '10px' }}>
   {/* Iterate over flight results */}
               {showSortedFlights ? (
                  // Display sorted flights when showSortedFlights is true
                  sortedFlights.map((flight, index) => (
                    <div key={flight.ResultID}>
                      <FlightCard flightData={flight} availability={flight.Availabilty} isLoading={loadingState} />
                      {index < sortedFlights.length - 1 && <hr style={{ margin: '10px 0' }} />}
                    </div>
                  ))
                ) : (
                  // Display unsorted flights when showSortedFlights is false
                  flightSearchData?.Results && flightSearchData.Results.map((flight, index) => (
                    <div key={flight.ResultID}>
                      <FlightCard 
                      flightData={flight} 
                      availability={flight.Availabilty} 
                      isLoading={loadingState} 
                      onFetchingStart={() => setBackdropOpen(true)} // Function to open the backdrop
                      onFetchingComplete={() => setBackdropOpen(false)}
                      />
                      {index < flightSearchData.Results.length - 1 && <hr style={{ margin: '10px 0' }} />}
                    </div>
                  ))
                )}
</Box>

            </Box>
            
          </Grid>

          {/* Second Grid within the Second Grid */}
          <Grid item xs={false} sm={false}>
            <Box style={{ height: '100%', padding: 16 }}>
              {/* Content for the second Paper within the Second Grid */}
              Show ad here
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
     <Backdrop
  sx={{
    color: '#fff',
    zIndex: (theme) => theme.zIndex.drawer + 1,
    position: 'fixed', // Ensures it's positioned relative to the viewport
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh'
  }}
  open={backdropOpen}
>
  <CircularProgress color="inherit" />
</Backdrop>
    </LayoutPage>
  );
};

export default FlightResults;
