(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
  
function LunchCheckController($scope) {
    $scope.message = "";
    $scope.items = "";

    $scope.check = function () {
      var itemList = ($scope.items).split(',') || [];
      var count = 0;
      for(var i in itemList){
        var item = itemList[i].trim();
        if(item !== ""){
          count++;
        }
      }
      if (count === 0) {
        $scope.message = "Please enter data first!";
        $scope.style = "red";
      } else if (count <= 3) {
        $scope.message = "Enjoy!";
        $scope.style = "green";
      } else {
        $scope.message = "Too much!";
        $scope.style = "green";
      }
    };
  }
})();
