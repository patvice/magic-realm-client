'use strict';

/**
 * @ngdoc function
 * @name comp3004App.controller:GameCtrl
 * @description
 * # MainCtrl
 * Controller of the comp3004App
 */
var url = 'http://localhost:3000/'
// var url = #actually_url

angular.module('MagicRealm')
  .controller('SongBirdCtrl',[
  //-------------------
    // '$rootScope',
    '$scope',
    '$window',
    '$state',
    '$stateParams',
    'ActionQueue',
    'Player',
    'Sjs',
  //-------------------
  function ($scope, $window, $state, $stateParams, ActionQueue, Player, Sjs) {
    ///////////////////
    // Service Players
    ///////////////////
    //
    var load_player = function() {
      $scope.player = new Player(1);
      $scope.player.getPlayerInfo();
    };

    $scope.updateXY = function(){
      $scope.x_y_mouse = $scope.sjs.lastedClicked();
    }
    var init = function(){
    };

    $scope.sjs = new Sjs();
    $scope.x_y_mouse = "0, 0";
    load_player();
}]);
