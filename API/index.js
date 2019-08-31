var v1 = require("./v1");

module.exports = {
    unemploymentRates : function(app, BASE_PATH){ 
        v1.unemploymentRates(app, BASE_PATH+"/v1");
    }
}