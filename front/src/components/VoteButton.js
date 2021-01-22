import React from "react";
import { connect } from "react-redux";
import { Icon, Button } from "semantic-ui-react";
import { votePlaceAction } from "../reducers/placesReducer";
import { loginAction } from "../reducers/userReducer";

const VoteButton = ({ place, fluid, votePlaceAction, user, loginAction }) => {
  const executeVote = async () => {
    votePlaceAction(place, user);
  };

  if (!user) {
    return (
      <Button
        basic
        onClick={loginAction}
        icon
        labelPosition="left"
        fluid={fluid ? true : false}
      >
        <Icon name="like" />
        Kirjaudu sisään äänestääksesi
      </Button>
    );
  }

  if (place.votes.includes(user.sub)) {
    return (
      <div>
        <Icon name="like" color="red" />
        {`Olet äänestänyt tätä paikkaa ${place.highway}-tien parhaaksi`}
      </div>
    );
  }

  return (
    <Button
      basic
      onClick={executeVote}
      icon
      labelPosition="left"
      fluid={fluid ? true : false}
    >
      <Icon name="like" />
      Äänestä parhaaksi
    </Button>
  );
};

const mapStateToProps = state => {
  return {
    votes: state.votes,
    user: state.user.user
  };
};

export default connect(mapStateToProps, { votePlaceAction, loginAction })(VoteButton);
