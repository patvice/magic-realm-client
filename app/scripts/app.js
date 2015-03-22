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
    'ui.bootstrap',
    'ngResource',
    'jsonFormatter',
    'SpriteJSLib',
    'underscore'
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
      url: '/setup',
      templateUrl: viewsPath+'setup.html',
      controller: 'SetupCtrl'
    })
    .state('setup_with_id', {
      url: '/setup/:id',
      templateUrl: viewsPath+'setup.html',
      controller: 'SetupCtrl'
    })
    .state('song_bird', {
      url: '/game/song_bird/:id',
      templateUrl: viewsPath+'song_bird.html',
      controller: 'SongBirdCtrl'
    })
    .state('day_phase', {
      url: '/game/day_phase/:id',
      templateUrl: viewsPath+'day_phase.html',
      controller: 'DayPhaseCtrl'
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

angular.module('SpriteJSLib', []).factory('spriteJs', ['$window',
  function ($window) {
    if(typeof $window.sjs === 'undefined'){
      throw 'Spritejs not found.';
    }
    return $window.sjs
  }
]);
angular.module('underscore', []).factory('_', ['$window',
  function ($window) {
    if(typeof $window._ === 'undefined'){
      throw 'Underscore was not found.';
    }
    return $window._
  }
]);

