(function() {
	'use strict';

	angular.module('data').service('MenuDataService', MenuDataService);
	MenuDataService.$inject = ['URL_Categories', 'URL_CategoryName', '$http'];
	function MenuDataService (URL_Categories, URL_CategoryName, $http) {		
		this.getAllCategories = function () {
			return $http.get(URL_Categories);
		};
		this.getItemsForCategory = function (categoryShortName) {
			return $http.get(URL_CategoryName + '' + categoryShortName);
		};
	}
}());
