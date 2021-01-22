import React from "react";
import { Button, Icon } from "semantic-ui-react";

const ShowPositionButton = ({ toggleShowOwnPosition, ownPositionVisible }) => {
  return (
    <Button icon toggle fluid color="olive" onClick={toggleShowOwnPosition}>
      <Icon name="map marker alternate" />
      {ownPositionVisible ? "Piilota oma sijainti" : "Näytä oma sijainti"}
    </Button>
  );
};

export default ShowPositionButton;
