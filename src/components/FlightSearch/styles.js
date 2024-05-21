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

  gridContainer: {
    backgroundColor: "rgba(255,255,255,0.5)",
    overflow: "hidden",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    margin: "0",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },

  paperStyle: {
    paddingLeft: "10px",
    margin: 0,
    display: "flex",
    alignItems: "center",
  },

  airportBox: {
    border: "1px solid #0067FF",
    width: "calc(50% - 20px)",
    height: "96px",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "5px",
  },

  airportLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  airportInfo: {
    marginLeft: "10px",
  },

  airportCode: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#212F3C",
  },

  airportName: {
    fontSize: "13px",
  },

  swapIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    position: "relative",
    zIndex: 1,
    cursor: "pointer",
  },

  dateBox: {
    border: "1px solid #0067FF",
    width: "50%",
    height: "96px",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  dateInfo: {
    marginLeft: "10px",
    textAlign: "left",
  },

  date: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  dayOfWeek: {
    fontSize: "13px",
  },

  dateIcon: {
    fontSize: "24px",
  },

  travelerBox: {
    width: "100%",
    height: "96px",
    cursor: "pointer",
    border: "1px solid #0067FF",
    borderRadius: "5px",
    boxSizing: "border-box",
    flexWrap: "wrap",
  },

  travelerInfo: {
    marginLeft: "10px",
  },

  travelerCount: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  travelClass: {
    fontSize: "13px",
    fontStyle: "italic",
    fontWeight: "bold",
  },

  popoverContent: {
    padding: 20,
    minWidth: 200,
    boxSizing: "border-box",
  },

  travelerSelector: {
    marginBottom: 10,
  },
}));

export default useStyles;
