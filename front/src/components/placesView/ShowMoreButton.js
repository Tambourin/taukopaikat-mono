import React from "react";
import { connect } from "react-redux";
import { setNumberOfPLacesToView, BUNCH_OF_PLACES } from "../../reducers/viewOptionsReducer";
import { Button, Segment } from "semantic-ui-react";

const ShowMoreButton = ({ numberOfPlacesToView, setNumberOfPLacesToView, placesLength }) => {
  if(numberOfPlacesToView > placesLength) {
    return <Segment basic>Kaikki tulokset ladattu</Segment>;
  }
  
  const handleButtonClick = () => {
    setNumberOfPLacesToView(numberOfPlacesToView + BUNCH_OF_PLACES)    
  }

  return (
    <Segment basic>
      <Button basic color="yellow" fluid onClick={handleButtonClick}>Näytä lisää tuloksia</Button>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    numberOfPlacesToView: state.viewOptions.numberOfPlacesToView
  }  
};
export default connect(mapStateToProps, { setNumberOfPLacesToView })(ShowMoreButton);