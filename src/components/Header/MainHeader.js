import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// import ProductSansBoldItalic from '..//../assets/fonts/ProductSansBoldItalic'
import CityLogo from "../../assets/logos/CityLogo.png";
import CityLogoSvg from "../../assets/logos/headerlogo.svg";
import { Grid } from "@mui/material";
import { useAuthCont } from "../auth/AuthContext";
import { useAuth, auth } from "../../firebaseconfig";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getAuth, signOut } from "firebase/auth";

const pages = [
  { label: "Home", link: "/" },
  { label: "Offers", link: "/offers" },

  { label: "Travel Guides", link: "/travelGuides" },

  { label: "News & Media", link: "/news" },
  { label: "Blog", link: "/blog" },
  { label: "FAQ", link: "/faq" },
  // ... (add other pages with their corresponding routes)
];

const DashBoardHeader = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { currentUser } = useAuthCont(); // Add this line to get the current user and sign out function
  const auth = getAuth();
  console.log(currentUser);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Use the signOut function from the useAuth hook
      console.log("User signed out successfully");
      localStorage.removeItem("userInfo");
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(255,255,255,0.5)",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "background-color 0.3s, box-shadow 0.3s",
        height: "48px",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                margin: "0",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#0067FF",
                textDecoration: "none",
              }}
            >
              <img
                src={CityLogoSvg}
                style={{ width: "96px", height: "48px" }}
                alt="Logo"
              />
            </Typography>
          </div>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerClose}
            sx={{
              width: 200,
              flexShrink: 0,
              display: { xs: "block", md: "none" },
            }}
          >
            <List>
              {pages.map((page) => (
                <ListItem
                  button
                  key={page.label}
                  onClick={handleDrawerClose}
                  component={Link}
                  to={page.link}
                >
                  <ListItemText primary={page.label} />
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Grid
            container
            item
            xs={12}
            md={10}
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            {pages.map((page) => (
              <Grid item key={page.label}>
                <Button
                  variant="text"
                  component={Link}
                  to={page.link}
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "black",
                    display: { xs: "none", md: "block" }, // Hide on mobile, show on desktop
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontFamily: "Google Sans, Arial, sans serif",
                      fontWeight: "550",
                      color: "#212F3C",
                    }}
                  >
                    {page.label}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
          {/* Conditionally render the user avatar with dropdown based on the currentUser */}
          {currentUser ? (
            <>
              <Box
                onClick={handleAvatarClick}
                sx={{
                  cursor: "pointer",
                  width: 32,
                  height: 32,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar>
                  {/* You can display the user's initials or profile picture */}
                  {currentUser.displayName
                    ? currentUser.displayName[0].toUpperCase()
                    : ""}
                </Avatar>
                <KeyboardArrowDownIcon />
              </Box>

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleAvatarClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box>
                  <Button
                    sx={{ textTransform: "capitalize" }}
                    onClick={handleAvatarClose} // Close the popover when navigating
                    component={Link}
                    to="/profile" // Update this path to your profile page's route
                    fullWidth
                  >
                    Profile
                  </Button>
                  <Button
                    sx={{ textTransform: "capitalize" }}
                    onClick={handleSignOut} // Keep the sign out logic as is
                    fullWidth
                  >
                    Sign Out
                  </Button>
                </Box>
              </Popover>
            </>
          ) : (
            // If the user is not logged in, show the Sign In button
            <Button
              variant="contained"
              component={Link}
              to="/signin"
              sx={{
                width: { xs: "auto", sm: 120 }, // Adjusts width based on screen size
                padding: "6px 12px", // Adjust padding to control height and maintain text alignment
                fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Responsive font size
                color: "white",
                textTransform: "capitalize", // Capitalizes the button text
                display: "block", // Ensures the button is always displayed
                mx: "auto", // Centers the button on smaller screens
                backgroundColor: "#0067FF",
                whiteSpace: "nowrap", // Prevents the text from wrapping
                overflow: "hidden", // Keeps the content within the button
                textOverflow: "ellipsis", // Adds an ellipsis if the text overflows
                fontFamily: "Google Sans ",
              }}
            >
              Sign In
            </Button>
          )}
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DashBoardHeader;
