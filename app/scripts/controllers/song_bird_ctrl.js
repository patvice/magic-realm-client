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
    'spriteJs',
    'ActionQueue',
    'Player',
    'MapBuilder',
  //-------------------
  function ($scope, $window, $state, $stateParams, spriteJs, ActionQueue, Player, MapBuilder) {

    var sjs = spriteJs
    var game_height = 650;
    var game_width = 725;
    var scene = sjs.Scene({w:game_width, h:game_height});
    var input = scene.Input();

    sjs.debug = true;

    var mouse = input.mouse

    var board = scene.Layer('board', {useCanvas:false});
    $scope.background = MapBuilder.generateBoard(board);

    var clearing = scene.Layer('clearning', {useCanvas:true});
    var buildings = scene.Layer('buildings', {userCanvas:true});
    var objects = scene.Layer('objects', {userCanvas:true})
    var spriteObjects = {};
    spriteObjects.circle = clearing.Sprite('images/circle.gif')

    $scope.x_mouse = 0;
    $scope.y_mouse = 0;
    $scope.x_y_mouse = "0, 0";
    $scope.offSetX = 0;
    $scope.offSetY = 0;


    var move_circle = function (x, y){
      $scope.x_mouse = mouse.position.x;
      $scope.y_mouse = mouse.position.y;
      $scope.$apply()

      spriteObjects.circle.position(x-12, y-12);
    };

    var paint = function() {
      MapBuilder.update($scope.background);
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


      if(mouse.position.x !== $scope.x_mouse && mouse.position.y !== $scope.y_mouse){
        move_circle(mouse.position.x, mouse.position.y)
      }
      if(input.keyboard.up)   { $scope.offSetY -= MapBuilder.move($scope.background, 0, 5) }
      if(input.keyboard.down) { $scope.offSetY -= MapBuilder.move($scope.background, 0, -5) }
      if(input.keyboard.left) { $scope.offSetX -= MapBuilder.move($scope.background, 5, 0) }
      if(input.keyboard.right){ $scope.offSetX -= MapBuilder.move($scope.background, -5, 0) }
      if(mouse.click)   { lasted_clicked() }
    };
    var lasted_clicked = function(){
      $scope.x_y_mouse = (mouse.position.x+$scope.offSetX)+", "+(mouse.position.y+$scope.offSetY);
      $scope.$apply();
    }

    $scope.ticker = scene.Ticker(5, paint);
    $scope.ticker.run();
}]);
