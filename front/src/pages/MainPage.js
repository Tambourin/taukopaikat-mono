import React from "react";
import { Container } from "semantic-ui-react";
import FilterBox from "../components/filter/FilterBox";
import PlacesView from "../components/placesView/PlacesView";
import Heading from "../components/header/Heading";
import Latest from "../components/Latest";

const MainPage = () => {
  return (
    <div>
      <Heading />      
      <Container>     
        <FilterBox />       
        <PlacesView />
      </Container>
      <Latest />
    </div>
  );
}

export default MainPage;