import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgba(255,255,255,0.5)",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  content: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  firstRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  secondRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  thirdRow: {
    display: "flex",
    justifyContent: "",
    flexDirection: "column",
    marginBottom: theme.spacing(1),
  },
  fourthRow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  fullButton: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonText: {
    flex: 1,
    textAlign: "left",
  },
  firstBox: {
    width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  cityName: {
    color: theme.palette.primary.main,
  },
  nestedBoxes: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  nestedBox: {
    width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  secondBox: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      marginTop: 0,
    },
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(1),
    textAlign: "right",
    "&:hover": {
      // Add hover state
      backgroundColor: "#0056e0", // Darker blue on hover
    },
    [theme.breakpoints.down("sm", "xs")]: {
      padding: theme.spacing(0.5),
      fontSize: "0.75rem",
      width: "90%",
      padding: "6px 8px",

      margin: "0 auto",
    },
  },
  [theme.breakpoints.up("sm")]: {
    container: {
      flexDirection: "row",
    },
    nestedBoxes: {
      flexDirection: "row",
    },
    nestedBox: {
      width: "50%",
      margin: theme.spacing(0, 1),
    },
    firstBox: {
      width: "90%",
    },
    secondBox: {
      width: "10%",
    },
  },
}));

export default useStyles;
