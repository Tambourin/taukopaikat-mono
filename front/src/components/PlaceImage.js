import React from "react";
import { Image } from "semantic-ui-react";

const BASE_GOOGLE_IMAGE_URL = process.env.NODE_ENV === "development" 
  ? "http://localhost:3001/api/places/image" 
  : "/api/places/image";
const BASE_IMAGE_URL = "https://res.cloudinary.com/drugozaqq/image/upload/";
const DEFAULT_IMAGE = "placeholder.png";

const PlaceImage = ({ imageId, googleImageId, height, big}) => {
  const imageStyle = {
    height: `${height}px`, 
    width: "100%", 
    objectFit: "cover", 
    objectPosition: "center"
  }

  const bigImageStyle = {
    ...imageStyle,
    maxHeight: `${height}px`
  }

  const imageUrl290 = `${BASE_IMAGE_URL}w_${290},d_${DEFAULT_IMAGE}/${imageId}`;
  const imageUrl333 = `${BASE_IMAGE_URL}w_${333},d_${DEFAULT_IMAGE}/${imageId}`;
  const imageUrl650 = `${BASE_IMAGE_URL}w_${650},d_${DEFAULT_IMAGE}/${imageId}`;
  const imageUrl1200 = `${BASE_IMAGE_URL}w_${1200},d_${DEFAULT_IMAGE}/${imageId}`;

  const googleImageUrl290 = `${BASE_GOOGLE_IMAGE_URL}/${googleImageId}/290`;
  const googleImageUrl333 = `${BASE_GOOGLE_IMAGE_URL}/${googleImageId}/290`;
  const googleImageUrl650 = `${BASE_GOOGLE_IMAGE_URL}/${googleImageId}/290`;
  const googleImageUrl1200 = `${BASE_GOOGLE_IMAGE_URL}/${googleImageId}/290`;

  if(imageId) {
    if(big) {
      return (
        <img 
          style={bigImageStyle} 
          srcSet={` ${imageUrl650} 650w,
                    ${imageUrl1200} 1200w`}
          sizes={`  (max-width: 650px) 650px,
                    1200px `}
          src={imageUrl1200} 
          alt="Pääkuva taukopaikasta"/>
      )
    }
    return (
      <img
        style={imageStyle}
        srcSet={`${imageUrl290} 290w,
                 ${imageUrl333} 333w,
                 ${imageUrl650} 650w`}
        sizes="(max-width: 500px) 330px,
               (max-width: 767px) 650px,
               (min-width: 768px) 290px"         
        src={`${BASE_IMAGE_URL}w_${500},d_${DEFAULT_IMAGE}/${imageId}`} alt="Pääkuva taukopaikasta" />
    )
  } else if(googleImageId){    
    if(big) {
      return (
        <img 
          style={bigImageStyle} 
          srcSet={` ${googleImageUrl650} 650w,
                    ${googleImageUrl1200} 1200w`}
          sizes={`  (max-width: 650px) 650px,
                    1200px `}
          src={imageUrl1200} 
          alt="Pääkuva taukopaikasta"/>
      )
    }
    return (
      <Image
        style={imageStyle}
        srcSet={`${googleImageUrl290} 290w,
                 ${googleImageUrl333} 333w,
                 ${googleImageUrl650} 650w`}
        sizes="(max-width: 500px) 330px,
               (max-width: 767px) 650px,
               (min-width: 768px) 290px"               
        src={googleImageUrl650} alt="Pääkuva taukopaikasta" />
    )
  } else {
    return <Image 
      style={imageStyle}    
      src={`${BASE_IMAGE_URL}c_fill,w_700/${DEFAULT_IMAGE}`} alt="Pääkuva taukopaikasta ei löytynyt" />
  }  
}

export default PlaceImage;