import React from "react";
import { List } from "semantic-ui-react";

const OpeningHoursList = ({ openingHours }) => {  
  if (!openingHours) {
    return <p>Aukiotietoja ei löytynyt</p>;
  }
  return (
    <List>
      {openingHours.weekday_text.map(weekday => 
        <List.Item key={weekday}>
          {weekday}
        </List.Item>
      )}
    </List>
  );
}

export default OpeningHoursList;