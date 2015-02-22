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
  .controller('SongBirdCtrl',['$scope','$window','$stateParams','ActionQueue','Player', function ($scope, $window, $stateParams, ActionQueue, Player) {
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
    $scope.spriteObjects.start_clearings = [];
    $scope.action = '';

    $scope.move_b = false;
    $scope.hide_b = false;
    $scope.rest_b = false;
    $scope.search_b = false;

    $scope.load_player = function() {
      Player.show({id: $stateParams.id}, function(player_info){
        $scope.player_info = player_info
        $scope.action_queues = player_info.action_queues
        $scope.set_player(player_info)
        $scope.set_other_players(player_info)
      });
    };
    // Player
    $scope.set_player = function(player_info){
      $scope.spriteObjects.player = objects.Sprite('images/charater_icons/chr_'+player_info.character_class.name+'.jpg')
      var player_clearing = player_info.clearing;

      $scope.spriteObjects.player.position(player_clearing.x, player_clearing.y);
    };
    $scope.move_player = function(player_info){
      var player_clearing = $scope.action_queues[$scope.action_queues.length-1].clearing;
      $scope.spriteObjects.player.position(player_clearing.x, player_clearing.y);
    };
    $scope.set_other_players = function (player_info) {
      $scope.spriteObjects.other_players = [];
      player_info.game.players.forEach(function (player){
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
      var action_queues = player_info.action_queues
      var clearingJson = action_queues[action_queues.length-1].clearings
      $scope.target_clearings = clearingJson

      $scope.spriteObjects.circles = [];
      for (var i = 0; i < clearingJson.length; i++) {
        var circle = clearing.Sprite('images/circle.gif');
        var c = clearingJson[i]
        circle.position(c.x, c.y);
        $scope.spriteObjects.circles.push(circle)
      }
    };
    $scope.set_blue_circle = function(){
      var sc = objects.Sprite('images/circle_start.gif')
      var player = $scope.spriteObjects.player

      sc.position(player.x, player.y);
      $scope.spriteObjects.start_clearings.push(sc);
    };
    $scope.remove_circles = function (){
      for (var i = 0; i < $scope.spriteObjects.circles.length; i++) {
        $scope.spriteObjects.circles[i].remove();
      }
      $scope.spriteObjects.circles = [];
    };

    $scope.create_action = function(p_id, c_id){
      var params = {
        player_id: p_id,
        clearing_id: c_id,
        action_name: $scope.action
      }
      if($scope.action_queues && $scope.action === 'move'){
        var last_move;
        $scope.action_queues.forEach(function(aq){
          if(aq.action_name === 'move'){
            last_move = aq
          }
        });
        if(last_move){
          params.clearing_id = last_move.clearing_id;
        }
      }
      ActionQueue.create(params, function(player_info){
        if($scope.action === 'move'){
          $scope.set_circles(player_info);
        }else if($scope.action === 'search' && player_info.clearing.movement_type === 'mountain') {
          $scope.set_circles(player_info);
        }else{
          $scope.action_queues = player_info.action_queues;
          $scope.action = '';
        }
        $scope.player_info = player_info;
        $scope.update_buttons();
        $scope.ticker.resume();
      });
    };
    // Moving Clearing / Post Players
    $scope.update_action = function(p_id, c_id){
      var action_queues = $scope.player_info.action_queues
      var params = {
        id: action_queues[action_queues.length-1].id,
        player_id: p_id,
        clearing_id: c_id,
        action_name: $scope.action
      }
      ActionQueue.update(params, function(player_info){
        $scope.remove_circles();
        $scope.action_queues = player_info.action_queues;
        $scope.player_info = player_info;
        if($scope.action === 'move'){
          $scope.set_blue_circle();
          $scope.move_player();
        }
        $scope.action = '';
        $scope.update_buttons();
        $scope.ticker.resume();
      });
    };
    $scope.submit_actions = function(){
      params = {id: $scope.payer_info.id}
      Player.submit_actions(params, function(){
        var toParams = {id: $scope.player_info.id}
        $state.go('day_phase', toParams)
      });
    };

    $scope.delete_action = function(){
      var params = {id: $scope.player_info.id};
      Player.destroy_last_action(params, function(player_info){
        if($scope.action_queues[$scope.action_queues.length-1].action_name === 'move'){
          var circle = $scope.spriteObjects.start_clearings.pop();
          $scope.spriteObjects.player.position(circle.x, circle.y)
          circle.remove();
        }
        $scope.action_queues = player_info.action_queues;
        $scope.player_info = player_info;
        $scope.update_buttons();
      });
    };

    $scope.create_call = function(){
      if ($scope.player_info.action_queues.length === 0){
        $scope.update_buttons();
        $scope.create_action($scope.player_info.id, $scope.player_info.clearing.id)
      }else{
        var action_queue = $scope.player_info.action_queues[$scope.player_info.action_queues.length-1]
        $scope.update_buttons();
        $scope.create_action($scope.player_info.id, action_queue.clearing.id)
      }
    };
    $scope.update_buttons = function(){
      var action_queue = $scope.player_info.action_queues[$scope.player_info.action_queues.length-1]
      var action = $scope.action === ''
      if(action_queue){
        $scope.move_b = !action_queue.can_move && action
        $scope.hide_b = !action_queue.can_hide && action
        $scope.rest_b = !action_queue.can_rest && action
        $scope.search_b = !action_queue.can_search && action
      }
    };
    // Click functions
    $scope.move_action = function(){
      // $scope.ticker.pause();
      $scope.action = 'move';
      $scope.create_call();
    };
    $scope.hide_action = function(){
      $scope.action = 'hide';
      $scope.create_call();
    };
    $scope.rest_action = function(){
      $scope.action = 'rest';
      $scope.create_call();
    };
    $scope.search_action = function(){
      $scope.action = 'search';
      $scope.create_call();
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
      if(input.mouse.click && ($scope.action === 'move' || $scope.action === 'search')) {
        var clearingJson = $scope.target_clearings

        for (var i = 0; i < clearingJson.length; i++) {
          var c = clearingJson[i]
          var within_x = (c.x+20) > mouse.click.x && mouse.click.x > (c.x-20)
          var within_y = (c.y+20) > mouse.click.y && mouse.click.y > (c.y-20)

          if( within_x && within_y){
            $scope.update_action($scope.player_info.id, c.id)
            $scope.ticker.pause();
            return;
          }
        }
      }
    };
    $scope.load_player()
    $scope.ticker = scene.Ticker(10, paint);
    $scope.ticker.run();
}]);
