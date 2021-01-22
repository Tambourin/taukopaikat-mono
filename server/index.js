require("dotenv").config();
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");

let databaseUri = "mongodb://localhost:27017/taukopaikatfi";
if(process.env.NODE_ENV === "production") {
  databaseUri = process.env.MONGODB_URI;
}

mongoose.set("useFindAndModify", false);
mongoose.connect(databaseUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongoDB"))
  .catch(() => console.log("error connecting mongoDB"));

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("listening port:", process.env.PORT);
});



