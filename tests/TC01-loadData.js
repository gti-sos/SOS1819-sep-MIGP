describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('http://localhost:8080');
		var unemploymentRates = element.all(by.repeater('unemploymentRate in unemploymentRates'));
		expect(unemploymentRates.count()).toBeGreaterThan(0);
	});
});