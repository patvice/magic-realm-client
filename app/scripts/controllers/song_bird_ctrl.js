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
  .controller('SongBirdCtrl',['$rootScope','$scope','$window','$state','$stateParams','ActionQueue','Player',
  function ($rootScope, $scope, $window,$state, $stateParams, ActionQueue, Player) {
    var sjs = $window.sjs
    var game_height = 705;
    var game_width = 725;
    $rootScope.scene = sjs.Scene({w:game_width, h:game_height});
    var scene = $rootScope.scene;
    var layer = scene.Layer('board', {useCanvas:false});
    var input = scene.Input();

    sjs.debug = true;

    var mouse = input.mouse

    var background = layer.Sprite('images/map-v2-clean.gif');
    background.move(0, 0);

    var clearing = scene.Layer('clearning', {useCanvas:true});
    var buildings = scene.Layer('buildings', {userCanvas:true});
    var objects = scene.Layer('objects', {userCanvas:true})
    var spriteObjects = {};
    spriteObjects.circle = clearing.Sprite('images/circle.gif')

    $scope.x_mouse = 0;
    $scope.y_mouse = 0;
    $scope.x_y_mouse = "0, 0";

    $scope.move_circle = function (x, y){
      $scope.x_mouse = mouse.position.x;
      $scope.y_mouse = mouse.position.y;
      $scope.$apply()

      spriteObjects.circle.position(x-12, y-12);
    };

    var paint = function() {
      background.update();
      Object.keys(spriteObjects).forEach(function (key) {
        var value = spriteObjects[key]
        if(Array.isArray(value)){
          value.forEach(function(v){
            v.update();
          });
        }else{
          value.update();
        }
      });
      if(input.mouse.click) {
        $scope.lasted_clicked();
      }
      if(mouse.position.x !== $scope.x_mouse && mouse.position.y !== $scope.y_mouse){
        $scope.move_circle(mouse.position.x, mouse.position.y)
      }
    };
    $scope.lasted_clicked = function(){
      $scope.x_y_mouse = mouse.position.x+", "+mouse.position.y;
      $scope.$apply();
    }

    $scope.ticker = scene.Ticker(5, paint);
    $scope.ticker.run();
}]);
