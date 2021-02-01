require("dotenv").config();
const router = require("express").Router();
const Place = require("../models/placeModel");
const cache = require("../middleware/cache");
const fetch = require("node-fetch");
const googleService = require("../services/googleService");
const imageService = require("../services/imageService");

router.get(
  "/",
  cache.getCache,  
  async (request, response, next) => {    
    try {      
      const places = await Place.find({});      
      if (!places || places.length === 0) {
        return response.status(404).send({ error: "no content found" });
      }
      const placesObjects = places.map(place => place.toObject());
      response.locals.data = await googleService.appendPlaces(placesObjects);      
      return next();
    } catch (exception) {
      return response.status(500).send(exception.message);
    }
  },
  cache.setCache
);

router.get("/image/:googleImageId/:width", (request, response) => {
  fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${request.params.width}&photoreference=${request.params.googleImageId}&key=${process.env.GOOGLE_API_KEY}`)
    .then(res => {
      res.body.pipe(response);
    });
});

router.get(
  "/:PlaceId",
  async (request, response, next) => {
    try {
      const place = await Place.findById(request.params.PlaceId);     
      if (!place) {
        return response.status(404).end();
      }      
      response.locals.data = await googleService.appendSinglePlace(place.toObject());
      return next();
    } catch (exception) {
      console.log(exception);
      return response.status(400).end();
    }
  }
);

router.get("/:placeId/google", async (request, response) => {
  try {
    const place = await Place.findById(request.params.placeId);
    const googleData = await googleService.getGoogleData(place.googlePlaceId);
    response.send(googleData);
  } catch(exception) {
    console.log(exception);
    return response.status(400).send({ error: exception });
  }
});

router.post("/", async (request, response) => { 
  cache.flush(); 
  try {  
    let newImageId;
    if (request.body.imageData) {
      newImageId = await imageService.uploadImage(request.body.imageData);
    } else {
      newImageId = null;
    }  
    const googlePlaceId = await googleService.searchGooglePlaceId(request.body.name + " " + request.body.city);   
    
    const place = new Place({
      name: request.body.name,
      description: request.body.description,
      votes: request.body.votes ? request.body.votes : [],
      highway: request.body.highway,
      city: request.body.city,
      comments: [],
      images: newImageId ? [newImageId] : [],
      services: {
        doesNotBelongToChain: request.body.services.doesNotBelongToChain,
        isOpenTwentyFourHours: request.body.services.isOpenTwentyFourHours,
        hasBeenAvarded: request.body.services.hasBeenAvarded,
        isAttraction: request.body.services.isAttraction,
        isSummerCafe: request.body.services.isSummerCafe,
        isGasStation: request.body.services.isGasStation,
        isGrill: request.body.services.isGrill,
        isBakery: request.body.services.isBakery,
        hasMarketplace: request.body.services.hasMarketplace
      },
      googlePlaceId: googlePlaceId
    });
  
    const savedPlace = await place.save();    
    response.send(await googleService.appendSinglePlace(savedPlace.toObject()));
  } catch (exception) {
    console.log(exception.message);
    response.status(500).send({ error: "error saving place " + exception.message });
  }
});

router.put(
  "/:placeId",
  async (request, response) => {    
    cache.flush();
    try {
      const place = await Place.findById(request.params.placeId);
      place.city = request.body.city;
      place.highway = request.body.highway;
      place.services = request.body.services;
      place.save();
      response.send(place.toObject());
    } catch (exception) {
      console.log(exception);
      response.status(500).send({ error: "error updating place " });
    } 
  }  
);

router.post("/:placeId/images", async (request, response) => {  
  cache.flush();
  try {
    const newImageId = await imageService.uploadImage(request.body.imageData);
    if (newImageId === null) {
      return response.status(500).send({ error: "could not save image-file"} );
    }    
    const place = await Place.findById(request.params.placeId);  
    const placeObject = place.toObject();  
    const newPlace = { ...placeObject, images: [ ...placeObject.images, newImageId ] };   
    const updatedPlace = await Place.findByIdAndUpdate(place.id, newPlace, { new: true });    
    response.send(updatedPlace.toObject());
  } catch (exception) {
    response.status(500).send({ error: exception.message });
  }  
});

if (process.env.NODE_ENV === "test") {
  router.get("/delete", async (request, response) => {
    console.log("delete");
    cache.flush();
    await Place.deleteMany({});
    response.status(204).end();
  });

  router.get("/cache/clear", (request, response) => {
    cache.flush();
    response.status(202).end();
  });
}

module.exports = router;
