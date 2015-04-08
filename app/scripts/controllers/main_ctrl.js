'use strict';

angular.module('MagicRealm')
.controller('MainCtrl',['$scope','$state', 'GameService', function ($scope, $state, Game) {
  $scope.games = []

  Game.index( function(games){
    console.log(games)
    $scope.games = games
  })

  $scope.setup = function(){
    Game.create(function(game){
      var params = {id: game.id}
      $state.go('setup_with_id', params)
    });
  }
}]);
