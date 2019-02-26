const DB_NAME = "decode-tammy";
const DB_COLLECTION = "items";

let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");

let app = express();
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.raw({ type: "*/*" }));

let MongoClient = require("mongodb").MongoClient;
const url = "mongodb://admin:123456c@ds351455.mlab.com:51455/decode-tammy";
let ObjectId = require("mongodb").ObjectId;
let dbo = undefined;
let dbs = MongoClient.connect(url, { useNewUrlParser: true }, (err, allDbs) => {
  if (err) throw err;
  dbs = allDbs;
  dbo = dbs.db(DB_NAME);
});

let getItem = (itemId, cb) => {
  console.log("in get Item");
  dbo.collection(DB_COLLECTION).findOne(ObjectId(itemId), (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    cb(result);
  });
};

let setItem = itemInfo => {
  dbo.collection(DB_COLLECTION).insertOne(itemInfo, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
};

let updateItem = data => {
  console.log("update", data._id);
  dbo
    .collection(DB_COLLECTION)
    .updateOne(
      { _id: data._id },
      { $set: data },
      { upsert: true },
      (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );
};

app.get("/foobar", function(req, res) {
  res.send("Hello world!");
});

app.post("/backup", function(req, res) {
  console.log("in backup");
  let body = JSON.parse(req.body);
  console.log("body", body);
  if (body._id === "") {
    console.log("no id");
    body._id = ObjectId();
  } else {
    console.log("with id");
    body._id = ObjectId(body._id);
  }
  updateItem(body);
  res.send(JSON.stringify({ success: true, newId: body._id }));
});

app.post("/restore", function(req, res) {
  console.log("in restore");
  let body = JSON.parse(req.body);
  console.log(body._id);
  body._id = ObjectId(body._id);
  let cb = function(data) {
    res.send(JSON.stringify({ success: true, state: data }));
  };
  getItem(body._id, cb);
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
