import React from "react";
import { connect } from "react-redux";
import { Segment, Grid } from "semantic-ui-react";
import {
  setHighway,
  setSearchWord,
  setDoesNotBelongToChain,
  setIsOpenTwentyFourHours,
  setHasBeenAvarded,
  setIsAttraction,
  setIsSummerCafe,
  setIsGasStation,
  setIsGrill,
  setHasMarketplace
} from "../../reducers/filterReducer";
import { showAsList, showOnMap } from "../../reducers/viewOptionsReducer";
import ChooseServices from "./ChooseServices";
import ChooseViewAsListOrMap from "./ChooseViewAsListOrMap";
import ChooseHighWay from "./ChooseHighWay";
import SearchWordInput from "./SearchWordInput";

const FilterBox = ({
  setHighway,
  setSearchWord,
  filter,
  viewOptions,
  showAsList,
  showOnMap,
  ...props
}) => {
  return (
    <Segment raised color="olive">
      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
            <ChooseHighWay highway={filter.highway} setHighway={setHighway} />
          </Grid.Column>
          <Grid.Column>
            <SearchWordInput
              searchWord={filter.searchWord}
              setSearchWord={setSearchWord}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <ChooseServices
              filter={filter}
              setDoesNotBelongToChain={props.setDoesNotBelongToChain}
              setIsOpenTwentyFourHours={props.setIsOpenTwentyFourHours}
              setHasBeenAvarded={props.setHasBeenAvarded}
              setIsAttraction={props.setIsAttraction}
              setIsSummerCafe={props.setIsSummerCafe}
              setIsGasStation={props.setIsGasStation}
              setIsGrill={props.setIsGrill}
              setHasMarketplace={props.setHasMarketplace}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <ChooseViewAsListOrMap
              viewOptions={viewOptions}
              showAsList={showAsList}
              showOnMap={showOnMap}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    filter: state.filter,
    viewOptions: state.viewOptions
  };
};

export default connect(
  mapStateToProps,
  {
    setHighway,
    setSearchWord,
    setDoesNotBelongToChain,
    setIsOpenTwentyFourHours,
    setHasBeenAvarded,
    setIsAttraction,
    setIsSummerCafe,
    setIsGasStation,
    setIsGrill,
    setHasMarketplace,
    showAsList,
    showOnMap
  }
)(FilterBox);
