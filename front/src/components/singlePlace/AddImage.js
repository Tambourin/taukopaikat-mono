import React, { useState } from "react";
import { connect } from "react-redux";
import { updatePlaceAction } from "../../reducers/placesReducer";
import { Segment, Button, Modal } from "semantic-ui-react";
import { setImageAction, upLoadAction } from "../../reducers/imageUploadReducer";

const reader = new FileReader();

const AddImage = ({ place, image, loading, setImageAction, errored, loadingSuccess, upLoadAction, updatePlaceAction, user }) => {
  
  const [ show, setShow ] = useState(false);
 
  reader.addEventListener("load", () => {
    setImageAction(reader.result);
  });

  const handleImageFileChange = event => {
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSubmit = async event => {    
    event.preventDefault();
    setShow(false);
    const updatedPlace = await upLoadAction(place.id, image);
    if(updatedPlace) {
      updatePlaceAction(updatedPlace);
    }    
  };

  if (loadingSuccess) {
    return <Button disabled={true} icon="check" color="green" />;
  } else if (errored) {
    return <Segment inverted color="red">Kuvan lisäys epäonnistui!</Segment>
  } else if (loading) {
    return <Modal open={true}><Segment loading placeholder></Segment></Modal>;
  }

  const triggerButton = () => {
    return <Button       
      title="Lähetä kuva"  
      aria-label="Lähetä kuva"           
      active={show}
      circular
      size="huge"        
      icon="plus"      
      onClick={() => setShow(!show)}
    />
  }

  const sendModal = () => {
    return (
      <>
        <Modal.Header>
          {`Lähetä kuva kohteesta ${place.name}.`}
        </Modal.Header>
        <Modal.Content>           
          <form onSubmit={handleSubmit}>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageFileChange}
              ></input>
              <input type="submit"></input>
            </form>          
        </Modal.Content> 
      </>
    );
  }

  const requestLoginModal = () => {
    return (
      <>
        <Modal.Header>Kirjaudu sisään lähettääksesi kuvia</Modal.Header>
      </>
    )
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
      {user ? sendModal() : requestLoginModal()}
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    image: state.imageUpload.image,
    loading: state.imageUpload.loading,
    errored: state.imageUpload.errored,
    loadingSuccess: state.imageUpload.loadingSuccess,
    user: state.user.user
  }
}

export default connect(
  mapStateToProps,
  { updatePlaceAction, setImageAction, upLoadAction }
)(AddImage);
