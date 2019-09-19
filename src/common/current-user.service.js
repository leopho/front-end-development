(function () {
  "use strict";

  angular.module('common')
  .service('CurrentUserService', CurrentUserService);

  /**
   * Used to store and track information about the currently logged in user.
   * This is intended to be injected any time we need some user metadata
   **/
  function CurrentUserService() {
    var service = this;

    var _user = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      favorite: '',
      valid: false
    };

    /**
     * Save the current user with user information
     */
    service.saveUserInfo = function (firstName, lastName, email, phone, favorite) {
      _user.firstname = firstName;
      _user.lastname = lastName;
      _user.email = email;
      _user.phone = phone;
      _user.favorite = favorite;
      _user.valid = true;

      sessionStorage.userInfo = JSON.stringify(_user);
    };


    /**
     * Load the current user with user information
     */
    service.getUserInfo = function () {
      // var rtn = JSON.parse($localStorage.getItem("userInfo"));
      var rtn = sessionStorage.userInfo;

      if (rtn != undefined && rtn != 'undefined') {
        _user = JSON.parse(rtn);
      }

      return _user;
    };
  }
})();
