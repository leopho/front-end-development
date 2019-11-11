(function() {
	'use strict';
	angular.module('MenuApp').component('categories', {
		templateUrl: 'categories/categories-list.html',
		bindings: {
			categories: '<',
			categoryShortName: '@name',
			getName: '&'
		}
	});
}());
