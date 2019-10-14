(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.service('ShoppingListService', ShoppingListService)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.filter('price', PriceFilter);

  function PriceFilter() {
    return function (input, prefix) {
      console.log(input, prefix);
      return prefix + parseFloat(input).toFixed(2);
    };
  }

  function ShoppingListService() {
    var service = this;
    var toBuyItems = [];
    var boughtItems = [];

    service.addItem = function (itemName, quantity, price) {
      var item = {
        name: itemName,
        quantity: quantity,
        pricePerItem: price
      };
      toBuyItems.push(item);
    };

    service.boughtItem = function (index) {
      boughtItems.push(toBuyItems[index]);
      toBuyItems.splice(index, 1);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.getTotalCost = function () {
      var totalCost = 0;
      angular.forEach(boughtItems, function(item, key) {
        totalCost += item.quantity * item.pricePerItem;
      });
      console.log(totalCost);
      return totalCost;
    };
  }

  ToBuyController.$inject = ['$scope', 'ShoppingListService'];
  function ToBuyController($scope, ShoppingListService) {
    var list = [
      { name: "cookie", quantity: 5, pricePerItem: 2.99 },
      { name: "milk", quantity: 3, pricePerItem: 1.99 },
      { name: "egg", quantity: 10, pricePerItem: 0.49 },
      { name: "cheese", quantity: 2, pricePerItem: 0.99 },
      { name: "potato", quantity: 4, pricePerItem: 1.99 },
      { name: "tomato", quantity: 2, pricePerItem: 0.99 }
    ];

    for (var i = 0; i < list.length; i++) {
      try {
        ShoppingListService.addItem(list[i].name, list[i].quantity, list[i].pricePerItem);
      } catch (error) {
        console.log(error);
      }
    }

    $scope.items = ShoppingListService.getToBuyItems();

    $scope.boughtItem = function (itemIndex) {
      ShoppingListService.boughtItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['$scope', 'ShoppingListService'];
  function AlreadyBoughtController($scope, ShoppingListService) {
    $scope.items = ShoppingListService.getBoughtItems();
    $scope.getTotalCost = function() {
      return ShoppingListService.getTotalCost();
    }
  }
})();