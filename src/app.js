import CitySelector from './CitySelector';

import $ from 'jquery';

window.jQuery = $;
window.$ = $;


class App{
	constructor(){
		this.init();
	}

	init(){
		$('#createCitySelector').on('click', () => {
			if($("#selectRegion").length === 0){
				console.log('new CitySelector')
				this.citySelector = new CitySelector({
					elementId: 'citySelector',
					regionsUrl: 'http://localhost:7000/regions',
					localitiesUrl: 'http://localhost:7000/localities',
					saveUrl: 'http://localhost:7000/selectedRegions'
				});
			}
		})
		
	}

}

new App();