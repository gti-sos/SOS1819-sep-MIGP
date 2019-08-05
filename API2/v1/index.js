var unemploymentRates = require("./unemployment-rates/unemploymentRates.js");

module.exports = {
    unemploymentRates : function(app, BASE_PATH){
        unemploymentRates(app, BASE_PATH);
    }
};