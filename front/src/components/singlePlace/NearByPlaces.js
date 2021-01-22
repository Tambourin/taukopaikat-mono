import React from "react";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import { nearbyPlacesSelector } from "../../reducers/placesSelectors";
import PlacesList from "../placesView/PlacesList";

const MAX_DIST_FOR_NEARBY_PLACES = 20;

const NearByPlaces = ({ nearByPlaces, place }) => {
  return (
    <div>
      <Header as="h3">
        Vaihtoehtoja lähellä paikkaa {place.name} (max{" "}
        {MAX_DIST_FOR_NEARBY_PLACES} km)
      </Header>
      {nearByPlaces.length > 0 ? (
        <PlacesList places={nearByPlaces} hideVoteButtons />
      ) : (
        <div>Ei kohteita</div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    nearByPlaces: nearbyPlacesSelector(
      ownProps.place,
      state.places.data,
      MAX_DIST_FOR_NEARBY_PLACES
    )
  };
};

export default connect(mapStateToProps)(NearByPlaces);
