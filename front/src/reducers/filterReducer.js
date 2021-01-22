const SET_HIGHWAY = "SET_HIGHWAY";
const SET_DOES_NOT_BELONG_TO_CHAIN = "SET_DOES_NOT_BELONG_TO_CHAIN";
const SET_IS_OPEN_TWENTY_FOUR_HOURS = "SET_IS_OPEN_TWNETY_FOUR_HOURS";
const SET_HAS_BEEN_AVARDED = "SET_HAS_BEEN_AVARDED";
const SET_IS_ATTRACTION = "SET_IS_ATTRACTION";
const SET_IS_SUMMER_CAFE = "SET_IS_SUMMER_CAFE";
const SET_IS_GAS_STATION = "SET_IS_GAS_STATION";
const SET_IS_GRILL = "SET_IS_GRILL";
const SET_HAS_MARKETPLACE = "SET_HAS_MARKETPLACE"

const SET_SEARCH_WORD = "SET_SEARCH_WORD";


const defaultState = {
  highway: "all",
  doesNotBelongToChain: false,
  isOpenTwentyFourHours: false,
  hasPlayground: false,
  hasRestaurant: false,
  hasCofee: false,
  isAttraction: false,
  hasMarketPlace: false,
  searchWord: ""
}

const filterReducer = (state=defaultState, action) => {
  switch(action.type) {
    case(SET_HIGHWAY):
      return ({ ...state, highway: action.highway });
    case(SET_DOES_NOT_BELONG_TO_CHAIN):    
      return ({...state, doesNotBelongToChain: !state.doesNotBelongToChain });
    case(SET_IS_OPEN_TWENTY_FOUR_HOURS):    
      return ({...state, isOpenTwentyFourHours: !state.isOpenTwentyFourHours });
    case(SET_HAS_BEEN_AVARDED):    
      return ({...state, hasBeenAvarded: !state.hasBeenAvarded });
    case(SET_IS_ATTRACTION):    
      return ({...state, isAttraction: !state.isAttraction });
    case(SET_IS_SUMMER_CAFE):    
      return ({...state, isSummerCafe: !state.isSummerCafe });
    case(SET_IS_GAS_STATION):    
      return ({...state, isGasStation: !state.isGasStation });
    case(SET_IS_GRILL):    
      return ({...state, isGrill: !state.isGrill });
    case(SET_HAS_MARKETPLACE):
    console.log("setHasMarketpla");
      return ({...state, hasMarketPlace: !state.hasMarketPlace });
    case(SET_SEARCH_WORD):
      return ({...state, searchWord: action.searchWord});
    default:
      return state;
  }
}

export const setHighway = (highway) => {  
  return {
    type: SET_HIGHWAY,
    highway: highway
  }
}

export const setSearchWord = (searchWord) => {
  return {
    type: SET_SEARCH_WORD,
    searchWord: searchWord
  }
}

export const setDoesNotBelongToChain = () => ({ type: SET_DOES_NOT_BELONG_TO_CHAIN });
export const setIsOpenTwentyFourHours = () => ({ type: SET_IS_OPEN_TWENTY_FOUR_HOURS });
export const setHasBeenAvarded = () => ({ type: SET_HAS_BEEN_AVARDED });
export const setIsAttraction = () => ({ type: SET_IS_ATTRACTION });
export const setIsSummerCafe = () => ({ type: SET_IS_SUMMER_CAFE });
export const setIsGasStation = () => ({ type: SET_IS_GAS_STATION });
export const setIsGrill = () => ({ type: SET_IS_GRILL });
export const setHasMarketplace = () => ({ type: SET_HAS_MARKETPLACE });

export default filterReducer;