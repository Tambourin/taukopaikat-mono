import React, { useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import PlaceImage from "../PlaceImage";

const AllPlaceImages = ({ imageIds }) => {      
  const [ show, setShow ] = useState(false);

  if (imageIds < 2) {
    return null;
  }

  const mapImages = () => {
    return imageIds.map(image => <PlaceImage key={image} imageId={image} big />);
  }

  const triggerButton = () => {
    return <Button
      title="Näytä kaikki kuvat"
      aria-label="Näytä kaikki kuvat" 
      size="huge"
      onClick={() => setShow(true)} 
      circular icon="images outline">
    </Button>
  }

  return (    
    <Modal 
      open={show} 
      trigger={triggerButton()}       
      onClose={() => setShow(false)}       
      closeOnDimmerClick
      closeOnEscape
      closeIcon     
    >      
      <Modal.Content>
        Kuvia: {imageIds.length}
        {mapImages()}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setShow(false)}>
          Sulje
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default AllPlaceImages;