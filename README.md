# taukopaikat-mono

##Introduction

Taukopaikat is a single page application that lists gas stations, coffees, grills and other rest places along Finnish motorways. The idea is to offer more effective service for users to find places that really are worth a visit. Places are arranged based on their score in Taukopaikat and Google Maps and can be filtered based on a few criteria. Users can vote, comment and post photos of their favorite places. Users are allowed to vote only one place per highway. This approach is chosen to find the best gems. A slider is used in the map view to filter out not so great places.

##Tech

The front uses React -library for frontend while backend runs on Node.js. Global state is managed with Redux, with the help of Redux-Thunk to make async calls to backend from the action creators. Component-specific state is managed with useState-hooks within the components.

Backend provides a simple RESTfull API to get, create and update places, votes and comments. Base information about the places is stored in MondoDB-database hosted in Atlas MongoDB cloud service. The database is connected from Taukopaikat-backend using Mongoose library. Extra information, such as coordinates, ratings and opening hours about the places is retrieved from the Google Place API.

Images which users can upload, are stored and managed in Cloudinary’s cloud service and fetched based on picture ids stored in the database. The front gets images directly from Cloudinary with GET requests to Cloudinary’s API. If no picture information is found, a request is made to Google Place Photo instead. Images are downloaded responsively. Uploading images is managed through backend using Cloudinary’s library.

Auth0 authentication service is used for user authentication. Login takes the user to a login page hosted by Auth0. As a result of successful authentication, the user is redirected back to Taukopaikat page with authentication code which is in turn is exchanged for a jwt-token. The token is used to authorize POST and PUT requests to the backend.

Application is running at https://www.taukopaikat.fi/
