import React, { useState } from 'react';
import { Avatar, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import EditIcon from '@mui/icons-material/Edit';
import SidebarMenu from './SidebarMenu';
import EditProfile from './EditProfile';
import LayoutPage from '../../pages/LayoutPage';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(2),
  },
  paper: {
    display: 'flex',
    width: '80%',
    height: '90%',
    borderRadius: theme.spacing(2),
  },
  leftPane: {
    backgroundColor: 'lightgray',
    padding: theme.spacing(2),
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
    maxHeight: '90vh',
  },
  rightPane: {
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
    width: '80%',
    borderRadius: '0 16px 16px 0',
    overflowY: 'auto',
  },
  listItem: {
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
  },
  selectedListItem: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
  },
  userInfo: {
    marginBottom: theme.spacing(2),
  },
  editButton: {
    marginTop: theme.spacing(2),
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialProfile, setInitialProfile] = useState({
  firstName: 'Anushka',
  lastName: 'Bansal',
  email: 'example@mail.com',
  phone: '+1234567890',
  dateofbirth: new Date(2000, 1, 1)
  // Add other fields as necessary
});
const handleSave = (updatedProfile) => {
    console.log(updatedProfile);
    setIsEditMode(false);
    // Here you would typically update the profile information in your backend
  };
  return (
    <LayoutPage>
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.leftPane}>
          <img  style={{height:"150px", width:"150px", borderRadius:'50%'}} src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" className={classes.avatar} />
          <Typography variant="h5" fontWeight="bold">Anushka Bansal</Typography>
          <Typography variant="subtitle1">example@mail.com</Typography>
          <Button onClick={() => setIsEditMode(!isEditMode)} variant="contained" color="primary" className={classes.editButton} startIcon={<EditIcon />}>
            Edit Profile
          </Button>
          <List component="nav">
           <SidebarMenu/>
          </List>
          
        </div>
        <div className={classes.rightPane}>
{isEditMode ? (
            <EditProfile
              initialProfile={initialProfile}
              onSave={handleSave}
              onCancel={() => setIsEditMode(false)}
            />
          ) : (
            // Display user information here when not in edit mode
            <div>
             <Typography variant="h4" gutterBottom>Profile</Typography>
          <Typography variant="h6" gutterBottom>General Information</Typography>
          
          <Typography className={classes.userInfo}><strong>Email:</strong> example@mail.com</Typography>
          <Typography className={classes.userInfo}><strong>First Name:</strong> Anushka</Typography>
          <Typography className={classes.userInfo}><strong>Last Name:</strong> Bansal</Typography>
          <Typography className={classes.userInfo}><strong>Phone:</strong> +1234567890</Typography>
          <Typography className={classes.userInfo}><strong>Nickname:</strong> Anu</Typography>
          <Typography className={classes.userInfo}><strong>Date of Birth:</strong> Jan 1, 1990</Typography>
          <Typography className={classes.userInfo}><strong>Gender:</strong> Female</Typography>
          <Typography className={classes.userInfo}><strong>Country:</strong> Country Name</Typography>
          <Typography className={classes.userInfo}><strong>City:</strong> City Name</Typography>
          <Typography className={classes.userInfo}><strong>Address:</strong> Address Line</Typography>
          <Typography className={classes.userInfo}><strong>Postcode:</strong> 123456</Typography>
         </div>
          )}

         
        </div>
      </Paper>
    </div>
    </LayoutPage>
  );
};

export default ProfilePage;
