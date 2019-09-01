describe("Check if a new rate can be created: ", function() {
    it("List should grow after the rate creation", function() {
        browser.get("http://localhost:8080/#!/ui/v1/unemployment-rates");
        element(by.css('[value=siguiente]')).click();
        element(by.css('[value=siguiente]')).click();
        element(by.css('[value=siguiente]')).click();
        element.all(by.repeater("unemploymentRate in unemploymentRates"))
            .then(function(initialUnemploymentRates) {
                element(by.model('newRate.country')).sendKeys("USA");
                element(by.model('newRate.year')).sendKeys(2018);
                element(by.model('newRate.rate')).sendKeys(12);
                element(by.model('newRate.youthUnemployment')).sendKeys(20);
                element(by.model('newRate.maleUnemployment')).sendKeys(11);
                element(by.model('newRate.femaleUnemployment')).sendKeys(12);
                element(by.css('[value=add]')).click();
                
                element.all(by.repeater("unemploymentRate in unemploymentRates"))
                    .then(function(finalUnemploymentRates){
                       expect(finalUnemploymentRates.length).toEqual(initialUnemploymentRates.length+1);
                    });
                
            })
    })
});