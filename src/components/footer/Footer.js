import React from 'react';
import { Box, Typography, Link, Grid, Divider, Container } from '@mui/material';
import CityLogoSvg from "../../assets/logos/headerlogo.svg";
const Footer = () => {
  const linkStyle = {
    display: 'block', // Makes link take its own line
    height: '30px', // Fixed height for each link
    lineHeight: '30px', // Centers text vertically
    color: 'inherit',
    textDecoration: 'none', // Removes underline from links
    '&:hover': {
      textDecoration: 'underline', // Adds underline on hover
    },
  };

  const textStyle = {
    marginY: '4px', // Adds vertical margin for spacing between text lines
  };

  return (
    <Box bgcolor="gray.200" py={4} mt={5}>
      <Container>
        <Grid container justifyContent="space-between" spacing={2}>
          
          <Grid item xs={12} sm={4} sx={{justifyContent:'flex-start',alignItems:'initial'}}>
             <img src={CityLogoSvg} style={{ width: '96px', height: '48px' }} alt="Logo" />
            <Link href="#" sx={linkStyle}>About Us</Link>
            <Link href="#" sx={linkStyle}>Talent & Culture</Link>
            <Link href="#" sx={linkStyle}>News & Media</Link>
            <Link href="#" sx={linkStyle}>Become an Investor</Link>
            <Link href="#" sx={linkStyle}>Contact Us</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>Need Help?</Typography>
            <Link href="#" sx={linkStyle}>Help Center</Link>
            <Typography sx={textStyle}>Knock us on Whatsapp anytime</Typography>
            <Typography sx={textStyle}>or Call our Hotline (10AM - 10PM).</Typography>
            <Link href="mailto:info@Cityflyers.com" sx={linkStyle}>info@Cityflyers.com</Link>
            <Link href="tel:+88096******" sx={linkStyle}>01730596121</Link>
          </Grid>
        </Grid>
        <Divider my={4} />
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2">&copy; {new Date().getFullYear()} Cityflyers</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
