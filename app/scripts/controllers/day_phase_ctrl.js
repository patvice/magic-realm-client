angular.module('MagicRealm')
  .controller('DayPhaseCtrl',['$rootScope','$scope','$window','$modal','$state','$stateParams','ActionQueue','Player',
    function ($rootScope, $scope, $window, $modal,$state, $stateParams, ActionQueue, Player) {

    var sjs = $window.sjs
    var scene = $rootScope.scene
    var layer = scene.Layer('board', {useCanvas:false});
    var input = scene.Input();

    sjs.debug = true;

    var mouse = input.mouse

    var background = layer.Sprite('images/map-v2-clean.gif');
    background.move(0, 0);

    var clearing = scene.Layer('clearning', {useCanvas:true});
    var buildings = scene.Layer('buildings', {userCanvas:true});
    var objects = scene.Layer('objects', {userCanvas:true});

    $scope.spriteObjects = {};
    $scope.waiting = true;
    $scope.players_turn = false;
    $scope.next_action_b = true;
    $scope.next_turn_b = true;

    $scope.load_player = function() {
      Player.show({id: $stateParams.id}, function(player_info){
        $scope.player_info = player_info
        $scope.action_queues = player_info.action_queues
        $scope.add_extras();
        $scope.set_player();
        $scope.set_other_players();
        console.log(player_info.game.current_players_turn, player_info.id);
        if(player_info.game.current_players_turn !== player_info.id){
          $scope.wait_for_other_players();
        }else{
          $scope.next_action_b = false;
          $scope.waiting = false;
        }
      });
    };
    //Random Stuff
    $scope.add_extras = function(){
      //Guard
      $scope.spriteObjects.guard = objects.Sprite('images/dwellings/guard.jpg')
      $scope.spriteObjects.guard.position(518, 210);
      //House
      $scope.spriteObjects.house = objects.Sprite('images/dwellings/house.jpg')
      $scope.spriteObjects.house.position(620, 252);
      //Inn
      $scope.spriteObjects.inn = objects.Sprite('images/dwellings/inn.jpg')
      $scope.spriteObjects.inn.position(262, 362);
      //Chapel
      $scope.spriteObjects.chapel = objects.Sprite('images/dwellings/chapel.jpg')
      $scope.spriteObjects.chapel.position(308, 599);
      // Ghost
      $scope.spriteObjects.ghost = objects.Sprite('images/monsters/ghost.jpg')
      $scope.spriteObjects.ghost.position(136, 205);
    };
    $scope.refresh_player = function() {
      Player.show({id: $stateParams.id}, function(player_info){
        $scope.player_info = player_info
        $scope.action_queues = player_info.action_queues
        $scope.notifications = player_info.game.notifications;
        if($scope.player_info.notification !== null){
          $scope.items = [];
          $scope.text = $scope.player_info.notification
          $scope.open();
        }
        if($scope.player_info.current_action === null){
          $scope.next_action_b = true;
          $scope.next_turn_b = false;
        }
      });
    };
    $scope.set_player = function(){
      player_info = $scope.player_info
      $scope.spriteObjects.player = objects.Sprite('images/charater_icons/chr_'+player_info.character_class.name+'.jpg')
      var player_clearing = player_info.clearing;

      $scope.spriteObjects.player.position(player_clearing.x, player_clearing.y);
    };
    $scope.move_player = function(){
      var player_clearing = $scope.player_info.clearing;
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
      var player_id = $scope.player_info.id
      Player.show({id: player_id}, function(player_info){
        $scope.player_info = player_info;
        $scope.move_other_players();
      });
    };

    $scope.next_action = function (){
      var params = {id: $scope.player_info.id}
      Player.next_action(params, function(player_info){
        $scope.player_info = player_info;
        $scope.action_queues = player_info.action_queues;
        $scope.notifications = player_info.game.notifications;
        $scope.move_player();
        var current_action = $scope.action_queues[player_info.current_action-1]
        if($scope.player_info.current_action === null){
          $scope.next_action_b = true;
          $scope.next_turn_b = false;
        }else if(current_action.action_name === 'search'){
          $scope.items = ['Peer', 'Locate'];
          $scope.text = 'You have two options for searching...'
          $scope.selected = "Nothing Yet";
          $scope.open();
        }
      });
    };
    $scope.end_turn = function (){
      var params = {id: $scope.player_info.id}
      console.log("ENDED THE TURN");
      Player.end_turn(params, function(){
        console.log("Turn over");
        $scope.next_action_b = true;
        $scope.next_turn_b = true;
        $scope.waiting = true;
        $scope.waiting_for_bird_song();
      });
    };
    $scope.waiting_for_bird_song = function(){
      $scope.interval = setInterval(function(){
        var params = {id: $stateParams.id};
        Player.show(params, function(player_info){
          $scope.player_info = player_info
          console.log('HERE');
          if(player_info.game.time_of_day === 'birdsong'){
            clearInterval($scope.interval);
            var toParams = {id: $scope.player_info.id}
            $state.go('song_bird', toParams)
          }
        });
      },5000);
    }
    $scope.cleanup_objects = function(){
      scene.reset();
    };
    $scope.search_choice = function(){
      $scope.items = ['Clues and Paths','Hidden Enemies & Paths','Passages & Clues','Hidden Enemies','Clues','Passages','Discover Chits'];
      $scope.text = 'You rolled a 1, Pick your Action...';
      $scope.selected = "Nothing Yet";
      $scope.open();
    };
    // Modals
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/search_modal.html',
        controller: 'SearchModalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          },
          text: function (){
            return $scope.text;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
        console.log(selectedItem)
        if($scope.selected === 'Peer' || $scope.selected === 'Locate'){
          var params ={
            id: $scope.player_info.id,
            search_action: $scope.selected
          }
        }else{
          var params ={
            id: $scope.player_info.id,
            search_choice: $scope.selected
          }
        }
        Player.chose_selection(params, function(results){
          console.log(results);
          if(results.roll === 1){
            $scope.search_choice();
          }else{
            $scope.refresh_player();
          }
        });
      }, function () {
        console.log("NO QUITING");
      });
    };

    $scope.wait_for_other_players = function(){
      $scope.waiting = true;
      $scope.interval = setInterval(function(){
        var params = {id: $stateParams.id};
        Player.show(params, function(player_info){
          $scope.player_info = player_info
          if(player_info.game.current_players_turn === player_info.id){
            $scope.next_action_b = false;
            $scope.waiting = false;
            clearInterval($scope.interval);
          }
        });
      },5000);
    }

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
      if($scope.ticket_count === 200){
        // $scope.refresh_board();
        $scope.ticket_count = 0
      }else if($scope.players_turn){

      }
    };
    $scope.load_player()
    $scope.ticker = scene.Ticker(25, paint);
    $scope.ticket_count = 0;
    $scope.ticker.run();
}]);
