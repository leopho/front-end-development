(function () {
  "use strict";

  angular.module('public')
  .controller('SignupController', SignupController);

  /**
   * Handles login form credentials and redirects user to page.
   */
  SignupController.$inject = ['$state', 'MenuService', 'CurrentUserService'];

  function SignupController($state, MenuService, CurrentUserService) {
    var $ctrl = this;

    $ctrl.firstname = '';
    $ctrl.lastname = '';
    $ctrl.email = '';
    $ctrl.phone = '';
    $ctrl.favorite = '';

    /**
     * Handles when user clicks the save button.
     */
    $ctrl.save = function () {
      CurrentUserService.saveUserInfo($ctrl.firstname, $ctrl.lastname, $ctrl.email, $ctrl.phone, $ctrl.favorite);
      $ctrl.displayMessage = true;
    };

    $ctrl.valid = function () {
      return ($ctrl.firstname !== '' && $ctrl.lastname !== '' &&
        $ctrl.email !== '' && $ctrl.phone !== '');
    };

    $ctrl.validateMenuItem = function() {
      // only check if favorite item is two characters in length
      if ($ctrl.favorite && $ctrl.favorite.length == 2) {
        $ctrl.favorite = $ctrl.favorite.toUpperCase();

        MenuService.getCategory($ctrl.favorite).then(function(response) {
          // do nothing if valid entry
        }, function(response) {
          $ctrl.favoriteError = true;
        });
      }
    };
  }
})();
