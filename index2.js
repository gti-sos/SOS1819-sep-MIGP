/*eslint-disable eqeqeq */
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var port = process.env.PORT || 3000;

app.use("/", express.static(__dirname+"/public"));
app.use(bodyParser.json());

var unemploymentRates =  [{
    contry: "Spain",
    year: "2018",
    rate: "14.4",
    youthUnemployment: "33.4",
    maleUnemployment: "12.7",
    femaleUnemployment: "16.2"
    }, {
    contry: "Germany",
    year: "2018",
    rate: "3.3",
    youthUnemployment: "15.6",
    maleUnemployment: "3.6",
    femaleUnemployment: "3.9"
    }, {
    contry: "France",
    year: "2018",
    rate: "8.9",
    youthUnemployment: "20.3",
    maleUnemployment: "8.8",
    femaleUnemployment: "9.0"
    }, {
    contry: "Spain",
    year: "2017",
    rate: "16.5",
    youthUnemployment: "37.1",
    maleUnemployment: "15.0",
    femaleUnemployment: "18.3"
    }, {
    contry: "Germany",
    year: "2017",
    rate: "3.6",
    youthUnemployment: "6.5",
    maleUnemployment: "3.9",
    femaleUnemployment: "3.1"
    }, {
    contry: "France",
    year: "2017",
    rate: "9.1",
    youthUnemployment: "21.6",
    maleUnemployment: "9.1",
    femaleUnemployment: "9.0"
    }];
    
// GET/unemploymentRates
app.get("/unemploymentRates", (req, res) => {
    res.send(unemploymentRates);
});

// POST/unemploymentRates
app.post("/unemploymentRates", (req,res) => {
    var newRate = req.body;
    unemploymentRates.push(newRate);
    res.sendStatus(201);
});

// DELETE/unemploymentRates
app.delete("/unemploymentRates", (req,res) => {
    unemploymentRates = [];
    res.sendStatus(200);
});

// GET/unemploymentRates/Spain
app.get("/unemploymentRates/:country", (req, res) => {
    var country = req.params.country;
    var filteredRates = unemploymentRates.filter((c) => {
        return c.country == country;
    });
    
    res.send(country);
    if(filteredRates.length >= 1) {
        res.send(filteredRates[0]);
    } else {
        res.sendStatus(404);
    }
});

//PUT/unemploymentRates/:country/:year
app.put("/unemploymentRates/:country/:year" , (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    var updatedRates = req.body;
    var found = false;
    
    var unemploymentRates = unemploymentRates.map((c) => {
        if(c.country == country && c.year == year){
            found == true;
            return updatedRates;
        } else {
            return c;
        }
    });
    
    if(found == false) {
        res.sendStatus(404);
    }
});




app.listen(port, () => {
    console.log("Se ha abierto en el puerto "+ port);
});