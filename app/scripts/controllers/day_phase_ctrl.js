angular.module('MagicRealm')
  .controller('SongBridCtrl',['$scope','$window','$stateParams','ActionQueue','Player', function ($scope, $window, $stateParams, ActionQueue, Player) {

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
    $scope.waiting_for_players = true;
    $scope.players_turn = false;

    $scope.load_player = function() {
      Player.show({id: $stateParams.id}, function(player_info){
        $scope.player_info = player_info
        $scope.action_queues = player_info.action_queues
        $scope.set_player()
        $scope.set_other_players()
      });
    };
    $scope.set_player = function(player_info){
      $scope.spriteObjects.player = objects.Sprite('images/charater_icons/chr_'+player_info.character_class.name+'.jpg')
      var player_clearing = player_info.clearing;

      $scope.spriteObjects.player.position(player_clearing.x, player_clearing.y);
    };
    $scope.move_player = function(){
      var player_clearing = $scope.action_queues[$scope.action_queues.length-1].clearing;
      $scope.spriteObjects.player.position(player_clearing.x, player_clearing.y);
    };
    $scope.set_other_players = function () {
      $scope.spriteObjects.other_players = [];
      $scope.player_info.game.players.forEach(function (player){
        if(player.id !== parseInt($stateParams.id)){
          var p = objects.Sprite('images/charater_icons/chr_'+player.character_class.name+'.jpg')
          p.position(player.clearing.x, player.clearing.y)
          p.id = player.id
          $scope.spriteObjects.other_players.push(p)
        }
      });
    };
    $scope.move_other_players = function(){
      var players = $scope.player_info.game.players;
      $scope.spriteObjects.other_players.forEach(function (p){
        players.forEach(function(player){
          if(p.id === player.id){
            p.position = (player.clearing.x, player.clearing.y);
          }
        });
      });
    };
    $scope.refresh_board = function (){
      var game_id = $scope.player_info.game.id
      Game.show({id: game_id}, function(game_info){
        $scope.player_info.game = game;
        $scope.move_other_players();
      });
    };



    var paint = function() {
      $scope.ticket_count++;
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
      if($scope.ticket_count === 40){
        $scope.refresh_board();
        $scope.ticket_count = 0
      }else if($scope.players_turn){

      }
    };
    $scope.load_player()
    $scope.ticker = scene.Ticker(25, paint);
    $scope.ticket_count = 0;
    $scope.ticker.run();
}]);
