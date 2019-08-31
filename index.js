var express = require("express");
var API = require("./API");
var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");

var cors = require("cors");

var app = express();

app.use(cors());

const BASE_PATH = "/api";

app.use(bodyParser.json());

//v1
API.unemploymentRates(app, BASE_PATH);

app.use("/", express.static(path.join(__dirname,"/public")));
//app.use("/ui/v1/unemployment-rates", express.static(path.join(__dirname,"/public/unemployment-rates")));

 
//PROXY G12
var APIG12 = "https://sos1819-12.herokuapp.com/api/v1/life-expectancy-stats";
    app.use("/proxyG12", function(req, res) {
        console.log('piped: '+ APIG12);
        req.pipe(request(APIG12)).pipe(res);
    })
    
//PROXY EXTERNA 1 - Weather
var APIExt1 = "https://www.metaweather.com/api/location/753692/";
    app.use("/proxyExt1", function(req, res) {
        console.log('piped: '+ APIExt1);
        req.pipe(request(APIExt1)).pipe(res);
    })
    
var APIExt2 = "http://api.citybik.es/v2/networks?fields=location";
    app.use("/proxyExt2", function(req, res) {
       console.log("piped: "+APIExt2);
       req.pipe(request(APIExt2)).pipe(res);
    });

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