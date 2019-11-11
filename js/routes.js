(function() {
	'use strict';
	angular.module('MenuApp').config(RoutesConfig);
	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'menuapp/menuapp.html'
		});

		$stateProvider.state('home.categories', {
			url: 'categories',
			templateUrl: 'categories/categories.html',
			controller: 'CategoriesController',
			controllerAs: 'ctrl',
			resolve: {
				categories: ['MenuDataService', function (MenuDataService) {
					return MenuDataService.getAllCategories().then(function(data){return data.data;});
				}]
			}
		});

		$stateProvider.state('home.categories.items', {
			url: '/items/{categoryName}',
			template: '<items items="ctrl.categoryItems"></items>',
			controller: 'ItemsController',
			controllerAs: 'ctrl',
			resolve: {
				items: ['MenuDataService', '$stateParams',
				 function (MenuDataService, $stateParams) {
					return MenuDataService.getItemsForCategory($stateParams.categoryName).then(function (data) {return data.data;});
				}]
			}
		});
	};
}());
