import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import PlacesMap from "../placesView/PlacesMap";
import OpeningHoursList from "./OpeningHoursList";

const SinglePlaceAccordion = ({ place, activeGoogleData, openingHours }) => {  
  const [ activeIndex, setActiveIndex ] = useState(-1);

  const openCloseAccordion = (index) => {    
    index === activeIndex ? setActiveIndex(-1) : setActiveIndex(index);  
  }

  return (
    <Accordion styled fluid>
        <Accordion.Title active={activeIndex === 0} onClick={() => openCloseAccordion(0)}>
          <Icon name="dropdown" color="olive"/>
          Yhteystiedot
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            {activeGoogleData.address ? activeGoogleData.address + ", " : null} 
            {place.city}
          </p>
          {activeGoogleData.www ?   
            <div>
              <Icon name="world" />
              <a id="webLink"  href={activeGoogleData.www}>Verkkosivu</a>
            </div>
            : null
          }
        </Accordion.Content>        
        <Accordion.Title active={activeIndex === 2} onClick={() => openCloseAccordion(2)}>
          <Icon name="dropdown" color="olive"/>
          Aukioloajat
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <OpeningHoursList openingHours={openingHours} />          
        </Accordion.Content> 
        <Accordion.Title active={activeIndex === 3} onClick={() => openCloseAccordion(3)}>
          <Icon name="dropdown" color="olive"/>
          Kartta
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          {activeIndex === 3 ? <PlacesMap places={[place]}/> : null}
        </Accordion.Content>    
    </Accordion>
  )
}

export default SinglePlaceAccordion;