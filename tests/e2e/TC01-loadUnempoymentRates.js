describe('Data is loaded: ', function () {
	it('should show a bunch of data', function (){
		browser.get('http://localhost:8080/#!/ui/v1/unemployment-rates');
		
		element.all(by.repeater('unemploymentRate in unemploymentRates'))
			.then(function(unemploymentRates) {
				expect(unemploymentRates.count()).toBeGreaterThan(0);
			});
		
	});
});