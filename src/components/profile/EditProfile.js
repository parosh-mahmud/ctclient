import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, Divider } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const EditProfile = ({ initialProfile, onSave, onCancel }) => {
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <Box>
        {/* <Typography>Update profile information</Typography> */}
       <Divider sx={{ margin: '20px 0', alignItems: 'center', display: 'flex' }}>
  <Typography sx={{
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    color: '#1976d2',
    fontWeight: 'bold',
    marginRight: '10px',
    backgroundColor: '#fff',
    padding: '0 10px',
    textTransform:'uppercase',
    
  }}>
    Update profile informations
  </Typography>
</Divider>
       <Grid container spacing={2}>
        
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Phone Number"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </Grid>
        {/* Repeat the pattern for other fields */}
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Date of Birth"
            name="dateofbirth"
            value={profile.dateofbirth}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Gender"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Country"
            name="country"
            value={profile.country}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Postal Code"
            name="postcode"
            value={profile.postcode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            fullWidth
            label="Address"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      {/* Repeat for other fields like lastName, email, phone, etc. */}

      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={() => onSave(profile)}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
