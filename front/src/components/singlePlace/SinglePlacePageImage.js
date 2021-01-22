import React from "react";
import PlaceImage from "../PlaceImage";
import AllPlaceImages from "./AllPlaceImages";
import AddImage from "./AddImage";

const IMAGE_HEIGHT = 520;

const componentContainerStyle = {
  position: "relative"
}

const buttonContainerStyle = {
  position: "absolute", 
  width:"100%", 
  bottom: 8, 
  display: "flex", 
  justifyContent: "center"
}

const SinglePlacePageImage = ({ place }) => {
  return (
    <div style={componentContainerStyle}>  
      <PlaceImage imageId={place.images[0]} googleImageId={place.googleImage} height={IMAGE_HEIGHT} big/>
      <div style={buttonContainerStyle}>
        <AllPlaceImages imageIds={place.images}/> 
        <AddImage place={place}/>           
      </div>                
    </div>
  );
}

export default SinglePlacePageImage;