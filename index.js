/*eslint-disable eqeqeq, no-else-return*/
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var API = require("./API");
var path = require("path");

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const BASE_PATH = "/api";

var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname+"/public"));
app.use(bodyParser.json());

//v1
API.unemploymentRates(app, BASE_PATH);
client.connect(err => {
    console.log("Mangalper1 DB connected!");
    app.listen(port, () => {
        console.log("Server ready on port " +port);
    });
    
});










