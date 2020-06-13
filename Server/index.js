const express = require("express");
const cors = require("cors");
var timeAgo = require("node-time-ago");
const monk = require("monk");
const mailer = require("./utilities/mailer");
const app = express();

app.use(express.json()); // Needed when working with POST requests (body contains JSON data)
app.use(cors()); // to prevent CORS related issues

const db = monk("localhost/humandb");
const dbfeatures = db.get("features");

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/api/features", async function(req, res) {
  //features.every(feature => (feature.time = timeAgo(feature.time)));
  let allFeaturesInDb = await dbfeatures.find();
  allFeaturesInDb.every(f => (f.time = timeAgo(f.time)));
  res.send(allFeaturesInDb);
});

app.post("/api/features", async function(req, res) {
  var newFeatureToBeAddedToDb = {
    body: req.body.feature,
    author: req.body.name,
    time: Date.now()
  };
  /*features.push(newFeatureToBeAddedToArray);*/
  await dbfeatures.insert(newFeatureToBeAddedToDb);

  // EMAIL SENDING LOGIC

  var mailOptions = {
    from: "--",
    to: "--",
    subject: "Sending Email using Node.js (Human Project exercise)",
    text: "Dear, " + req.body.name + "!"
  };
  let result = await mailer.sendMail(mailOptions);
  console.log(result);

  res.send("Success");
});

app.listen(3000, function() {
  console.log("Server has started listening on Port 3000");
});