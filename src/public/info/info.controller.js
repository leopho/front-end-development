(function () {
  "use strict";

  angular.module('public')
  .controller('InfoController', InfoController);

  InfoController.$inject = ['CurrentUserService'];

  function InfoController(CurrentUserService) {
    var $ctrl = this;

    $ctrl.userInfo = CurrentUserService.getUserInfo();
    console.log('Info', $ctrl.userInfo);
  }
})();
