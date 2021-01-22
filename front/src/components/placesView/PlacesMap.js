import React, { useState } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { Segment } from "semantic-ui-react";
import ShowPositionButton from "./ShowPositionButton";
import InfoWindowContent from "./InfoWindowContent";

const flagIcon =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

const mapsConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  language: "fi",
  region: "fi"
};

const ZOOM_LEVEL = 5;

const style = {
  height: "60vh"
};

const mapStyle = {
  height: "96%",
  width: "96%"
};

const PlacesMap = props => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [infoWindowIsVisible, setinfoWindowIsVisible] = useState(false);
  const [ownPosition, setOwnPosition] = useState(null);

  const toggleShowOwnPosition = () => {
    if (ownPosition) {
      setOwnPosition(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      setOwnPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  };

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setinfoWindowIsVisible(true);
  };

  const closeInfoWindow = () => {
    setActiveMarker(null);
    setinfoWindowIsVisible(false);
  };

  //Content that is rendered into div inside InfoWindow.
  //The way google-maps-react work does not seem allow use of <Link /> or history.push
  //This is a workaround
  //Content to div inside InfoWindow is rendered separately when InfoWindow is loaded.
  const onInfoWindowOpen = (props, e) => {
    ReactDOM.render(
      React.Children.only(
        <InfoWindowContent activeMarker={activeMarker} history={props.history} />
      ),
      document.getElementById("infoWindowContent")
    );
  };

  const infoWindow = () => {
    if (!activeMarker) {
      return null;
    }
    return (
      <InfoWindow
        marker={activeMarker}
        visible={infoWindowIsVisible}
        onClose={closeInfoWindow}
        onOpen={e => {
          onInfoWindowOpen(props, e);
        }}
      >
        <div id="infoWindowContent" />
      </InfoWindow>
    );
  };

  const mapPlacesToMarkers = places => {
    return places.map(place => {
      if(place.coordinates) {
        return (
          <Marker
            key={place.id}
            position={place.coordinates}
            title={place.name}
            image={place.images[0]}
            googleImage={place.googleImage}
            votes={place.votes}
            highway={place.highway}
            services={place.services}
            googleRating={place.googleRating}
            id={place.id}
            icon={flagIcon}
            onClick={onMarkerClick}
          />
        );        
      }   
      return null;   
    });
  };

  return (
    <Segment.Group>
      <Segment style={style}>
        <Map
          google={props.google}
          style={mapStyle}
          zoom={ZOOM_LEVEL}
          initialCenter={
            props.places[0]
              ? props.places[0].coordinates
              : {
                  lat: 62.517555,
                  lng: 25.691022
                }
          }
          mapTypeControl={false}
          streetViewControl={false}
        >
          {mapPlacesToMarkers(props.places)}
          {ownPosition ? <Marker position={ownPosition} /> : null}
          {infoWindow()}
        </Map>
      </Segment>
      <Segment>
        <ShowPositionButton
          toggleShowOwnPosition={toggleShowOwnPosition}
          ownPositionVisible={ownPosition ? true : false}
        />
      </Segment>
    </Segment.Group>
  );
};

export default withRouter(GoogleApiWrapper(mapsConfig)(PlacesMap));
