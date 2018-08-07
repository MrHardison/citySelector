const CitySelector = import('./CitySelector');


// Пример создания компонента:
// const citySelector = new CitySelector({
	// 	elementId: 'citySelector',
	// 	regionsUrl: 'http://localhost:3000/regions',
	// 	localitiesUrl: 'http://localhost:3000/localities',
	// 	saveUrl: 'http://localhost:3000/selectedRegions'
	// });
var selector = new CitySelector('citySelector','http://localhost:3000/regions','http://localhost:3000/localities','http://localhost:3000/selectedRegions');