describe("Check if a rate can be removed: ", function() {
    it("List should decrease after the rate removing", function() {
        browser.get("http://localhost:8080/#!/ui/v1/unemployment-rates");
        element.all(by.repeater("unemploymentRate in unemploymentRates"))
            .then(function(initialUnemploymentRates) {
                
                element.all(by.css('[value=delete]')).last().click();
                
                element.all(by.repeater("unemploymentRate in unemploymentRates"))
                    .then(function (finalUnemploymentRates) {
                        expect(finalUnemploymentRates.length).toEqual(initialUnemploymentRates.length-1);
                    });
            });
    });
});