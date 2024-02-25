import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import CityLogoSvg from "../../assets/logos/headerlogo.svg";
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    color: 'white',
    width: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  navLink: {
    color: 'gray',
    
    
    '&:hover': {
      color: 'white',
      
    },
    marginRight: theme.spacing(2), // Adjust spacing between links
    marginBottom: theme.spacing(1), // Adds spacing below each link for better visual separation
  },
  logo: {
    width: '96px',
    height: '48px',
    marginBottom: theme.spacing(2), // Adds some space below the logo
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Box sx={{
      // backgroundColor: 'rgba(255,255,255,0.5)',
      color: 'white',
      width: '100%',
      pt: 2, // theme.spacing(2)
      pb: 2, // theme.spacing(2)
      height:'24px'
    }}>
      <Container>
        <Grid container direction="column" alignItems="flex-start">
          <Grid item>
            {/* <img src={CityLogoSvg} sx={{ width: '96px', height: '48px', mb: 2 }} alt="Logo" /> */}
            <Typography color="black">
              © Copyrights The City Flyers 2024
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="flex-start">
              {["Home", "Help center", "Terms & conditions", "Privacy policy", "Cookie policy", "Refund policy", "News & media", "Become an investor", "Contact us"].map((link, index) => (
                <Link 
                  key={index}
                  href="#" 
                  sx={{
                    color: 'black',
                    '&:hover': {
                      color: 'white',
                    },
                    mr: 2, // marginRight with theme.spacing(2)
                    mb: 1, // marginBottom with theme.spacing(1), ensures separation between rows when wrapped
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
