import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const EditButton = ({ place, isAuthenticated }) => {
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <Button 
      as={Link}
      to={`/edit/${place.id}`}
      icon="edit" 
      style={{ position: "absolute", top: "10px", right: "10px" }} 
      floated="right"
      content="Muokkaa"
      size="mini"
    />    
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}

export default connect(mapStateToProps)(EditButton);