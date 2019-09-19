describe('The menu service', function() {
  'use strict';

  var $httpBackend;
  var menuService;
  var ApiPath;

  // Sample data to mock http requests
  var testData = {
    aCategory: {
      id: 61,
      short_name: "A",
      name: "Lunch",
      special_instructions: "Sunday-Friday 11:15am-3:00pm. Served with your choice of rice (Vegetable Fried RIce, Steamed Rice, Brown Rice), AND EITHER soup (Hot & Sour, Wonton, Vegetable, Egg Drop, Chicken Corn Soup) OR veggie egg roll. $1.00 extra to have both soup and egg roll.",
      created_at: "2016-08-05T19:41:59.147Z",
      updated_at: "2016-08-05T19:41:59.147Z"
    },
    blankCategory: {
    }
  };

  /**
   * Gets called before each unit test it()
   */
  beforeEach(function() {
    // Load module
    module('common');

    // Load any dependencies
    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      menuService = $injector.get('MenuService');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should retrieve a valid menu item when a category code is specified', function() {
    var categoryShortname = 'A';

    $httpBackend.expectGET(ApiPath + '/categories/' + categoryShortname + '.json').respond(testData.aCategory);
    menuService.getCategory(categoryShortname).then(function(items) {
      expect(items).toEqual(testData.aCategory);
    });

    $httpBackend.flush();
  });

  it('should return an error menu item when no category code is specified', function() {
    var categoryShortname = '';
    var wasRejected = false;

    $httpBackend.expectGET(ApiPath + '/categories/' + categoryShortname + '.json').respond(404, testData.blankCategory);
    menuService.getCategory(categoryShortname).then(function(items) {
    }, function(items, status) {
      wasRejected = true;
    });
    $httpBackend.flush();

    expect(wasRejected).toBeTruthy();
  });
});
