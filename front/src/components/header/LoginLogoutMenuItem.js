import React from "react";
import { connect } from "react-redux";
import { Menu, Icon, Dropdown, Loader, Image } from "semantic-ui-react";
import { loginAction, logoutAction } from "../../reducers/userReducer";

const LoginLogoutMenuItem = ({
  small,
  loginAction,
  logoutAction,
  user,
  loading,
  errored
}) => {
  if (loading) {
    return (
      <Menu.Item>
        <Loader active />
      </Menu.Item>
    )
  }

  if (errored) {
    return (
      <span style={{ color: "red" }}>
        Kirjautuminen epäonnistui
      </span>
    )
  }

  if (!user) {
    return (
      <Menu.Item onClick={loginAction}>
        <Icon name="sign-in" title="Kirjaudu sisään"/>
        {small ? null : "Kirjaudu sisään"}
      </Menu.Item>
    )
  }

  return (
    <Menu.Item>
      <Dropdown 
        icon={null} 
        trigger={<Image
          inline
          size="mini"
          circular
          src={user.picture}
          alt="Käyttäjäkuvake Kirjaudu ulos"         
        />}>
        <Dropdown.Menu>
          <Dropdown.Header>{user.nickname}</Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logoutAction}>
            <Icon name="sign-out" title="Kirjaudu ulos"/>
            Kirjaudu ulos
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
  
  
};

const mapsStateToProps = state => {
  return {
    user: state.user.user,
    loading: state.user.loading,
    errored: state.user.errored
  };
};

export default connect(mapsStateToProps, { loginAction, logoutAction })(
  LoginLogoutMenuItem
);
