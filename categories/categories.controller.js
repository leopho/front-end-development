(function() {
	'use strict';
	angular.module('MenuApp').controller('CategoriesController', CategoriesController);
	CategoriesController.$inject = ['categories'];
	function CategoriesController (categories) {
		this.categories = categories;
		this.categoryShortName = '';
		this.getName = function (name) {
			this.categoryShortName = name;
		}.bind(this);
	};
}());
