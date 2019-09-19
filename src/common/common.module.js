(function() {
"use strict";

angular.module('common', ['ngStorage'])
.constant('ApiPath', 'https://davids-restaurant.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
