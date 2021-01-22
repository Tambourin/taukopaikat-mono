import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { initializeAuth } from "./reducers/userReducer";
import { initializePlaces } from "./reducers/placesReducer";
import HeaderMenu from "./components/header/HeaderMenu";
import MainPage from "./pages/MainPage";
import SinglePlacePage from "./pages/SinglePlacePage";
import EditPage from "./pages/EditPage";
import Footer from "./components/Footer";
import RedirectPage from "./pages/RedirectPage";
import PrivacyPage from "./pages/PrivacyPage";

const App = ({ initializePlaces, initializeAuth, places, isAuthenticated }) => {
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    initializePlaces();
  }, [initializePlaces]);

  return (
    <>
      <BrowserRouter>
        <HeaderMenu />
        <Route exact path="/privacy" render={() => <PrivacyPage />} />
        <Route exact path="/" render={() => <MainPage />} />
        <Route exact path="/redirect" render={() => <RedirectPage />} />
        <Route
          exact
          path="/edit/:id"
          render={
            isAuthenticated
              ? ({ match }) => (
                  <EditPage
                    place={places.find(place => place.id === match.params.id)}
                  />
                )
              : null
          }
        />
        <Route
          exact
          path="/places/:id"
          render={({ match }) => (
            <SinglePlacePage
              id={match.params.id}
              place={places.find(place => place.id === match.params.id)}
            />
          )}
        />
        <Footer />
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = state => {
  return {
    places: state.places.data,
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
  };
};

export default connect(mapStateToProps, { initializePlaces, initializeAuth })(
  App
);
