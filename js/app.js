(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', MsgController);

  MsgController.$inject = ['$scope'];
  function MsgController($scope) {
    $scope.message = "";
    $scope.items = "";

    $scope.check = function () {
      var itemList = ($scope.items).split(',') || [];
      itemList = itemList.filter(x => x);

      if (itemList.length === 0) {
        $scope.message = "Please enter data first!";
        $scope.style = "red";
      } else if (itemList.length <= 3) {
        $scope.message = "Enjoy!";
        $scope.style = "green";
      } else {
        $scope.message = "Too much!";
        $scope.style = "green";
      }
    };
  }
})();
