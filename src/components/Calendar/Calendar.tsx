import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CalendarProps = {
  isCalendarOpen: boolean;
  setIsCalendarOpen: (arg: boolean) => void;
  startDate: Date | null;
  setStartDate: (arg: React.SetStateAction<Date | null>) => void;
};

const Calendar: React.FC<CalendarProps> = ({
  isCalendarOpen,
  setIsCalendarOpen,
  startDate,
  setStartDate,
}) => {
  const handleChange = (e: React.SetStateAction<Date | null>) => {
    setIsCalendarOpen(!isCalendarOpen);
    setStartDate(e);
  };
  return (
    <>
      {isCalendarOpen && (
        <DatePicker selected={startDate} onChange={handleChange} inline />
      )}
    </>
  );
};

export default Calendar;
