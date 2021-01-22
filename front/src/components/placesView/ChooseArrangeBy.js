import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { setArrangeBy, arrangeOptions } from "../../reducers/viewOptionsReducer";

const menuOptions = [
  { icon: "like", value: arrangeOptions.VOTES, text: "Parhaat ensin" },
  { icon: "sort alphabet ascending", value: arrangeOptions.APLHABETIC, text: "Aakkosjärjestys" },
  { value: arrangeOptions.NORTH_TO_SOUTH, text: "Pohjoisesta etelään" },
  { value: arrangeOptions.SOUTH_TO_NORT, text: "Etelästä pohjoiseen" }
]

const ChooseArrangeBy = ({ arrangeBy, setArrangeBy }) => {  
  return (                
      <Dropdown    
        options={menuOptions}
        selection
        floating
        value={arrangeBy}
        onChange={(event, data) => setArrangeBy(data.value)}/>
  );
};

const mapStateToProps = state => {
  return {
    arrangeBy: state.viewOptions.arrangeBy    
  };
};

export default connect(
  mapStateToProps,
  { setArrangeBy }
)(ChooseArrangeBy);
