require("dotenv").config();
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");

let databaseUri = "mongodb://localhost:27017/taukopaikatfi";
if(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "cypress-test") {
  databaseUri = process.env.MONGODB_URI;
}
if(process.env.NODE_ENV === "test") {
  databaseUri = process.env.MONGODB_TEST_URI;
}

mongoose.set("useFindAndModify", false);
mongoose.connect(databaseUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongoDB"))
  .catch(() => console.log("error connecting mongoDB"));

const server = http.createServer(app);

const port = process.env.PORT ? process.env.PORT : 3001;
server.listen(port, () => {
  console.log("listening port:", port);
});



