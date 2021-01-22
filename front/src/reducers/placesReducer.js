import placesService from "../services/placesService";

const INIT_PLACES = "INIT_PLACES";
const START_LOADING = "START_LOADING";
const LOADING_DONE = "LOADING_DONE";
const SET_LOADING_ERRORED = "SET_LOADING_ERRORED";
const SET_UPLOAD_ERROR_MESSAGE = "UPLOAD_ERROR_MESSAGE";
const UPDATE_PLACE = "UPDATE_PLACE";
const ADD_PLACE = "ADD_PLACE";

const defaultState = {
  data: [],
  isLoading: false,
  loadingErrored: false,
  uploadErrorMessage: null
};

const placesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INIT_PLACES:
      return { ...state, data: action.places };
    case START_LOADING:
      return { ...state, isLoading: true, loadingErrored: false };
    case LOADING_DONE:
      return { ...state, isLoading: false, loadingErrored: false };
    case SET_LOADING_ERRORED:
      console.log("setError");
      return { ...state, loadingErrored: true, isLoading: false };
    case SET_UPLOAD_ERROR_MESSAGE:
      return { ...state, uploadErrorMessage: action.message };
    case ADD_PLACE:
      return { ...state, data: [...state.data, action.place] };
    case UPDATE_PLACE:
      return {
        ...state,
        data: state.data.map(place =>
          place.id === action.place.id ? action.place : place
        )
      };
    default:
      return state;
  }
};
const startLoading = () => {
  return {
    type: START_LOADING
  };
};

const loadingDone = () => {
  return {
    type: LOADING_DONE
  };
};

const setLoadingErrored = () => {
  return {
    type: SET_LOADING_ERRORED
  };
};

const initPlaces = places => {
  return {
    type: INIT_PLACES,
    places: places
  };
};

const updatePlace = place => {
  return {
    type: UPDATE_PLACE,
    place: place
  };
};

export const votePlaceAction = (place, user) => {
  return async (dispatch, getState) => {
    try{
      const placesOnSameHighway = getState().places.data.filter(
        p => p.highway === place.highway
      );
      const placeAlreadyVoted = placesOnSameHighway.find(p =>
        p.votes.includes(user.sub)
      );
      if(placeAlreadyVoted) {
        const placeWhereVoteRemoved = await placesService.removeVote(placeAlreadyVoted.id);
        dispatch(updatePlace(placeWhereVoteRemoved));
      }    
      const updatedPlace = await placesService.addVote(place.id);
      dispatch(updatePlace(updatedPlace));    
      return updatedPlace;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};
/*
export const removeVoteFromPlace = place => {
  return async dispatch => {
    const response = await placesService.removeVote(place.id);
    dispatch(updatePlace(response));
    return response;
  };
};
*/
export const addPlace = place => {
  return async dispatch => {
    dispatch({ type: SET_UPLOAD_ERROR_MESSAGE, message: null });
    try {
      const newPlace = await placesService.postPlace(place);
      dispatch({
        type: ADD_PLACE,
        place: newPlace
      });
      return newPlace;
    } catch (error) {
      dispatch({
        type: SET_UPLOAD_ERROR_MESSAGE,
        message: error.response
          ? error.response.data.error
          : "Ei saada yhteyttä palvelimeen."
      });
      return null;
    }
  };
};

export const addComment = (place, comment) => {
  return async dispatch => {
    try {
      const addedComment = await placesService.postComment(place.id, comment);
      const updatedPlace = {
        ...place,
        comments: [...place.comments, addedComment]
      };
      dispatch(updatePlace(updatedPlace));
      return updatedPlace;
    } catch {
      console.log("Adding a comment failed");
    }
  };
};

export const updatePlaceAction = place => {
  return async dispatch => {
    dispatch(updatePlace(place));
    return place;
  };
};

export const updatePlaceSmartAction = place => {
  return async dispatch => {
    try {
      const response = await placesService.update(place);
      dispatch(updatePlace(response));
      return response;
    } catch {
      console.log("Update failed");
      return null;
    }
  };
};

export const initializePlaces = () => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const places = await placesService.getAll();
      dispatch(initPlaces(places));
      dispatch(loadingDone());
    } catch {
      dispatch(setLoadingErrored());
    }
  };
};

export default placesReducer;
