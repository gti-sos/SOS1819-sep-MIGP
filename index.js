/*eslint-disable eqeqeq, no-else-return*/
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname+"/public"));
app.use(bodyParser.json());

var unemploymentRates =  [{
    country: "Spain",
    year: "2018",
    rate: "14.4",
    youthUnemployment: "33.4",
    maleUnemployment: "12.7",
    femaleUnemployment: "16.2"
    }, {
    country: "Germany",
    year: "2018",
    rate: "3.3",
    youthUnemployment: "15.6",
    maleUnemployment: "3.6",
    femaleUnemployment: "3.9"
    }, {
    country: "France",
    year: "2018",
    rate: "8.9",
    youthUnemployment: "20.3",
    maleUnemployment: "8.8",
    femaleUnemployment: "9.0"
    }, {
    country: "Spain",
    year: "2017",
    rate: "16.5",
    youthUnemployment: "37.1",
    maleUnemployment: "15.0",
    femaleUnemployment: "18.3"
    }, {
    country: "Germany",
    year: "2017",
    rate: "3.6",
    youthUnemployment: "6.5",
    maleUnemployment: "3.9",
    femaleUnemployment: "3.1"
    }, {
    country: "France",
    year: "2017",
    rate: "9.1",
    youthUnemployment: "21.6",
    maleUnemployment: "9.1",
    femaleUnemployment: "9.0"
    }];

// GET /contacts/

app.get("/unemploymentRates", (req,res)=>{
    res.send(unemploymentRates);
    res.sendStatus(200);
});


// POST /unemploymentRates/

app.post("/unemploymentRates", (req,res)=>{
    
    var newRate = req.body;
    
    unemploymentRates.push(newRate);
    
    res.sendStatus(201);
});

app.post("unemploymentRates/:country/:year", (req,res) => {
   res.sendStatus(409); 
});


// DELETE /unemploymentRates/

app.delete("/unemploymentRates", (req,res)=>{
    
    unemploymentRates =  [];

    res.sendStatus(200);
});


// GET /unemploymentRates/Spain

app.get("/unemploymentRates/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;

    var filteredRates = unemploymentRates.filter((c) =>{
       return c.country == country && c.year == year; 
    });
    
    if (filteredRates.length >= 1){
        res.send(filteredRates);
        res.senStatus(200)
    }else{
        res.sendStatus(404);
    }

});


// PUT /unemploymentRates/Spain/2018

app.put("/unemploymentRates/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var updatedRate = req.body;
    var found = false;

    var updatedRates = unemploymentRates.map((c) =>{
    
        if(c.country == country && c.year == year){
            found = true;
            return updatedRate;
        }else{
            return c;            
        }
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        unemploymentRates = updatedRates;
        res.sendStatus(200);
    }

});

//PUT /unemploymentRates/                genera conflicto
app.put("/unemploymentRates/", (req,res) => {
   res.send(409); 
});


// DELETE /unemploymentRates/Spain/2018

app.delete("/unemploymentRates/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var found = false;

    var updatedRates = unemploymentRates.filter((c) =>{
        
            if(c.country == country && c.year == year)  
                found = true;
        
            return c.country != country && c.year == year;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        unemploymentRates = updatedRates;
        res.sendStatus(200);
    }

});



app.listen(port, () => {
    console.log("Super server ready on port " + port);
});