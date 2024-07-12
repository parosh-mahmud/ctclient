import React, { useEffect, useState, useRef } from "react";
import { Grid, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import {
  fetchFlightResults,
  setFromAirport,
  setToAirport,
  selectFromAirport,
  selectToAirport,
  setSearchParams,
  selectFlightSearchParams,
} from "../../redux/reducers/flightSlice";
import fetchAirports from "../../services/api";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import AirInput from "./AirInput";
import "./style.css";
import "@fontsource/poppins";
import { CustomIconButton } from "./CustomIconButton";
import useStyles, { gridContainerStyle, paperStyle } from "./styles"; // Importing styles

export const SearchForm = ({ searchButtonLabel }) => {
  const [selectedOption, setSelectedOption] = useState("oneway");
  const selectedFromAirport = useSelector(selectFromAirport);
  const selectedToAirport = useSelector(selectToAirport);
  const [searchedAirports, setSearchedAirports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [fromAnchorEl, setFromAnchorEl] = useState(null);
  const [toAnchorEl, setToAnchorEl] = useState(null);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(dayjs().add(3, "day"));
  const [dayOfWeek, setDayOfWeek] = useState(selectedDate.format("dddd"));
  const [dAnchorEl, setDanchorEl] = useState(null);
  const [returnAnchorEl, setReturnAnchorEl] = useState(null);
  const [returnDayOfWeek, setReturnDayOfWeek] = useState("");
  const [returnDatePopoverOpen, setReturnDatePopoverOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const dispatch = useDispatch();
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const [returnDate, setReturnDate] = useState(null);
  const [airInputs, setAirInputs] = useState([{ id: 0 }]);
  const [isTravelDatePopoverOpen, setIsTravelDatePopoverOpen] = useState(false);
  const [isReturnDatePopoverOpen, setIsReturnDatePopoverOpen] = useState(false);
  const searchParams = useSelector(selectFlightSearchParams);

  const handleTravelDateClick = () => {
    setIsTravelDatePopoverOpen(!isTravelDatePopoverOpen);
    handleDPopoverClick();
  };
  useEffect(() => {
    if (searchParams.AdultQuantity) {
      setAdults(searchParams.AdultQuantity);
    }
    if (searchParams.ChildQuantity) {
      setChildren(searchParams.ChildQuantity);
    }
    if (searchParams.InfantQuantity) {
      setInfants(searchParams.InfantQuantity);
    }
  }, [searchParams]);
  const travelerCount = (type, action) => {
    if (action === "increment" && adults + children + infants < 10) {
      switch (type) {
        case "adults":
          if (adults < 9) setAdults(adults + 1);
          break;
        case "children":
          setChildren(children + 1);
          break;
        case "infants":
          if (infants < adults) setInfants(infants + 1);
          break;
        default:
          break;
      }
    } else if (action === "decrement") {
      switch (type) {
        case "adults":
          setAdults(adults > 1 ? adults - 1 : adults);
          if (infants > adults - 1) setInfants(adults - 1);
          break;
        case "children":
          setChildren(children > 0 ? children - 1 : children);
          break;
        case "infants":
          setInfants(infants > 0 ? infants - 1 : infants);
          break;
        default:
          break;
      }
    }
  };

  const handleAddAirInput = () => {
    if (selectedOption === "multicity") {
      setAirInputs([...airInputs, { id: airInputs.length + 1 }]);
    }
  };

  const handleSwapAirports = () => {
    dispatch(setFromAirport(selectedToAirport));
    dispatch(setToAirport(selectedFromAirport));
  };

  const handleAddCity = () => {
    setAirInputs([...airInputs, { id: airInputs.length + 1 }]);
  };

  const handleRemoveCity = (id) => {
    setAirInputs(airInputs.filter((input) => input.id !== id));
  };

  const handleReturnDateChange = (date) => {
    setReturnAnchorEl(null);
    setReturnDate(date);
    const dayOfWeek = date.format("dddd");
    setReturnDayOfWeek(dayOfWeek);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleRPopoverClose = () => {
    setReturnDatePopoverOpen(false);
    setReturnAnchorEl(null);
    setIsReturnDatePopoverOpen(false);
  };

  const handleDPopoverClose = () => {
    setDanchorEl(null);
    setIsTravelDatePopoverOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDepartureDateChange = (date) => {
    setSelectedDate(date);
    handleDPopoverClose();
    const updatedSearchParams = {
      ...searchParams,
      Segments: [
        {
          ...searchParams.Segments?.[0],
          DepartureDateTime: date.format("YYYY-MM-DD"),
        },
      ],
    };

    dispatch(setSearchParams(updatedSearchParams));
  };

  useEffect(() => {
    if (searchParams?.Segments?.[0]?.DepartureDateTime) {
      setSelectedDate(dayjs(searchParams.Segments[0].DepartureDateTime));
    }
  }, [searchParams]);

  const handleDPopoverClick = (event) => {
    setDanchorEl(event.currentTarget);
    setIsTravelDatePopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setFromAnchorEl(null);
    setToAnchorEl(null);
    setSearchQuery(""); // Reset search query
  };

  const handleFromAirportSelect = (airport) => {
    dispatch(setFromAirport(airport));
    handlePopoverClose();
    setTimeout(
      () => setToAnchorEl(document.getElementById("toAirportTrigger")),
      0
    );
  };

  const handleToAirportSelect = (airport) => {
    dispatch(setToAirport(airport));
    handlePopoverClose();
  };
  const handlePopoverClick = (event, anchor) => {
    setSearchQuery(""); // Reset search query
    if (anchor === "from") {
      setFromAnchorEl(event.currentTarget);
      setToAnchorEl(null);
    } else if (anchor === "to") {
      setToAnchorEl(event.currentTarget);
      setFromAnchorEl(null);
    }
  };

  const handleRPopoverClick = (event) => {
    setReturnDatePopoverOpen(true);
    setReturnAnchorEl(event.currentTarget);
    setSelectedOption("return");
    setIsReturnDatePopoverOpen(true);
  };

  const handleSearchQueryChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const open = Boolean(anchorEl);

  const [journeyType, setJourneyType] = useState("oneway");

  const handleOptionChange = (newValue) => {
    setJourneyType(newValue);
    setSelectedOption(newValue);
    if (newValue === "multicity") {
      if (airInputs.length < 2) {
        setAirInputs([{ id: 1 }, { id: 2 }]);
      }
    } else {
      setAirInputs([{ id: 1 }]);
    }
  };

  const handleFetchAirports = async () => {
    try {
      const airportData = await fetchAirports(searchQuery);
      console.log("API response:", airportData);
      setSearchedAirports(airportData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchedAirports([]);
      return;
    }
    handleFetchAirports();
  }, [searchQuery]);

  const handleFormData = async () => {
    let updatedFormData = {
      AdultQuantity: adults,
      ChildQuantity: children,
      InfantQuantity: infants,
      EndUserIp: "103.124.251.147",
      JourneyType: selectedOption === "oneway" ? "1" : "2",
      Segments: [
        {
          Origin: selectedFromAirport.code,
          Destination: selectedToAirport.code,
          CabinClass: selectedClass === "Economy" ? "1" : "2",
          DepartureDateTime: selectedDate.format("YYYY-MM-DD"),
        },
      ],
    };
    console.log(updatedFormData);
    if (selectedOption === "return") {
      updatedFormData.Segments.push({
        Origin: selectedToAirport.code,
        Destination: selectedFromAirport.code,
        CabinClass: selectedClass === "Economy" ? "1" : "2",
        DepartureDateTime: returnDate.format("YYYY-MM-DD"),
      });
    }

    try {
      setIsFetching(true);
      dispatch(fetchFlightResults(updatedFormData));
      history.push("/flight-results");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <Grid container style={gridContainerStyle}>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "10px",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            aria-label="journey-type"
            name="journey-type"
          >
            <CustomIconButton
              value="oneway"
              selectedValue={selectedOption}
              onChange={() => handleOptionChange("oneway")}
              Icon={KeyboardBackspaceIcon}
              label="One Way"
            />
            <CustomIconButton
              value="return"
              selectedValue={selectedOption}
              onChange={() => handleOptionChange("return")}
              Icon={RestartAltIcon}
              label="Return"
              rotate={true}
            />
            <CustomIconButton
              value="multicity"
              selectedValue={selectedOption}
              onChange={() => handleOptionChange("multicity")}
              Icon={CallSplitIcon}
              label="Multi City"
              rotate={true}
            />
          </Box>
        </Grid>

        {selectedOption === "multicity" ? (
          airInputs.map((input, index) => (
            <AirInput
              isFirstChild={index === 0}
              journeyType={journeyType}
              canRemove={airInputs.length > 1 && index !== 0}
              key={input.id}
              onAddCity={handleAddCity}
              onRemoveCity={() => handleRemoveCity(input.id)}
              paperStyle={paperStyle}
              selectedFromAirport={selectedFromAirport}
              selectedToAirport={selectedToAirport}
              handlePopoverClick={handlePopoverClick}
              fromAnchorEl={fromAnchorEl}
              toAnchorEl={toAnchorEl}
              handlePopoverClose={handlePopoverClose}
              handleSearchQueryChange={handleSearchQueryChange}
              searchQuery={searchQuery}
              searchedAirports={searchedAirports}
              handleFromAirportSelect={handleFromAirportSelect}
              handleToAirportSelect={handleToAirportSelect}
              handleDPopoverClick={handleDPopoverClick}
              dAnchorEl={dAnchorEl}
              handleDPopoverClose={handleDPopoverClose}
              selectedDate={selectedDate}
              dayOfWeek={dayOfWeek}
              handleDepartureDateChange={handleDepartureDateChange}
              handleRPopoverClick={handleRPopoverClick}
              returnAnchorEl={returnAnchorEl}
              handleRPopoverClose={handleRPopoverClose}
              returnDate={returnDate}
              handleReturnDateChange={handleReturnDateChange}
              openModal={openModal}
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              adults={adults}
              children={children}
              infants={infants}
              selectedClass={selectedClass}
              handleClassChange={handleClassChange}
              classes={classes}
              setAdults={setAdults}
              setChildren={setChildren}
              setInfants={setInfants}
              isTravelDatePopoverOpen={isTravelDatePopoverOpen}
              isReturnDatePopoverOpen={isReturnDatePopoverOpen}
            />
          ))
        ) : (
          <AirInput
            key={airInputs[0].id}
            paperStyle={paperStyle}
            travelerCount={travelerCount}
            selectedFromAirport={selectedFromAirport}
            selectedToAirport={selectedToAirport}
            handlePopoverClick={handlePopoverClick}
            fromAnchorEl={fromAnchorEl}
            toAnchorEl={toAnchorEl}
            handlePopoverClose={handlePopoverClose}
            handleSearchQueryChange={handleSearchQueryChange}
            searchQuery={searchQuery}
            searchedAirports={searchedAirports}
            handleFromAirportSelect={handleFromAirportSelect}
            handleToAirportSelect={handleToAirportSelect}
            handleDPopoverClick={handleDPopoverClick}
            dAnchorEl={dAnchorEl}
            handleDPopoverClose={handleDPopoverClose}
            selectedDate={selectedDate}
            dayOfWeek={dayOfWeek}
            handleSwapAirports={handleSwapAirports}
            handleDepartureDateChange={handleDepartureDateChange}
            handleRPopoverClick={handleRPopoverClick}
            returnAnchorEl={returnAnchorEl}
            handleRPopoverClose={handleRPopoverClose}
            returnDate={returnDate}
            handleReturnDateChange={handleReturnDateChange}
            openModal={openModal}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            adults={adults}
            children={children}
            infants={infants}
            selectedClass={selectedClass}
            handleClassChange={handleClassChange}
            classes={classes}
            setAdults={setAdults}
            setChildren={setChildren}
            setInfants={setInfants}
            isTravelDatePopoverOpen={isTravelDatePopoverOpen}
            isReturnDatePopoverOpen={isReturnDatePopoverOpen}
          />
        )}
      </Grid>

      <Button
        onClick={handleFormData}
        variant="contained"
        color="primary"
        sx={{
          position: "relative",
          top: "-30px",
          zIndex: 1,
          width: "20%",
          height: "60px",
          textTransform: "capitalize",
          backgroundColor: "#0067FF",
          fontSize: "22px",
          "@media (max-width:600px)": {
            fontSize: "18px",
            width: "50%",
            height: "50px",
          },
        }}
      >
        {searchButtonLabel || "Search"}
      </Button>
    </>
  );
};

export default SearchForm;
