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
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  margin: "0",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px",
};

export const paperStyle = {
  paddingLeft: "10px",
  margin: 0,
  display: "flex",
  alignItems: "center",
};

export default useStyles;
