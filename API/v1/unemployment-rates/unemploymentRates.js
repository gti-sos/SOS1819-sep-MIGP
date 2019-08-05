const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var unemploymentRates;


client.connect(err => {
  unemploymentRates = client.db("mangalper").collection("unemploymentRates");
  // perform actions on the collection object
});

module.exports = function(app, BASE_PATH){
    var path = "";
    var newUnemploymentRates = [{
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



    
    //API RES 
    
    
    // GET /unemployment-rates/docs/
    path = BASE_PATH + "/unemployment-rates/docs";
    app.get(path, (req,res)=>{
        res.redirect("");
    });
    
    
    //LOAD INITIAL DATA de GET /gas-increases
    path = BASE_PATH + "/unemployment-rates/loadInitialData";
    app.get(path, (req,res)=>{
        unemploymentRates.find({}).toArray((error,unemploymentRatesArray)=>{
            if(unemploymentRatesArray.length!=0){
                res.sendStatus(409);
            } else {
                unemploymentRates.remove();
                newUnemploymentRates.filter((d) =>{
                    unemploymentRates.insert(d);
                });
                res.sendStatus(201);
            }
        });
    });
    
    // GET /gas-increases
    path = BASE_PATH + "/unemployment-rates"; 
    app.get(path, (req,res)=>{
        
        unemploymentRates.find({}).toArray((err, unemploymentRatesArray)=>{
            res.send(unemploymentRatesArray);
        });
    });
    
    // GET /unemployment-rates/Spain/2018
    path = BASE_PATH + "/unemployment-rates/:country/:year";
    app.get(path, (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        var i = 0;
        var rate = null;
        
        unemploymentRates.find({}).toArray((error,unemploymentRatesArray)=>{
            for(i=0;i<unemploymentRatesArray.length;i++)
                if(unemploymentRatesArray[i].country==country && unemploymentRatesArray[i].year == year)
                    rate = unemploymentRatesArray[i];
                    
        
        
        if (rate == null){
            res.sendStatus(404);
            }else{  
               
                delete rate._id;
                res.send(rate);
            }
            
            }); 
    });
       
    
    // POST /unemployment-rates
    path = BASE_PATH + "/unemployment-rates";
    app.post(path, (req, res) => {
    var newRate = req.body;
    var coincide = false;
    var i = 0;
    
        if (newRate.country == null || newRate.year == null ||newRate.rate == null ||newRate.youthUnemployment == null || newRate.maleUnemployment == null || newRate.femaleUnemployment == null ){
            res.sendStatus(400);
        }else{
            unemploymentRates.find({}).toArray((error,unemploymentRatesArray)=>{
                for(i=0;i<unemploymentRatesArray.length;i++)
                    if (unemploymentRatesArray[i].country==newRate.country && unemploymentRatesArray[i].year==newRate.year && unemploymentRatesArray[i].rate==newRate.rate && unemploymentRatesArray[i].youthUnemployment == newRate.youthUnemployment && unemploymentRatesArray[i].maleUnemployment==newRate.maleUnemployment && unemploymentRatesArray[i].femaleUnemployment==newRate.femaleUnemployment)
                        coincide = true;
            
            
            if(coincide == true) {
                res.sendStatus(409);
            }else{ 
                unemploymentRates.insert(newRate);
                res.sendStatus(201);
            } 
            });
        }
        });
        
    //POST a un recurso  
    path = BASE_PATH + "/unemployment-rates/:country/:year";
    app.post(path, (req, res) => {
        res.send(405);
    });

        
    // DELETE /unemployment-rates
    path = BASE_PATH + "/unemployment-rates";
     app.delete(path, (req, res) => {
            
           unemploymentRates.remove();
           res.sendStatus(200);
        
    });
    
    
    // PUT /unemployment-rates/Spain/2018
    path = BASE_PATH + "/unemployment-rates/:country/:year";
    app.put(path, (req, res) => {
        var year = req.params.year;
        var country = req.params.country;
        var updatedData = req.body;
        var found = false;
        var coincide = true;
        var i = 0;
        var updatedRates = [];
        var aut = true;
        
        unemploymentRates.find({}).toArray((error,unemploymentRatesArray)=>{
                for(i=0;i<unemploymentRatesArray.length;i++)
                    if (unemploymentRatesArray[i].year==year && unemploymentRatesArray[i].country==country){
                        if (unemploymentRatesArray[i].year==updatedData.year && unemploymentRatesArray[i].country==updatedData.country){
                            if(updatedData._id != null) {
                                if(unemploymentRatesArray[i]._id != updatedData._id)
                                    aut = false;
                                    found = true;
                            } else {
                            found = true;
                            updatedRates.push(updatedData);
                            }    
                        }else{
                            coincide = false;
                        }
                    } else {
                        updatedRates.push(unemploymentRatesArray[i]);
                    }
            
         if (coincide==false){
            res.sendStatus(400);
        }else if (found==false){
            res.sendStatus(404);
        } else if (aut == false){
            res.sendStatus(401);
        }else{
            unemploymentRates.remove();
            updatedRates.filter((d) =>{
                    unemploymentRates.insert(d);
                });
                res.sendStatus(200);
        }
        });
    });
    
    path = BASE_PATH + "/unemployment-rates";
    app.put(path, (req, res) => {
        res.sendStatus(405);
    });
    
    
    // DELETE /unemployment-rates/Spain/2018
    path = BASE_PATH + "/unemployment-rates/:country/:year";
    app.delete(path, (req,res)=>{
        var year = req.params.year;
        var country = req.params.country;
        var found = false;
        var updatedRates = [];
        var i = 0;
        
        unemploymentRates.find({}).toArray((error,unemploymentRatesArray)=>{
            for(i=0;i<unemploymentRatesArray.length;i++)
                if (unemploymentRatesArray[i].year==year && unemploymentRatesArray[i].country==country)
                    found = true;
                    
                else
                    updatedRates.push(unemploymentRatesArray[i]);
            
            if (found==false)
                res.sendStatus(404);
            else
                unemploymentRates.remove();
                updatedRates.filter((d) =>{
                    unemploymentRates.insert(d);
                });
                res.sendStatus(200);
        });
    });
}