import placesService from "../services/placesService";

const INIT_ACTIVE_GOOGLE_DATA = "INIT_ACTIVE_GOOGLE_DATA";
const SET_IS_LOADING_GOOGLE = "SET_IS_LOADING_GOOGLE";
const SET_LOADING_GOOGLE_ERRORED = "SET_LOADING_GOOGLE_ERRORED";
const CLEAR_ACTIVE_GOOGLE_DATA = "CLEAR_ACTIVE_GOOGLE_DATA";

const defaultState = {
  data: {},
  isLoading: false,
  loadingErrored: false
}

const activeGoogleDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INIT_ACTIVE_GOOGLE_DATA:            
      return { ...state, data: action.place }
    case SET_IS_LOADING_GOOGLE:
      return { ...state, isLoading: action.isLoading, loadingErrored: false }
    case SET_LOADING_GOOGLE_ERRORED:
      return { ...state, loadingErrored: true, isLoading: false }
    case CLEAR_ACTIVE_GOOGLE_DATA:
      return defaultState;
    default:
      return state;
  }
}

export const clearActiveGoogleData = () => {
  return {
    type: CLEAR_ACTIVE_GOOGLE_DATA
  }
}

export const initActiveGoogleData = (id) => {
  return async (dispatch) => {    
    dispatch({ type: SET_IS_LOADING_GOOGLE, isLoading: true });
    try {
      const placeData = await placesService.getGoogleDataByPlaceId(id);  
      if (placeData === null) {        
        dispatch({ type: SET_LOADING_GOOGLE_ERRORED, loadingErrored: true });
        return null;
      }      
      dispatch({
        type: INIT_ACTIVE_GOOGLE_DATA,
        place: placeData
      });
      dispatch({ type: SET_IS_LOADING_GOOGLE, isLoading: false });
      return placeData;
    } catch {
      dispatch({ type: SET_LOADING_GOOGLE_ERRORED, loadingErrored: true });  
    }
  }
}

export default activeGoogleDataReducer;