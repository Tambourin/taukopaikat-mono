import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { lastCommentedSelector } from "../reducers/placesSelectors";

const style = {
  marginTop: "20px", 
  marginBottom: "0px",  
  backgroundColor:"#E8E8E8"
}

const Latest = ({ lastCommentedPlace }) => {  
  if(!lastCommentedPlace || !lastCommentedPlace.comments[0]) {
    return null;
  }
  
  return (
    <div id="latest">    
      <Grid columns={2} textAlign="center" style={style} stackable>       
        <Grid.Column>
          <h3>Viimeksi kommentoitu: 
          <Link to={`/places/${lastCommentedPlace.id}`} > {lastCommentedPlace.name}</Link>
          </h3>
          <q style={{ fontStyle: "italic" }}>{lastCommentedPlace.comments[lastCommentedPlace.comments.length - 1].content}</q>
          <p>{`- ${lastCommentedPlace.comments[lastCommentedPlace.comments.length - 1].author}`}</p>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    lastCommentedPlace: lastCommentedSelector(state.places.data)
  }
}

export default connect(mapStateToProps)(Latest);