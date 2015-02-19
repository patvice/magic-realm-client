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
  .controller('GameCtrl',['$scope','$window','$stateParams','Player', function ($scope, $window, $stateParams, Player) {
    var sjs = $window.sjs
    var game_height = 705;
    var game_width = 725;
    var scene = sjs.Scene({w:game_width, h:game_height});
    var layer = scene.Layer('board', {useCanvas:false});
    var input = scene.Input();

    sjs.debug = true;

    var mouse = input.mouse

    var background = layer.Sprite('images/map-v2-clean.gif');
    background.move(0, 0);

    var clearing = scene.Layer('clearning', {useCanvas:true});
    var objects = scene.Layer('objects', {userCanvas:true})

    $scope.spriteObjects = {};
    $scope.action = '';

    $scope.load_player = function() {
      Player.show({id: $stateParams.id}, function(player_info){
        $scope.player_info = player_info
        $scope.set_player(player_info)
        $scope.set_other_players(player_info)
      });
    };

    // Player
    $scope.set_player = function(player_info){
      $scope.spriteObjects.player = objects.Sprite('images/charater_icons/chr_'+player_info.character_class.name+'.jpg')
      $scope.move_player(player_info)
    };
    $scope.move_player = function(player_info){
      var player_clearing = player_info.clearing;
      $scope.spriteObjects.player.position(0,0)
      $scope.spriteObjects.player.position(player_clearing.x, player_clearing.y);
    };
    $scope.set_other_players = function (player_info) {
      $scope.spriteObjects.other_players = [];
      player_info.game.players.forEach(function (player){
        console.log(player.id, $stateParams.id);
        if(player.id !== parseInt($stateParams.id)){
          var p = objects.Sprite('images/charater_icons/chr_'+player.character_class.name+'.jpg')
          p.position(player.clearing.x, player.clearing.y)
          $scope.spriteObjects.other_players.push(p)
        }
      });
    };
    $scope.remove_other_players = function(){
      $scope.spriteObjects.other_players.forEach(function (player){
        player.remove()
      });
      $scope.spriteObjects.other_players = [];
    };
    // Clearing
    $scope.set_circles = function(player_info){
      var clearingJson = player_info.clearing.traversable_clearings

      $scope.spriteObjects.circles = [];
      for (var i = 0; i < clearingJson.length; i++) {
        var circle = clearing.Sprite('images/circle.gif');
        var c = clearingJson[i].clearing

        circle.position(c.x, c.y);
        $scope.spriteObjects.circles.push(circle)
      }
    };
    $scope.remove_circles = function (){
      for (var i = 0; i < $scope.spriteObjects.circles.length; i++) {
        $scope.spriteObjects.circles[i].remove();
      }
      $scope.spriteObjects.circles = [];
    };

    // Moving Clearing / Post Players
    $scope.move_clearing = function(p_id, c_id){
      $scope.ticker.pause();
      var params = {
        id: p_id,
        clearing_id: c_id
      }
      Player.move_clearing(params, function(player_info){
        $scope.remove_circles()
        $scope.move_player(player_info)
        $scope.ticker.resume();
        $scope.player_info = player_info
      });
    };

    // Click functions
    $scope.move_action = function(){
      $scope.action = 'move';
      $scope.set_circles($scope.player_info)
    };

    var paint = function() {
      background.update();
      Object.keys($scope.spriteObjects).forEach(function (key) {
        var value = $scope.spriteObjects[key]
        if(Array.isArray(value)){
          value.forEach(function(v){
            v.update();
          });
        }else{
          value.update();
        }
      });
      if(input.mouse.click && $scope.action == 'move') {
        var clearingJson = $scope.player_info.clearing.traversable_clearings

        for (var i = 0; i < clearingJson.length; i++) {
          var c = clearingJson[i].clearing
          var within_x = (c.x+20) > mouse.click.x && mouse.click.x > (c.x-20)
          var within_y = (c.y+20) > mouse.click.y && mouse.click.y > (c.y-20)

          if( within_x && within_y){
            $scope.move_clearing($scope.player_info.id, c.id)
            return;
          }
        }
      }
    };
    $scope.load_player()
    $scope.ticker = scene.Ticker(25, paint);
    $scope.ticker.run();
}]);
