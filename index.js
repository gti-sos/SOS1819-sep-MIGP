var express = require("express");
var API = require("./API");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

const BASE_PATH = "/api";

app.use(bodyParser.json());

//v1
API.unemploymentRates(app, BASE_PATH);

app.use("/", express.static(path.join(__dirname,"/public")));

var port = process.env.PORT || 3000;

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    console.log("Mangalper1 DB connected!");
        app.listen(port, () => {
            console.log("Server ready on port " +port);
        });
});