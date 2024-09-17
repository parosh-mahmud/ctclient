import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  popover: {
    background: "transparent !important",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    minWidth: "300px",
    transition: "opacity 0.3s ease-in-out",
    opacity: 1,
    "&:hover": {
      opacity: 1,
    },
  },
  searchButton: {
    position: "relative",
    top: "-30px",
    zIndex: 1,
    width: "20%",
    height: "60px",
    textTransform: "capitalize",
    backgroundColor: "#0067FF",
    fontWeight: "bold",
    fontSize: "22px !important",
    ["@media (max-width:600px)"]: {
      fontSize: "16px",
    },
  },
  input: {
    width: "100%",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5),
    border: "1px solid #ccc",
    borderRadius: theme.spacing(0.5),
  },
  airportItem: {
    cursor: "pointer",
    backgroundColor: "rgba(255,255,255,0.5)",
    marginBottom: theme.spacing(1),
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export const gridContainerStyle = {
  backgroundColor: "rgba(255,255,255,0.5)",
  overflow: "hidden",
  // boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  margin: "0",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
  justifyContent: "center",
};

export const paperStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  border: "1px solid #E5E7EB",
  width: "100%",
  position: "relative",
};

export const boxStyle = {
  cursor: "pointer",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "10px",
  height: "96px",
};

export const swapIconStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  background: "#fff",
  border: "1px solid #E5E7EB",
  borderRadius: "50%",
  boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
};

export const typographyPadding = {
  paddingLeft: "20px",
};

export default useStyles;
