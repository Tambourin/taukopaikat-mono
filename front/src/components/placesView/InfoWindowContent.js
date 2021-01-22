import React from "react";
import RatingsGroup from "../RatingsGroup";
import RoadNumber from "../RoadNumber";
import PlaceImage from "../PlaceImage";
import ServiceIcons from "../ServiceIcons";

const InfoWindowContent = ({ activeMarker, history }) => {
  return (
    <div
      onClick={() => history.push(`/places/${activeMarker.id}`)}
      style={{ cursor: "pointer" }}
    >
      <h4>
        {activeMarker.title}
        <RoadNumber roadNumber={activeMarker.highway} floated="right" />
      </h4>
      <PlaceImage
        imageId={activeMarker.image}
        googleImageId={activeMarker.googleImage}
        height={100}
      />
      <div style={{ height: "10px" }}></div>
      <RatingsGroup
        small
        votes={activeMarker.votes}
        googleRating={activeMarker.googleRating}
      />
      <ServiceIcons size="mini" place={activeMarker} noTitle />
    </div>
  );
}

export default InfoWindowContent;