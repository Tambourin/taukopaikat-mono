import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Segment } from "semantic-ui-react";

const RedirectPage = ({ user, targetUrl, errored }) => {
  console.log("user:", user);
  console.log("errored:", errored);
  
  if(errored) {
    return <Redirect to={"/"} />
  }
  if(!user) {
    return <Segment loading></Segment>
  }

  

  return (
    <div>
      <Redirect to={targetUrl} />
    </div>
  );
};
const mapStateToProps = state => {  
  return {
    user: state.user.user,
    errored: state.user.errored,
    targetUrl: state.user.targetUrl
  };
};
export default connect(mapStateToProps)(RedirectPage);
