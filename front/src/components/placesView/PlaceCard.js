import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import RoadNumber from "../RoadNumber";
import VoteButton from "../VoteButton";
import BestOfHighwayRibbon from "./BestOfHighWayRibbon";
import {
  placeWithMostVotes,
  getFilteredPlaces
} from "../../reducers/placesSelectors";
import PlaceImage from "../PlaceImage";
import ServiceIcons from "../ServiceIcons";

const MAX_IMAGE_HEIGHT = 210;

const PlaceCard = ({ place, isBest, hideVoteButton }) => {
  return (
    <Card>
      <Link to={`/places/${place.id}`} style={{ position: "relative"}}>
        <PlaceImage
          imageId={place.images[0]}
          googleImageId={place.googleImage}
          height={MAX_IMAGE_HEIGHT}
        />
      </Link>
      {isBest ? <BestOfHighwayRibbon highway={place.highway} /> : null}
      <Card.Content>
        <Card.Header as={Link} to={`/places/${place.id}`}>
          {place.name}
          <RoadNumber roadNumber={place.highway} floated="right" />
        </Card.Header>
        <Card.Meta>
          {place.city}
          <ServiceIcons place={place} size="mini" />
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        {hideVoteButton ? null : <VoteButton place={place} fluid/>}
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  const placesOnThisHighway = getFilteredPlaces(state.places.data, {
    highway: ownProps.place.highway
  });
  const bestOnThisHighWay = placeWithMostVotes(placesOnThisHighway);
  return {
    isBest: bestOnThisHighWay.id === ownProps.place.id ? true : false
  };
};

export default connect(mapStateToProps)(PlaceCard);
