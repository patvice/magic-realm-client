'use strict';

/**
 * @ngdoc function
 * @name comp3004App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comp3004App
 */
angular.module('MagicRealm')
.controller('MainCtrl',['$scope', 'Game', function ($scope, Game) {
  $scope.games = []

  Game.index( function(games){
    $scope.games = games
  })
}]);
