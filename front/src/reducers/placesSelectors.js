import { arrangeOptions } from "./viewOptionsReducer";


export const lastCommentedSelector = places => { 
  if(!places || places.length < 1) {
    return null;
  }
  const reducer = (placeWithLatestComment, currentPlace) => {
    if(!placeWithLatestComment.comments || !currentPlace.comments) {      
      return placeWithLatestComment;
    }
    if(placeWithLatestComment.comments.length < 1 || currentPlace.comments.length < 1)  {      
      return placeWithLatestComment;
    }
    if(currentPlace.comments[currentPlace.comments.length - 1].date > placeWithLatestComment.comments[placeWithLatestComment.comments.length - 1].date) {
      return currentPlace;
    } 
    return placeWithLatestComment;
  }
  return places.reduce(reducer);
}

export const placeWithMostVotes = places => {
  return places.sort((place1, place2) => orderByVotesAndGoogle(place1, place2))[0];  
};

const orderByVotesAndGoogle = (place1 , place2) => {
  if(place1.votes.length > 0 && place2.votes.length > 0) {
    if(place2.votes.length !== place1.votes.length){
      return place2.votes.length - place1.votes.length;
    }
    return place2.googleRating - place1.googleRating;      
  } else if (place2.votes.length > 0) {
    return 1;
  } else if (place1.votes.length > 0) {
    return -1;
  } else {
    return place2.googleRating - place1.googleRating;
  }
}

export const orderPlaces = (places, orderBy) => {
  switch (orderBy) {
    case arrangeOptions.VOTES:       
        return [...places].sort((place1, place2) => orderByVotesAndGoogle(place1, place2)); 
    case arrangeOptions.APLHABETIC:
        return [...places].sort((place1, place2) => { 
          return place1.name > place2.name ? 1 : -1;
        });
    case arrangeOptions.NORTH_TO_SOUTH:
        return [...places].sort((place1, place2) => {
          if(!place1.coordinates || !place1.coordinates.lat) {
            return 1;
          } else if (!place2.coordinates || !place2.coordinates.lat) {
            return 1;
          } else {
            return place2.coordinates.lat - place1.coordinates.lat
          }          
        });          
    case arrangeOptions.SOUTH_TO_NORT:
      return [...places].sort((place1, place2) => {
        if(!place1.coordinates || !place1.coordinates.lat) {
          return 1;
        } else if (!place2.coordinates || !place2.coordinates.lat) {
          return -1;
        } else {
          return place1.coordinates.lat - place2.coordinates.lat
        }          
      });          
    default:
      break;
  }
}

const getDistance = (lat1, lon1, lat2, lon2)  => {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export const nearbyPlacesSelector = (place, places, maxDistance) => {
  if(!places || !place) {
    return null;    
  }  

  return places.filter(p => {
    if (!p.coordinates || !place.coordinates) {      
      return null;
    }

    const dist = getDistance(
      place.coordinates.lat, 
      place.coordinates.lng, 
      p.coordinates.lat, 
      p.coordinates.lng);
    return dist < maxDistance && dist !== 0;
  });
}

export const limitNumberOfPlacesByPercent = (places, percentage) => {
  const numberOfElementsToGet = Math.ceil(percentage / 100 * places.length);
  return [...places].slice(0, numberOfElementsToGet);
}

export const limitNumberOfPlacesByNumber = (places, numberofPlaces) => {  
  return [...places].slice(0, numberofPlaces);
}

export const getFilteredPlaces = (places, filter) => {
  
  const placesFilter = place => {    
    if (
      (filter.highway !== place.highway && filter.highway !== "all") ||
      (filter.doesNotBelongToChain === true &&
        place.services.doesNotBelongToChain === false) ||
      (filter.isOpenTwentyFourHours === true &&
        place.services.isOpenTwentyFourHours === false) ||
      (filter.hasBeenAvarded === true &&
        place.services.hasBeenAvarded === false) ||
      (filter.isAttraction === true &&
        place.services.isAttraction === false) ||
      (filter.isSummerCafe === true && place.services.isSummerCafe === false) ||
      (filter.isGasStation === true && place.services.isGasStation === false) ||
      (filter.isGrill === true && place.services.isGrill === false) ||
      (filter.hasMarketPlace === true && !place.services.hasMarketplace)
    ) {
      return false;
    }

    if(filter.searchWord) {
      const searchWord = filter.searchWord.toLowerCase().trim();      
      const placeName = place.name.toLowerCase();
       
      if(place.city) {        
        const city = place.city.toLowerCase();      
        if (!placeName.includes(searchWord) && !city.includes(searchWord)) {
          return false;
        }
      } else {
        if (!placeName.includes(searchWord)) {
          return false;
        }
      }       
    }
    return true;
  };

  return places.filter(place => placesFilter(place));
};
