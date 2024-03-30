import React, { useState } from "react";
import AirInput from "./AirInput"; // Assuming AirInput is in the same directory

const initialSegment = () => ({
  id: Math.random(), // Simple ID generation for example purposes
  origin: "DAC",
  destination: "JSR",
  date: new Date().toISOString().split("T")[0], // Simplified initial date
});

const MultiCitySearchForm = ({
  isFirstChild,
  canRemove,
  journeyType,
  onAddCity,
  onRemoveCity,
  paperStyle,
  selectedFromAirport,
  selectedToAirport,
  handlePopoverClick,
  fromAnchorEl,
  toAnchorEl,
  handlePopoverClose,
  handleSearchQueryChange,
  searchQuery,
  searchedAirports,

  handleDPopoverClick,
  dAnchorEl,
  handleDPopoverClose,
  selectedDate,
  handleSwapAirports,
  dayOfWeek,
  handleDepartureDateChange,
  handleRPopoverClick,
  returnAnchorEl,
  handleRPopoverClose,
  returnDate,
  handleReturnDateChange,
  openModal,
  isModalOpen,
  closeModal,
  adults,
  children,
  infants,
  selectedClass,
  handleClassChange,
  classes,
  setAdults,
  setChildren,
  setInfants,
}) => {
  const [segments, setSegments] = useState([initialSegment()]);

  const addSegment = () => {
    setSegments([...segments, initialSegment()]);
  };

  const removeSegment = (id) => {
    setSegments(segments.filter((segment) => segment.id !== id));
  };

  const updateSegment = (id, field, value) => {
    const updatedSegments = segments.map((segment) =>
      segment.id === id ? { ...segment, [field]: value } : segment
    );
    setSegments(updatedSegments);
  };

  const handleFromAirportSelect = (id, airport) => {
    console.log(airport); // Add this line to debug
    if (!airport || !airport.code) {
      console.error("Airport data is not available.");
      return;
    }
    updateSegment(id, "origin", airport.code);
  };

  const handleToAirportSelect = (id, airport) => {
    console.log(airport); // Add this line to debug
    if (!airport || !airport.code) {
      console.error("Airport data is not available.");
      return;
    }
    updateSegment(id, "destination", airport.code);
  };

  return (
    <div style={{ width: "auto" }}>
      {segments.map((segment, index) => (
        <div key={segment.id}>
          <AirInput
            key={segment.id}
            segmentId={segment.id}
            origin={segment.origin}
            destination={segment.destination}
            date={segment.date}
            updateSegment={updateSegment}
            removeSegment={() => removeSegment(segment.id)}
            canRemove={segments.length > 1}
            paperStyle={paperStyle}
            // selectedFromAirport={selectedFromAirport}
            // selectedToAirport={selectedToAirport}
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
            classes={classes} // If you're using makeStyles or similar for styling
            setAdults={setAdults}
            setChildren={setChildren}
            setInfants={setInfants}
          />
          {segments.length > 1 && (
            <button onClick={() => removeSegment(segment.id)}>
              Remove City
            </button>
          )}
        </div>
      ))}
      <button onClick={addSegment}>Add City</button>
    </div>
  );
};

export default MultiCitySearchForm;
