import React from "react";
import { connect } from "react-redux";
import { Loader, Segment } from "semantic-ui-react";
import PlacesList from "./PlacesList";
import PlacesMap from "./PlacesMap";
import {
  getFilteredPlaces,
  orderPlaces,
  limitNumberOfPlacesByNumber,
  limitNumberOfPlacesByPercent
} from "../../reducers/placesSelectors";
import ChooseArrangeBy from "./ChooseArrangeBy";
import ChoosePercentageSlider from "./ChoosePercentageSlider";

const PlacesView = ({
  showOnMap,
  places,
  isLoading,
  loadingErrored,
  arrangeBy,
  percentageOfPlacesToView,
  numberOfPlacesToView
}) => {
  if (isLoading) {
    return (
      <Segment placeholder>
        <Loader active />
      </Segment>
    );
  }

  if (loadingErrored) {
    return <Segment>Tietojen lataus epäonnistui</Segment>;
  }

  if (places.length === 0) {
    return (
      <Segment>
        <p>Haku ei tuottanut tuloksia</p>
      </Segment>
    );
  }
  return (
    <>
      {showOnMap ? (
        <>
          <ChoosePercentageSlider />
          <PlacesMap
            places={limitNumberOfPlacesByPercent(
              orderPlaces(places, arrangeBy),
              percentageOfPlacesToView
            )}
          />
        </>
      ) : (
        <>
          <ChooseArrangeBy />
          <PlacesList
            places={limitNumberOfPlacesByNumber(
              orderPlaces(places, arrangeBy),
              numberOfPlacesToView
            )}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    places: getFilteredPlaces(state.places.data, state.filter),
    showOnMap: state.viewOptions.showOnMap,
    arrangeBy: state.viewOptions.arrangeBy,
    isLoading: state.places.isLoading,
    loadingErrored: state.places.loadingErrored,
    percentageOfPlacesToView: state.viewOptions.percentageOfPlacesToView,
    numberOfPlacesToView: state.viewOptions.numberOfPlacesToView
  };
};

export default connect(mapStateToProps)(PlacesView);
