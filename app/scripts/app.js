'use strict';

/**
 * @ngdoc overview
 * @name comp3004App
 * @description
 * # comp3004App
 *
 * Main module of the application.
 */
var app = angular
  .module('MagicRealm', [
    'ui.router',
    'ngAria',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'jsonFormatter'
]);

var viewsPath = 'views/';

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: viewsPath+'main.html',
      controller: 'MainCtrl'
    })
    .state('setup', {
      url: '/setup/:id',
      templateUrl: viewsPath+'setup.html',
      controller: 'SetupCtrl'
    })
    .state('game', {
      url: '/game',
      templateUrl: viewsPath+'game.html',
      controller: 'GameCtrl'
    });
})
.run(function($state, $rootScope) {
  $state.go('main');
  $rootScope.$state = $state;
});

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);


