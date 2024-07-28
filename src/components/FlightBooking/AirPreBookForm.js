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
import dayjs from "dayjs";
import { setPassengerDetails } from "../../redux/slices/passengerDetailsSlice";
import { selectAirPriceData } from "../../redux/slices/airPriceSlice";
import FlightCard from "../FlightResults/FlightCard";
import AirPriceShow from "./AirPriceShow";
import LayoutPage from "../../pages/LayoutPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { selectFlightSearchParams } from "../../redux/reducers/flightSlice";
import { Backdrop, CircularProgress } from "@mui/material";

const AirPreBookForm = () => {
  const { searchId, resultId } = useSelector(selectSearchIDResultID);
  console.log(searchId, resultId);
  const [showPassportFields, setShowPassportFields] = useState(true);
  const airPriceData = useSelector(selectAirPriceData);
  const flightData = airPriceData?.Results?.[0];
  const segment = flightData?.segments?.[0];
  const segmentReturn = flightData?.segments?.[1];
  const passenger = useSelector(selectFlightSearchParams);
  const isLoading = useSelector(
    (state) => state.airPreBook.isLoadingAirPreBookData
  );
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    formData.passengers.forEach((passenger, index) => {
      // First name and last name validation
      if (!passenger.firstName.trim()) {
        tempErrors[`firstName${index}`] = "First name is required";
      }
      if (!passenger.lastName.trim()) {
        tempErrors[`lastName${index}`] = "Last name is required";
      }
      // Email validation with simple regex pattern
      if (
        !passenger.email.trim() ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(passenger.email)
      ) {
        tempErrors[`email${index}`] = "Valid email is required";
      }
      // Phone number validation
      if (!passenger.phoneNumber.trim()) {
        tempErrors[`phoneNumber${index}`] = "Phone number is required";
      }
      // Nationality validation
      if (!passenger.nationality.trim()) {
        tempErrors[`nationality${index}`] = "Nationality is required";
      }
      // Additional validations here
    });

    if (!formData.fareRulesChecked) {
      tempErrors.fareRules = "You must agree to the fare rules";
    }
    if (!formData.termsAndConditionsChecked) {
      tempErrors.termsAndConditions =
        "You must agree to the terms and conditions";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const LoadingBackdrop = ({ open }) => {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        open={open}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2, color: "common.white" }}>
            Loading booking details...
          </Typography>
        </Box>
      </Backdrop>
    );
  };

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
        address: "bd",
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
          dateOfBirth: dayjs("1999-07-03"),
          passportNumber: "",
          dateOfExpiry: "",
          nationality: "Bangldeshi",
          email: "",
          phoneNumber: "",
          address: "BD",
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

    // Immediately clear any errors related to the checkbox when it is checked
    if (checked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null, // Clears the specific error for this checkbox
      }));
    } else {
      // Optionally re-validate if you want to show the error immediately when unchecked
      validateForm();
    }
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
    if (validateForm()) {
      try {
        const updatedFormData = formatFormDataForRequest();
        await dispatch(fetchAirPreBookResults(updatedFormData));
        dispatch(setPassengerDetails(updatedFormData));
        history.push("/airbook");
      } catch (error) {
        console.error("Error dispatching thunk action:", error.message);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LayoutPage>
      <LoadingBackdrop open={isLoading} />
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
                Flight summary
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
                Enter passenger details
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
                            error={!!errors[`firstName${index}`]}
                            helperText={errors[`firstName${index}`]}
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
                            error={!!errors[`lastName${index}`]}
                            helperText={errors[`lastName${index}`]}
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
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                              row
                              aria-label="gender"
                              name={`gender${index}`}
                              value={p.gender}
                              onChange={(e) =>
                                handleInputField(
                                  index,
                                  "gender",
                                  e.target.value
                                )
                              }
                              error={!!errors[`gender${index}`]}
                              helperText={errors[`gender${index}`]}
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
                                <TextField
                                  {...params}
                                  error={!!errors[`dateOfBirth${index}`]}
                                  helperText={errors[`dateOfBirth${index}`]}
                                />
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
                            error={!!errors[`nationality${index}`]}
                            helperText={errors[`nationality${index}`]}
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
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            error={!!errors[`email${index}`]}
                            helperText={errors[`email${index}`]}
                            label="Email"
                            variant="outlined"
                            value={p.email}
                            onChange={(e) =>
                              handleInputField(index, "email", e.target.value)
                            }
                            placeholder="Enter email address"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            error={!!errors[`phoneNumber${index}`]}
                            helperText={errors[`phoneNumber${index}`]}
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
                            fullWidth
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: "20px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.fareRulesChecked}
                    onChange={(e) =>
                      handleCheckboxChange("fareRulesChecked", e.target.checked)
                    }
                    name="fareRulesChecked"
                    color="primary"
                  />
                }
                label={
                  <Typography sx={{ textAlign: "left" }}>
                    I have read and understood the Fare Rules
                  </Typography>
                }
                sx={{ alignSelf: "flex-start" }}
              />
              {errors.fareRules && (
                <Typography color="error" sx={{ ml: 4 }}>
                  {errors.fareRules}
                </Typography>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.termsAndConditionsChecked}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "termsAndConditionsChecked",
                        e.target.checked
                      )
                    }
                    name="termsAndConditionsChecked"
                    color="primary"
                  />
                }
                label={
                  <Typography sx={{ textAlign: "left" }}>
                    I have read and agreed to the Terms and Conditions
                  </Typography>
                }
                sx={{ alignSelf: "flex-start" }}
              />
              {errors.termsAndConditions && (
                <Typography color="error" sx={{ ml: 4 }}>
                  {errors.termsAndConditions}
                </Typography>
              )}
            </Box>

            <br />
            <Button
              fullWidth
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
                Price details
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
