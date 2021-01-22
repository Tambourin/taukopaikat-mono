import React from "react";
import { Card, Segment } from "semantic-ui-react";
import PlaceCard from "./PlaceCard";
import ShowMoreButton from "./ShowMoreButton";

const PlacesList = ({ places, hideVoteButtons }) => {
  if (!places) {
    return null;
  } 
  
  return (  
    <Segment>                 
      <Card.Group centered stackable>
        {places.map(place => (
          <PlaceCard key={place.id} place={place} hideVoteButton={hideVoteButtons}/>
        ))}
      </Card.Group>   
      <ShowMoreButton placesLength={places.length}/>
    </Segment>  
  );
};

export default PlacesList;
