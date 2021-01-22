import React from "react";
import { connect } from "react-redux";
import { Segment, Label, Grid } from "semantic-ui-react";
import { setPercentageOfPlacesToView } from "../../reducers/viewOptionsReducer";

const inputStyle = {
  width: "100%",
  margin: "auto"
};

const centerStyle = {
  display: "flex",
  alignItems: "center"
};

const ChoosePercentageSlider = ({
  percentageOfPlacesToView,
  setPercentageOfPlacesToView
}) => {
  return (
    <Segment color="olive" raised>
      <Grid columns="equal">
        <Grid.Column textAlign="center">
          <Label
            id="show_only_best"            
            pointing="right"
            basic
            onClick={() => setPercentageOfPlacesToView(1)}
          >
            Parhaat
          </Label>
        </Grid.Column>
        <Grid.Column width={8} style={centerStyle}>
          <input
            style={inputStyle}
            type="range"
            min={1}
            max={100}
            value={percentageOfPlacesToView}  
            onChange={event => setPercentageOfPlacesToView(event.target.value)}
          />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Label
            id="show_all"
            pointing="left"
            basic
            onClick={() => setPercentageOfPlacesToView(100)}
          >
            Kaikki
          </Label>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

const mapsStateToProps = state => {
  return {
    percentageOfPlacesToView: state.viewOptions.percentageOfPlacesToView
  };
};

export default connect(
  mapsStateToProps,
  { setPercentageOfPlacesToView }
)(ChoosePercentageSlider);
