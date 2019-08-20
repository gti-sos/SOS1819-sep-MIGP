exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	chromeOnly: true,
	specs: [
		"e2e/TC01-loadDataUnemploymentRates.js",
		"e2e/TC02-newRate.js",
		"e2e/TC03-deleteRate.js"]

};