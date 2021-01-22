import React from "react";
import { Link } from "react-router-dom";
import { Menu, Responsive } from "semantic-ui-react";
import LoginLogoutMenuItem from "./LoginLogoutMenuItem";

const HeaderMenu = () => {
  
  const FullMenu = () => {
    return (
      <Responsive as={Menu.Menu} position="right" minWidth={Responsive.onlyTablet.minWidth}>
        <LoginLogoutMenuItem />
      </Responsive>
    );
  };

  const MobileMenu = () => {
    return (
      <Responsive as={Menu.Menu} position="right" maxWidth={Responsive.onlyTablet.minWidth - 1}>
        <LoginLogoutMenuItem small/>
      </Responsive>
    );
  }
  
  return (
    <Menu
      borderless
      inverted
      color="olive"
      fluid      
      style={{ marginBottom: "0px" }}
    >
      <Menu.Item as={Link} to="/">
        <h1 style={{ fontSize: "32px" }}>Taukopaikat.fi</h1>
      </Menu.Item>
      <FullMenu />
      <MobileMenu />
    </Menu>
  );
};

export default HeaderMenu;
