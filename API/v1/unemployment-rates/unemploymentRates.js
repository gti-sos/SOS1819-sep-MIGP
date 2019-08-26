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
        year: 2018,
        rate: 14.4,
        youthUnemployment: 33.4,
        maleUnemployment: 12.7,
        femaleUnemployment: 16.2
        },
        {
        country: "Germany",
        year: 2018,
        rate: 3.3,
        youthUnemployment: 15.6,
        maleUnemployment: 3.6,
        femaleUnemployment: 3.9
        },
        {
        country: "France",
        year: 2018,
        rate: 8.9,
        youthUnemployment: 20.3,
        maleUnemployment: 8.8,
        femaleUnemployment: 9
        },
        {
        country: "UUEE",
        year: 2018,
        rate: 3.9,
        youthUnemployment: 8.7,
        maleUnemployment: 3.9,
        femaleUnemployment: 3.8
        },
        {
        country: "UK",
        year: 2018,
        rate: 4.0,
        youthUnemployment: 11.8,
        maleUnemployment: 4.1,
        femaleUnemployment: 3.9
        },
        {
        country: "Spain",
        year: 2017,
        rate: 16.5,
        youthUnemployment: 37.1,
        maleUnemployment: 15,
        femaleUnemployment: 18.3
        },
        {
        country: "Germany",
        year: 2017,
        rate: 3.6,
        youthUnemployment: 6.5,
        maleUnemployment: 3.9,
        femaleUnemployment: 3.1
        },
        {
        country: "France",
        year: 2017,
        rate: 9.1,
        youthUnemployment: 21.6,
        maleUnemployment: 9.1,
        femaleUnemployment: 9
        },
        {
        country: "UUEE",
        year: 2017,
        rate: 4.1,
        youthUnemployment: 8.9,
        maleUnemployment: 4.1,
        femaleUnemployment: 4.0
        },
        {
        country: "UK",
        year: 2017,
        rate: 4.4,
        youthUnemployment: 12.5,
        maleUnemployment: 4.4,
        femaleUnemployment: 4.4
        },
        {
        country: "Spain",
        year: 2016,
        rate: 18.5,
        youthUnemployment: 42.3,
        maleUnemployment: 17.1,
        femaleUnemployment: 20.2
        },
        {
        country: "Germany",
        year: 2016,
        rate: 3.9,
        youthUnemployment: 6.7,
        maleUnemployment: 4.3,
        femaleUnemployment: 3.4
        },
        {
        country: "France",
        year: 2016,
        rate: 9.9,
        youthUnemployment: 23.2,
        maleUnemployment: 10.0,
        femaleUnemployment: 9.8
        },
        {
        country: "UUEE",
        year: 2016,
        rate: 4.7,
        youthUnemployment: 9.8,
        maleUnemployment: 4.8,
        femaleUnemployment: 4.6
        },
        {
        country: "UK",
        year: 2016,
        rate: 4.8,
        youthUnemployment: 12.6,
        maleUnemployment: 4.9,
        femaleUnemployment: 4.6
        }
        
        
  ];



    
    //API RES 
    
    
    // GET /unemployment-rates/docs/
    path = BASE_PATH + "/unemployment-rates/docs";
    app.get(path, (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/6914720/SVYqQfLL");
    });
    
    
    //LOAD INITIAL DATA de GET /gas-increases
    path = BASE_PATH + "/unemployment-rates/loadInitialData";
    app.get(path, (req,res)=>{
        unemploymentRates.find({}).toArray((error,unemploymentRatesArray)=>{
            if(unemploymentRatesArray.length!=0){
                res.sendStatus(409);
            } else {
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
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        
        if(from && to) {
            unemploymentRates.find({ year: {$gte: from, $lte: to}}).skip(offset).limit(limit).toArray((err, unemploymentRatesArray)=>{
                if(unemploymentRatesArray.length == 0)
                    res.sendStatus(404);
                else 
                    res.send(unemploymentRatesArray.map((p)=>{
                        delete p._id;
                        return p;
                    }));
                    
            
        });
        } else {
            unemploymentRates.find({}).skip(offset).limit(limit).toArray((err, unemploymentRatesArray)=>{
                if(unemploymentRatesArray.length == 0)
                    res.sendStatus(404);
                else 
                    res.send(unemploymentRatesArray.map((p)=>{
                        delete p._id;
                        return p;
                    }));
                    
            });
        }
        
        
        
        
    });
    
    // GET /unemployment-rates/Spain
    path = BASE_PATH + "/unemployment-rates/:country";
    app.get(path, (req, res) => {
        var country = req.params.country;
        unemploymentRates.find({"country": country}).toArray((err, unemploymentRatesArray) => {
            res.send(unemploymentRatesArray.map((c) => {
                return c;
            }))
        })
    })
    
    
    // GET /unemployment-rates/Spain/2018
    path = BASE_PATH + "/unemployment-rates/:country/:year";
    app.get(path, (req, res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        var i = 0;
        var rate = null;

        
        unemploymentRates.find({"country": country, "year": year}).toArray((error,unemploymentRatesArray)=>{
            
                    
        
        
            if (unemploymentRatesArray.length == 0){
                res.sendStatus(404);
                }else{  
                   
                   
                    res.send(unemploymentRatesArray.map((c)=>{
                        delete c._id;
                        return c;
                    })[0]);
                }
                
                }); 
    });
       
    
    // POST /unemployment-rates
    path = BASE_PATH + "/unemployment-rates";
    app.post(path, (req, res) => {
    var newRate = {
        "country": req.body.country,
        "year": Number(req.body.year),
        "rate": Number(req.body.rate),
        "youthUnemployment": Number(req.body.youthUnemployment),
        "maleUnemployment": Number(req.body.maleUnemployment),
        "femaleUnemployment": Number(req.body.femaleUnemployment)
    }
    
    var posted = req.body;


    var coincide = false;
    var i = 0;
    
        if (posted.country == null || posted.year == null ||posted.rate == null || posted.youthUnemployment == null || posted.maleUnemployment == null || posted.femaleUnemployment == null 
            || req.body.country == "" || req.body.year == "" ||req.body.rate == "" || req.body.youthUnemployment == "" || req.body.maleUnemployment == "" || req.body.femaleUnemployment == "" ){
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
        var year = parseInt(req.params.year);
        var country = req.params.country;
        var updatedData = req.body;
        
        if(updatedData.year != year || updatedData.country != country)
            res.sendStatus(400);
        else
            unemploymentRates.update({"country": country, "year": year}, updatedData);
            res.sendStatus(200);
        
        
        
        
    });
    
    path = BASE_PATH + "/unemployment-rates";
    app.put(path, (req, res) => {
        res.sendStatus(405);
    });
    
    
    // DELETE /unemployment-rates/Spain/2018
    path = BASE_PATH + "/unemployment-rates/:country/:year";
    app.delete(path, (req,res)=>{
        var country = req.params.country;
        var year = parseInt(req.params.year);       
        var tam = unemploymentRates.length;
        
        unemploymentRates.find({"country": country, "year": year}).toArray((err, unemploymentRatesArray) => {
            if(unemploymentRatesArray.length == 0)
                res.sendStatus(404);
            else 
                unemploymentRates.remove({"country": country, "year": year});
                res.sendStatus(200);
        })
        
        
        
       
        
    });
}