import React from "react";

const fixDay = (day) => { 
  if(day > 0) {
    return day - 1;
  }
  return 6;
}

const OpenToday = ({ openingHours }) => {
  if(!openingHours) {
    return null;
  }

  const splitWeekdayText = () => {
    let openingHoursString = openingHours.weekday_text[fixDay(new Date().getDay())];
    return openingHoursString.split(": ")[1];    
  }

  return (
    <h3>
      <b>Auki tänään: </b>
      {splitWeekdayText()}
    </h3>
  );
};

export default OpenToday;