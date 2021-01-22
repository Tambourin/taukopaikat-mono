import React from "react";
import { Button, Icon, Image } from "semantic-ui-react";

const ShowOnGoogleMapsButton = ({ placeName }) => {
  return (
    <div style={{ marginTop: "15px" }}>
      <Button
        color="blue"
        icon
        labelPosition="left"
        href={`https://www.google.com/maps/search/?api=1&query=${placeName}`}
      >
        <Icon
          as={Image}
          src="http://icons.iconarchive.com/icons/papirus-team/papirus-apps/128/maps-icon.png"
        />
        Näytä Google Mapsissa
      </Button>
    </div>
  );
};

export default ShowOnGoogleMapsButton;
