import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Checkbox,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchAirPreBookResults } from "../../redux/slices/airPreBookSlice";
import { selectSearchIDResultID } from "../../redux/slices/searchIDResultIDSlice";
import { useHistory } from "react-router-dom";
import { setPassengerDetails } from "../../redux/slices/passengerDetailsSlice";
import { selectAirPriceData } from "../../redux/slices/airPriceSlice";
import FlightCard from "../FlightResults/FlightCard";
import AirPriceShow from "./AirPriceShow";
import LayoutPage from "../../pages/LayoutPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { selectFlightSearchParams } from "../../redux/reducers/flightSlice";

const AirPreBookForm = () => {
  const { searchId, resultId } = useSelector(selectSearchIDResultID);
  console.log(searchId, resultId);
  const [showPassportFields, setShowPassportFields] = useState(true);
  const airPriceData = useSelector(selectAirPriceData);
  const flightData = airPriceData?.Results?.[0];
  const segment = flightData?.segments?.[0];
  const segmentReturn = flightData?.segments?.[1];
  const passenger = useSelector(selectFlightSearchParams);
  const totalPassengers =
    passenger.AdultQuantity +
    passenger.ChildQuantity +
    passenger.InfantQuantity;
  const [formData, setFormData] = useState({
    passengers: Array(totalPassengers)
      .fill()
      .map(() => ({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: null,
        passportNumber: "",
        dateOfExpiry: "",
        nationality: "",
        email: "",
        phoneNumber: "",
        address: "",
      })),
    fareRulesChecked: false,
    termsAndConditionsChecked: false,
  });

  useEffect(() => {
    setFormData((currentData) => ({
      ...currentData,
      passengers: Array(totalPassengers)
        .fill()
        .map(() => ({
          firstName: "",
          lastName: "",
          gender: "",
          dateOfBirth: "",
          passportNumber: "",
          dateOfExpiry: "",
          nationality: "",
          email: "",
          phoneNumber: "",
          address: "",
        })),
    }));
  }, [totalPassengers]);

  const handleInputField = (index, field, value) => {
    const updatedPassengers = formData.passengers.map((passenger, idx) => {
      if (idx === index) {
        return { ...passenger, [field]: value };
      }
      return passenger;
    });

    setFormData({ ...formData, passengers: updatedPassengers });
  };

  const passengerTypes = [];

  for (let i = 0; i < passenger.AdultQuantity; i++) {
    passengerTypes.push("Adult");
  }
  for (let i = 0; i < passenger.ChildQuantity; i++) {
    passengerTypes.push("Child");
  }
  for (let i = 0; i < passenger.InfantQuantity; i++) {
    passengerTypes.push("Infant");
  }

  const originCode =
    airPriceData?.Results?.[0]?.segments?.[0]?.Origin?.Airport?.AirportCode;
  const destinationCode =
    airPriceData?.Results?.[0]?.segments?.[0]?.Destination?.Airport
      ?.AirportCode;

  const excludedAirports = [
    "DAC",
    "CGP",
    "ZYL",
    "CXB",
    "JSR",
    "RJH",
    "BZL",
    "SPD",
  ];

  useEffect(() => {
    if (
      excludedAirports.includes(originCode) &&
      excludedAirports.includes(destinationCode)
    ) {
      setShowPassportFields(false);
    } else {
      setShowPassportFields(true);
    }
  }, [originCode, destinationCode, excludedAirports]);

  const [gender, setGender] = useState("");
  const dispatch = useDispatch();

  const history = useHistory();

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
  };

  const handleDateOfBirthChange = (index, date) => {
    handleInputField(index, "dateOfBirth", date);
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const formatFormDataForRequest = () => {
    const formattedPassengers = formData.passengers.map((p, index) => ({
      Title: p.gender === "male" ? "Mr" : "Ms",
      FirstName: p.firstName,
      LastName: p.lastName,
      PaxType: passengerTypes[index],
      DateOfBirth: p.dateOfBirth ? p.dateOfBirth.format("YYYY-MM-DD") : null,
      Gender: p.gender.charAt(0).toUpperCase() + p.gender.slice(1),
      Address1: p.address,
      CountryCode: "BD",
      Nationality: "BD",
      ContactNumber: p.phoneNumber,
      Email: p.email,
      IsLeadPassenger: index === 0,
    }));

    const requestData = {
      SearchID: searchId,
      ResultID: resultId,
      Passengers: formattedPassengers,
    };

    console.log("Formatted Request Data:", requestData);
    return requestData;
  };

  const handleContinue = async () => {
    try {
      const updatedFormData = formatFormDataForRequest();
      await dispatch(fetchAirPreBookResults(updatedFormData));
      dispatch(setPassengerDetails(updatedFormData));
      history.push("/airbook");
    } catch (error) {
      console.error("Error dispatching thunk action:", error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LayoutPage>
      <Grid
        container
        justifyContent="center"
        alignItems="flex-start"
        style={{ marginTop: "30px", padding: "20px" }}
        spacing={4}
      >
        {/* Main content area (first and second column stacked) */}
        <Grid item xs={12} md={8} container direction="column" spacing={2}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography fontSize={20} fontWeight="bold">
                Flight Summary
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12}>
                {segment && (
                  <FlightCard
                    flightData={{ segments: [segment] }}
                    showActions={false}
                  />
                )}
                {segmentReturn && (
                  <>
                    <hr />
                    <FlightCard
                      flightData={{ segments: [segmentReturn] }}
                      showActions={false}
                    />
                  </>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography fontSize={20} fontWeight="bold">
                Enter Traveler Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12}>
                {formData.passengers.map((p, index) => (
                  <Accordion key={index} defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                    >
                      <Typography fontSize={16} fontWeight="bold">
                        Passenger {index + 1}{" "}
                        <Box
                          component="span"
                          sx={{
                            display: "inline-block",
                            marginLeft: "8px",
                            padding: "4px 8px",
                            borderRadius: "12px",
                            backgroundColor: "#e0e0e0", // Gray background
                          }}
                        >
                          {passengerTypes[index]}
                        </Box>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            value={p.firstName}
                            onChange={(e) =>
                              handleInputField(
                                index,
                                "firstName",
                                e.target.value
                              )
                            }
                            placeholder="Enter first name"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            value={p.lastName}
                            onChange={(e) =>
                              handleInputField(
                                index,
                                "lastName",
                                e.target.value
                              )
                            }
                            placeholder="Enter last name"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                              row
                              aria-label="gender"
                              name="gender"
                              value={p.gender}
                              onChange={(e) =>
                                handleInputField(
                                  index,
                                  "gender",
                                  e.target.value
                                )
                              }
                            >
                              <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                              />
                              <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              fullWidth
                              value={formData.passengers[index].dateOfBirth}
                              onChange={(date) =>
                                handleDateOfBirthChange(index, date)
                              }
                              label="Date of Birth"
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                        {showPassportFields && (
                          <>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Passport Number"
                                variant="outlined"
                                value={p.passportNumber}
                                onChange={(e) =>
                                  handleInputField(
                                    index,
                                    "passportNumber",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter passport number"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Date of Passport Expiry"
                                variant="outlined"
                                value={p.dateOfExpiry}
                                onChange={(e) =>
                                  handleInputField(
                                    index,
                                    "dateOfExpiry",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter date of expiry"
                              />
                            </Grid>
                          </>
                        )}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Nationality"
                            variant="outlined"
                            value={p.nationality}
                            onChange={(e) =>
                              handleInputField(
                                index,
                                "nationality",
                                e.target.value
                              )
                            }
                            placeholder="Enter nationality"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={p.email}
                            onChange={(e) =>
                              handleInputField(index, "email", e.target.value)
                            }
                            placeholder="Enter email address"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            value={p.phoneNumber}
                            onChange={(e) =>
                              handleInputField(
                                index,
                                "phoneNumber",
                                e.target.value
                              )
                            }
                            placeholder="Enter phone number"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Address"
                            variant="outlined"
                            value={p.address}
                            onChange={(e) =>
                              handleInputField(index, "address", e.target.value)
                            }
                            placeholder="Enter address"
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Box sx={{ padding: "20px" }}>
            <Checkbox
              checked={formData.fareRulesChecked}
              onChange={(e) =>
                handleCheckboxChange("fareRulesChecked", e.target.checked)
              }
            />
            <Typography sx={{ display: "inline", marginLeft: "10px" }}>
              I have read and understood the Fare Rules
            </Typography>
            <br />
            <Checkbox
              checked={formData.termsAndConditionsChecked}
              onChange={(e) =>
                handleCheckboxChange(
                  "termsAndConditionsChecked",
                  e.target.checked
                )
              }
            />
            <Typography sx={{ display: "inline", marginLeft: "10px" }}>
              I have read and agreed to the Terms and Conditions
            </Typography>
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinue}
              sx={{ marginTop: "20px" }}
            >
              Continue
            </Button>
          </Box>
        </Grid>

        {/* Additional content to the right */}
        <Grid item xs={12} md={4}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography fontSize={20} fontWeight="bold">
                Price Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AirPriceShow />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </LayoutPage>
  );
};

export default AirPreBookForm;
