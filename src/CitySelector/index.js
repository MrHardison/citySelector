require('./style.less');
// Your code...

class CitySelector {
	constructor(elementId, regionsUrl, localitiesUrl, saveUrl) {
		var newId = '';
		var newLocalUrl = '';
		var newRegUrl = '';
		var newSaveUrl = '';

		this.setElementid = function(elementId) {
			newId = elementId;
		};
		this.setRegionsurl = function(regionsUrl) {
			newLocalUrl = regionsUrl;
		};
		this.setLocalitiesurl = function(localitiesUrl) {
			newRegUrl = localitiesUrl;
		};
		this.setSaveurl = function(saveUrl) {
			newSaveUrl = saveUrl;
		};
		this.getId = function() {
			return newId;
		};
	}
	
};
