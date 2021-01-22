import placesService from "../services/placesService";

const SET_LOADING = "SET_LOADING";
const SET_ERRORED = "SET_ERRORED";
const SET_LOADING_SUCCESS = "SET_LOADING_SUCCESS";
const SET_IMAGE = "SET_IMAGE";
const CLEAR = "CLEAR";

const defaultState = {
  loading: false,
  errored: false,
  loadingSuccess: false,
  image: null
};

const imageUploadReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true, errored: false, loadingSuccess: false };
    case SET_ERRORED:
      return { ...state, loading: false, errored: true, loadingSuccess: false };
    case SET_LOADING_SUCCESS:
      return { ...state, loading: false, errored: false, loadingSuccess: true }; 
    case SET_IMAGE:
      return { ...state, image: action.imageData };
    case CLEAR:
      return defaultState;
    default:
      return state;
  }
}

export const setImageAction = (imageData) => {
  return {
    type: SET_IMAGE,
    imageData: imageData
  }
}

export const upLoadAction = (placeId, imageData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const updatedPlace = await placesService.postImage(placeId, imageData); 
      dispatch({ type: SET_LOADING_SUCCESS });
      setTimeout(() => {
        dispatch({ type: CLEAR });
      }, 5000);
      return updatedPlace;
    } catch (error) {
      dispatch({ type: SET_ERRORED });
      setTimeout(() => {
        dispatch({ type: CLEAR });
      }, 5000);
    }    
  }
}

export default imageUploadReducer;