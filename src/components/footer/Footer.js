import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import CityLogoSvg from "../../assets/logos/headerlogo.svg";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "white",
    width: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  navLink: {
    color: "#0067FF",

    "&:hover": {
      color: "white",
    },
    marginRight: theme.spacing(2), // Adjust spacing between links
    marginBottom: theme.spacing(1), // Adds spacing below each link for better visual separation
  },
  logo: {
    width: "96px",
    height: "48px",
    marginBottom: theme.spacing(2), // Adds some space below the logo
  },
}));

const links = [
  { name: "Home", path: "/", internal: true },
  { name: "Help center", path: "/", internal: true },
  { name: "Refund Policy", path: "/refund-policy", internal: true },
  { name: "Privacy Policy", path: "/privacy-policy", internal: true },
  { name: "Terms & conditions", path: "/terms-conditions", internal: true },
  { name: "Cookie policy", path: "/", internal: true },
  { name: "News & media", path: "/", internal: true },
  { name: "Become and investor", path: "/", internal: true },
  { name: "Contact us", path: "/", internal: true },
  // { name: "External Site", path: "https://external.com", internal: false },
  //  Help center | Terms & conditions | Privacy policy | Cookie policy | Refund policy | News & media | Become an investor | Contact us
];

export default function Footer() {
  const classes = useStyles();

  return (
    <Box
      sx={{
        // backgroundColor: 'rgba(255,255,255,0.5)',
        color: "#0067FF",
        width: "100%",
        pt: 2, // theme.spacing(2)
        pb: 2, // theme.spacing(2)
        height: "24px",
      }}
    >
      <Container>
        <Grid container direction="column" alignItems="center">
          <Grid item justifyContent="center" alignItems="center">
            {/* <img src={CityLogoSvg} sx={{ width: '96px', height: '48px', mb: 2 }} alt="Logo" /> */}
            <Typography
              sx={{
                color: "#0067FF",
                "&:hover": { color: "#2F81F7" },
                mr: 2,
                mb: 1,
                fontSize: "15px",
                textDecoration: "none",
                fontVariant: "contextual",
              }}
            >
              © Copyrights The City Flyers 2024
            </Typography>
          </Grid>
          <Grid item>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              alignItems="flex-start"
            >
              {links.map((link, index) =>
                link.internal ? (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: "#0067FF",
                      "&:hover": { color: "#2F81F7" },
                      mr: 2,
                      mb: 1,
                      fontSize: "15px",
                      textDecoration: "none",
                      fontVariant: "contextual",
                    }}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    key={index}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "#0067FF",
                      "&:#2F81F7": { color: "white" },
                      mr: 2,
                      mb: 1,
                      fontSize: "20px",
                    }}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
