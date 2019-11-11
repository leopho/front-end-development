(function() {
	'use strict';
	angular.module('data', [])
	.constant('URL_Categories'  , 'https://davids-restaurant.herokuapp.com/categories.json')
	.constant('URL_CategoryName', 'https://davids-restaurant.herokuapp.com/menu_items.json?category=');
}());
