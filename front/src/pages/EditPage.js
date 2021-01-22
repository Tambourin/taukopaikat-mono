import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Button, Container, Segment } from "semantic-ui-react";
import { addPlace, updatePlaceSmartAction } from "../reducers/placesReducer";
import { withRouter } from "react-router-dom";
import AddImage from "../components/singlePlace/AddImage";

const EditPage = ({ history, addPlace, updatePlaceSmartAction, place, errorMessage }) => {
 
  const [ nameField, setNameField ] = useState("");
  const [ descriptionField, setDescriptionField ] = useState("");
  const [ highwayField, setHighwayField ] = useState("");
  const [ cityField, setCityField ] = useState("");
  const [ doesNotBelongToChainField, setDoesNotBelongToChainField ] = useState(false);
  const [ isOpenTwentyFourHoursField, setIsOpenTwentyFourHoursField ] = useState(false);
  const [ hasBeenAvardedField, setHasBeenAvardedField ] = useState(false);
  const [ isAttractionField, setIsAttractionField ] = useState(false);
  const [ isSummerCafeField, setIsSummerCafeField ] = useState(false);
  const [ isGasStationField, setIsGasStationField ] = useState(false);
  const [ isGrillField, setIsGrillField ] = useState(false);
  const [ isBakeryField, setIsBakeryField ] = useState(false);
  const [ hasMarketplaceField, setHasMarketplaceField ] = useState(false);

  useEffect(() => {
    if(place){
      setNameField(place.name);
      setDescriptionField(place.description);
      setHighwayField(place.highway);
      setCityField(place.city);
      setDoesNotBelongToChainField(place.services.doesNotBelongToChain);
      setIsOpenTwentyFourHoursField(place.services.isOpenTwentyFourHours);
      setHasBeenAvardedField(place.services.hasBeenAvarded);
      setIsAttractionField(place.services.isAttraction);
      setIsSummerCafeField(place.services.isSummerCafe);
      setIsGasStationField(place.services.isGasStation);
      setIsGrillField(place.services.isGrill);
      setHasMarketplaceField(place.services.hasMarketplace);
    }
  }, [place]);

  const handleSubmit = async event => {  
    event.preventDefault();              
    const updatedPlace = {
      ...place,
      name: nameField,
      description: descriptionField,
      highway: highwayField,
      city: cityField,      
      services: {
        doesNotBelongToChain: doesNotBelongToChainField,
        isOpenTwentyFourHours: isOpenTwentyFourHoursField,
        hasBeenAvarded: hasBeenAvardedField,
        isAttraction: isAttractionField,
        isSummerCafe: isSummerCafeField,
        isGasStation: isGasStationField,
        isGrill: isGrillField,
        isBakery: isBakeryField,
        hasMarketplace: hasMarketplaceField
      }
    };
    let result;
    if(place) {
      result = await updatePlaceSmartAction(updatedPlace);
      history.push(`/places/${result.id}`);
    } else {      
      result = await addPlace(updatedPlace);
      if(result) {
        history.push(`/edit/${result.id}`);
      }      
    }    
  }
  
  const addImagesSegment = () => {
    return (
      <Segment>
        <h3>Kuvat</h3>
        <p>
          {place.images.map(imageId => <li key={imageId}>{imageId}</li>)}
        </p>
        <h4>Lisää kuvia:</h4> 
          <AddImage place={place} />
      </Segment> 
    )
  }

  return (
    <Container>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <Segment>
        {place ? <h2>Muokkaa paikkaa: {place.name}</h2> : <h2>Lisää uusi taukopaikka</h2>}
        <Form>
          {place ? null : <Form.Field required>
            <label htmlFor="nameField">Nimi</label>
            <input name="nameField" value={nameField} onChange={(event) => setNameField(event.target.value)} />
          </Form.Field>}
          <Form.Field required>
            <label htmlFor="cityField">Kaupunki</label>
            <input name="cityField" value={cityField} onChange={(event) => setCityField(event.target.value)}/>
          </Form.Field>
          <Form.Field required> 
            <label htmlFor="highwayField">Tien numero:</label>
            <input name="highwayField" value={highwayField} onChange={(event) => setHighwayField(event.target.value)}/>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="descriptionField">Kuvaus:</label>
            <input name="descriptionField" value={descriptionField} onChange={(event) => setDescriptionField(event.target.value)}/>
          </Form.Field>  
          <label htmlFor="doesNotBelongToChain">Ei kuulu ketjuun</label>
          <Form.Checkbox name="doesNotBelongToChain" checked={doesNotBelongToChainField} onChange={() => setDoesNotBelongToChainField(!doesNotBelongToChainField)} />
          <label htmlFor="isOpenTwentyFourHours">avoinna 24h</label>
          <Form.Checkbox name="isOpenTwentyFourHours" checked={isOpenTwentyFourHoursField} onChange={() => setIsOpenTwentyFourHoursField(!isOpenTwentyFourHoursField)} />
          <label htmlFor="hasBeenAvarded">Palkittu</label>
          <Form.Checkbox name="hasBeenAvarded" checked={hasBeenAvardedField} onChange={() => setHasBeenAvardedField(!hasBeenAvardedField)} />
          <label htmlFor="isAttraction">nähtävyys</label>
          <Form.Checkbox name="isAttraction" checked={isAttractionField} onChange={() => setIsAttractionField(!isAttractionField)} />
          <label htmlFor="isSummerCafe">kesäkahvila</label>
          <Form.Checkbox name="isSummerCafe" checked={isSummerCafeField} onChange={() => setIsSummerCafeField(!isSummerCafeField)} />
          <label htmlFor="isGasStation">huoltoasema</label>
          <Form.Checkbox name="isGasStation" checked={isGasStationField} onChange={() => setIsGasStationField(!isGasStationField)} />
          <label htmlFor="isGrill">grilli</label>
          <Form.Checkbox name="isGrill" checked={isGrillField} onChange={() => setIsGrillField(!isGrillField)} />
          <label htmlFor="isBakery">Leipomo/Konditoria</label>
          <Form.Checkbox name="isBakery" checked={isBakeryField} onChange={() => setIsBakeryField(!isBakeryField)} />
          <label htmlFor="hasMarketplace">Tuottajatori</label>
          <Form.Checkbox name="hasMarketplace" checked={hasMarketplaceField} onChange={() => setHasMarketplaceField(!hasMarketplaceField)} /> 

          {place ? addImagesSegment() : null}

          <Button onClick={handleSubmit} primary>Tallenna</Button>  
          <Button onClick={() => history.goBack()}>Peruuta</Button>                  
        </Form>
        
      </Segment>
      
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    errorMessage: state.places.uploadErrorMessage
  }
}

export default withRouter(connect(mapStateToProps, { addPlace, updatePlaceSmartAction })(EditPage));