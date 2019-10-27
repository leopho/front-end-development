(function () {
  angular.
    module("NarrowItDownApp", []).
    controller("NarrowItDownController", NarrowItDownController).
    service("MenuSearchService", MenuSearchService).
    directive("foundItems", foundItems).
    constant("endPoint", "https://davids-restaurant.herokuapp.com/menu_items.json");

  function foundItems() {
    var foundItems = {
      templateUrl: "loader/items-found.html",
      scope: {
        items: "<",
        onRemove: "&",
        error: "<",
      }
    };
    return foundItems;
  } 

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    this.found = [];
    this.searchTerm = "";
    this.showError = false;
    
    this.searchItem = function () {
      this.found = [];
      if (this.searchTerm) {
        MenuSearchService.getMatchedMenuItems(this.searchTerm).then(function (items) {
          this.found = items;
          this.showError = (this.found.length === 0)
        }.bind(this));
      } else {
        this.showError = (this.found.length === 0)
      }
    }.bind(this);
    this.remove = function (index) {
      this.found.splice(index, 1);
    }.bind(this);
  }

  MenuSearchService.$inject = ["$http", "endPoint"];
  function MenuSearchService($http, endPoint) {
    this.getMatchedMenuItems = function (searchTerm) {
      return $http({url: endPoint,method: 'GET'}).then(function (response) {
        return response.data.menu_items.filter(function (item) {
          return item.description.indexOf(searchTerm) !== -1;
        });
      }).catch(function (error) {
        console.log(error);
      });
    };
  }
})();