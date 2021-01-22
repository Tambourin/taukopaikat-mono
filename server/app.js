require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const jwtCheck = require("./middleware/tokenValidation");
const bodyParser = require("body-parser");
const httpToHttpsRedirect = require("./middleware/httpToHttpsRedirect");
const placeController = require("./controllers/placesController");
const votesController = require("./controllers/votesController");
const commentsController = require("./controllers/commentsController");

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV !== "production") {
  app.use(cors());
}
if(process.env.NODE_ENV === "production") {
  app.use(cors({
    origin: "https://www.taukopaikat.fi"
  }));
  app.enable("trust proxy");
  app.use(httpToHttpsRedirect);
}

app.use(bodyParser.json({ limit: "20MB" } ));
app.use(express.static(path.join(__dirname, "../front/build"), {
  etag: false
}));

app.get("/redirect", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/places/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post("*", jwtCheck, (request, response, next) => {
  next();
});
app.put("*", jwtCheck, (request, response, next) => {
  next();
});
app.delete("*", jwtCheck, (request, response, next) => {
  next();
});
app.options("/api/places/:placeId/votes", cors());
app.use("/api/places", placeController);
app.use("/api/places", votesController);
app.use("/api/places", commentsController);

module.exports = app;