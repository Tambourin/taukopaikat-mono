import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import './index.css';

import App from './App';
import placesReducer from "./reducers/placesReducer";
import filterReducer from "./reducers/filterReducer";
import viewOptionsReducer from "./reducers/viewOptionsReducer";
import activeGoogleDataReducer from "./reducers/activeGoogleDataReducer";
import imageUploadReducer from "./reducers/imageUploadReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  places: placesReducer,
  activeGoogleData: activeGoogleDataReducer,
  user: userReducer,
  imageUpload: imageUploadReducer,
  filter: filterReducer,
  viewOptions: viewOptionsReducer
});
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>  
  , document.getElementById('root')
);

//For tests
if (window.Cypress) {
  window.store = store;
}