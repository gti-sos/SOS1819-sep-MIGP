const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var unemploymentRates;

client.connect(err => {
    unemploymentRates =  client.db("mangalper").collection("unemploymentRates");
    console.log("Mangalper1 DB connected!");
});


module.exports = function(app, BASE_PATH) {
    var path = "";
    var newUnemploymentRates =  [{
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
    
//GET /unemployment-rates/loadInitialData
path = BASE_PATH + "/unemployment-rates/loadInitialData";
app.get(path, (req,res) => {
    if(unemploymentRates.length == 0) {
        res.sendStatus(409);
    } else {
        unemploymentRates.remove();
        newUnemploymentRates.filter((d) => {
                unemploymentRates.insert(d);
        });
        res.sendStatus(201);
    }
    
});

// GET /unemployment-rates/
path = BASE_PATH + "/unemployment-rates";
app.get(path, (req,res)=>{
    unemploymentRates.find({}).toArray((error, ratesArray)=>{
        res.send(ratesArray);
        res.sendStatus(200);
    });
    
});


// POST /unemployment-rates/
path = BASE_PATH + "/unemployment-rates"
app.post(path, (req,res)=>{
    
    var newRate = req.body;
    var coincide = false;
    var i = 0;
    
    if(newRate.country == null || newRate.year == null || newRate.rate == null || newRate.youthUnemployment == null || newRate.maleUnemployment == null || newRate.femaleUnemployment == null ) {
        res.sendStatus(400);
    } else {
        unemploymentRates.find({}).toArray((error, unemploymentRatesArray) => {
            for(i=0;i<unemploymentRatesArray.length;i++){
                if(unemploymentRatesArray[i].country == newRate.country && unemploymentRatesArray[i].year == newRate.year && unemploymentRatesArray[i].rate == newRate.rate && unemploymentRatesArray[i].youthUnemployment == newRate.youthUnemployment && unemploymentRatesArray[i].maleUnemployment == newRate.maleUnemployment && unemploymentRatesArray[i].femaleUnemployment == newRate.femaleUnemployment ) {
                    coincide = true;
                }
            }
            
            if(coincide == true) {
                res.sendStatus(409);
            } else {
                unemploymentRates.insert(newRate);
                res.sendStatus(201);
            }
        })
    }
});


//POST fallido
path = BASE_PATH + "unemployment-rates/:country/:year";
app.post(path, (req,res) => {
   res.sendStatus(409); 
});


// DELETE /unemployment-rates/

app.delete("/unemployment-rates", (req,res)=>{
    
    unemploymentRates.remove();
    res.sendStatus(200);
});


// GET /unemployment-rates/Spain/2018

path = BASE_PATH + "/unemployment-rates/:country/:year";
app.get(BASE_PATH, (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var rate = [];
    var i = 0;
    
    unemploymentRates.find({}).toArray((error, unemploymentRatesArray)=> {
        for(i=0;i<unemploymentRatesArray.length;i++){
            if(unemploymentRatesArray[i].country == country && unemploymentRatesArray[i].year == year) {
                rate.push(unemploymentRatesArray[i]);
            }
        }
    });
    
    
    if (rate.length == 1){
        res.send(delete rate[0]._id);
        res.senStatus(200);
    }else{
        res.sendStatus(404);
    }

});
 

// PUT /unemployment-rates/Spain/2018

app.put("/unemployment-rates/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var updatedRate = req.body;
    var found = false;
    var i = 0;

    var updatedRates = [];
    
    unemploymentRates.filter({}).toArray((error, unemploymentRatesArray) => {
       for(i=0;unemploymentRatesArray.length;i++){
           if(unemploymentRatesArray[i].country == country && unemploymentRatesArray.year == year) {
               found == true;
               updatedRates.push(updatedRate);
           } else {
               updatedRates.push(unemploymentRatesArray[i]);
           }
       } 
    });
    
    if(found == true) {
        res.sendStatus(200);
        unemploymentRates.remove();
        updatedRates.filter((d) => {
            unemploymentRates.insert(d);
        });
    } else {
        res.sendStatus(404);
    }

});

//PUT /unemployment-rates/                genera conflicto
path = BASE_PATH + "/unemployment-rates/";
app.put(path, (req,res) => {
   res.send(409); 
});


// DELETE /unemployment-rates/Spain/2018
path = BASE_PATH + "/unemployment-rates/:country/:year";
app.delete(path, (req,res)=>{

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
}

