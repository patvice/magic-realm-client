'use strict';

var url = 'http://localhost:3000/'
// var url = #actually_url

angular.module('MagicRealm')
  .controller('SongBirdCtrl',[
  //-------------------
    '$scope',
    '$state',
    '$stateParams',
    '$modal',
    '$http',
    '_',
    'Player',
    'Game',
    'Sjs',
    'Fight',
  //-------------------

  function ($scope, $state, $stateParams, $modal, $http, _, Player, Game, Sjs, Fight) {
    var url_base = 'http://localhost:9000/'
    var server = 'http://localhost:3000/'
    $scope.dice = '0';
    $scope.block = false;
    $scope.action = ''
    $scope.phase = 'birdsong'
    $scope.notifications = [];
    $scope.waiting = false;
    $scope.next_action_b = false;
    $scope.next_turn_b = true;
    $scope.goldPile = 'null';
    $scope.tilesToReverse = [];

    //Game Setup
    var load_player = function() {
      $scope.player = new Player($stateParams.player_id);
      $scope.game = new Game($stateParams.game_id);
      $scope.game.getGameInfo(function(game){
        console.log(game)
        if(game.turn === 29){
          window.location = server+'/games/'+$scope.game.id+"/winning"
          return
        }
        $scope.phase = $scope.game.gameInfo.time_of_day
        $scope.notifications = game.notifications
        $scope.player.getPlayerInfo(function(player){
            $scope.sjs = new Sjs($scope.player, $scope.game.gameInfo, updateMove, updateGoldPiles);
            $scope.actionQueues = $scope.player.actionQueues;
            $scope.updateButtons();
        });
      });
    };

    var reset_player = function() {
      $scope.game.getGameInfo(function(game){
        $scope.phase = $scope.game.gameInfo.time_of_day
        $scope.notifications = game.notifications
        $scope.player.getPlayerInfo(function(player){
            $scope.sjs.removeAndSetTreasures(player.found_clearings)
            $scope.sjs.addMonsters($scope.game.gameInfo.monsters)
            $scope.actionQueues = $scope.player.actionQueues;
            $scope.updateButtons();
        });
      });
    };

    var updateGoldPiles = function(clearing_id){
      if(clearing_id === 0){return;}
      $scope.game.showClearingTreasures(clearing_id, function(goldPile){
        $scope.goldPile = goldPile
        $scope.treasures = goldPile.treasure_names
      });
    }

    //BirdSong functions
    $scope.updateButtons = function(){
      if ($scope.game.gameInfo.time_of_day === 'daylight'){
        $scope.next_action_b = false;
        $scope.next_turn_b = true;
        if($scope.actionQueues.length === 0){
          $scope.next_action_b = true;
          $scope.next_turn_b = false;
          return;
        }
      }

      var actionQueue = _.last($scope.actionQueues)
      if(actionQueue){
        $scope.move_b = !actionQueue.buttons.move_b
        $scope.hide_b = !actionQueue.buttons.hide_b
        $scope.rest_b = !actionQueue.buttons.rest_b
        $scope.loot_b = !actionQueue.buttons.loot_b
        $scope.search_b = !actionQueue.buttons.search_b
        $scope.enchant_b = !actionQueue.buttons.enchant_b
      }else{
        $scope.move_b = false;
        $scope.hide_b = false;
        $scope.rest_b = false;
        $scope.loot_b = false;
        $scope.search_b = false;
        $scope.enchant_b = false;
      }
    };
    $scope.clickAction = function(action){
      $scope.action = action;
      createAction();
    }

    var createAction = function(){
      var params = {
        player_id: $scope.player.playerInfo.id,
        action_name: $scope.action,
        clearing_id: $scope.player.lastMoveId,
        turn: $scope.game.gameInfo.turn
      }
      $scope.player.createAction(params, function(){
        var newAction = _.last($scope.player.actionQueues)
        $scope.updateButtons();
        if(newAction.action_name === 'move'){
          $scope.sjs.setBlueCircles(newAction.clearings)
        }else if(newAction.action_name === 'enchant'){
          $scope.sjs.enchantTile(newAction.clearing.tile.name)
          $scope.tilesToReverse.push(newAction.clearing.tile.name)
        }else if(newAction.action_name === 'search' && newAction.clearing.movement_type === 'mountain'){
          $scope.sjs.setBlueCircles(newAction.clearings)
        }else{
          $scope.actionQueues = $scope.player.actionQueues;
          $scope.action = '';
        }
      });
    }
    var updateMove = function(clearing_id){
      var params = {
        id: _.last($scope.player.actionQueues).id,
        player_id: $scope.player.playerInfo.id,
        clearing_id: clearing_id,
      }
      $scope.player.updateAction(params, function(){
        var lastAction = _.last($scope.player.actionQueues);
        $scope.sjs.movePlayerSB(lastAction.clearing.x, lastAction.clearing.y, $scope.action);
        $scope.sjs.removeBlueCircles();
        $scope.action = '';
      });
    }

    //Birdsong to Daylight
    $scope.submitActions = function(){
      $scope.player.submitAction();
      $scope.wait_for_next_phase('daylight', 'waitingOtherTurn');
      $scope.sjs.removeGreenCircles();
      $scope.sjs.movePlayer($scope.player.playerInfo.clearing.x, $scope.player.playerInfo.clearing.y)
      $scope.sjs.reverseTiles($scope.tilesToReverse)
      $scope.phase = 'waitingDaylight'
    };

    //Interval Methods
    $scope.wait_for_next_phase = function(phase, nextPhase){
      $scope.interval = setInterval(function(){
        $scope.game.getTimeOfDay(function(timeOfDay){
          if(_.first(timeOfDay) === phase){
            clearInterval($scope.interval);
            $scope.phase = nextPhase;
            if(phase === 'birdsong'){
              reset_player();
            }else{
              $scope.wait_for_other_players('');
            }
          }
        });
      },5000);
    }
    $scope.wait_for_other_players = function(nextPhase){
      $scope.interval = setInterval(function(){
        $scope.game.currentPlayer(function(gameInfo){
          if(gameInfo.time_of_day === nextPhase){
            $scope.phase = nextPhase
            clearInterval($scope.interval);
          }else if(gameInfo.current_player.id === $scope.player.playerInfo.id){
            $scope.phase = gameInfo.time_of_day
            reset_player();
            clearInterval($scope.interval);
          }else{
            var cP = gameInfo.current_player;
            $scope.notifications = gameInfo.notifications
            $scope.sjs.moveOtherPlayer(cP.x, cP.y, cP.id);
          }
        });
      },5000);
    }

    // Daylight Functions
    $scope.nextAction = function (){
      $scope.player.nextAction($scope.dice, function(playerInfo){
        //If a player had been blocked
        if(playerInfo.action && playerInfo.action === true){
          $scope.actionQueues = []
          $scope.next_action_b = true;
          $scope.next_turn_b = false;
        };

        if($scope.actionQueues.length === 0){return;}
        var currentAction = $scope.actionQueues.shift();
        $scope.notifications = playerInfo.notifications
        if($scope.actionQueues.length === 0){
          $scope.next_action_b = true;
          $scope.next_turn_b = false;
        }

        if(currentAction.action_name === 'move'){
          $scope.sjs.movePlayer(currentAction.clearing.x, currentAction.clearing.y);
        }else if(currentAction.action_name === 'enchant'){
          $scope.sjs.enchantTile(currentAction.clearing.tile.name)
        }else if(currentAction.action_name === 'search'){
          $scope.items = ['Peer', 'Locate'];
          $scope.text = 'You have two options for searching...'
          $scope.selected = "Nothing Yet";
          $scope.searchClearing()
        }
        reset_player();
        $scope.updateButtons();
      });
    };

    $scope.searchClearing = function(){
      $scope.open(null, function(selectedItem){
        $scope.selected = selectedItem;
        $scope.player.choseSelection($scope.dice, $scope.selected, function(results){
          if(results.roll === 1){
            $scope.searchChoice();
          }else{
            if($scope.actionQueues.length === 0){
              $scope.next_action_b = true;
              $scope.next_turn_b = false;
              console.log('IN HERE')
            }
          }
        });
      });
    }
    $scope.searchChoice = function(){
      $scope.items = ['Clues and Paths','Hidden Enemies & Paths','Passages & Clues','Hidden Enemies','Clues','Passages','Discover Chits'];
      $scope.text = 'You rolled a 1, Pick your Action...';
      $scope.selected = "Nothing Yet";
      $scope.searchClearing();
    };

    $scope.endTurn = function (){
      $scope.player.endTurn(function(){
        $scope.next_action_b = true;
        $scope.next_turn_b = true;
        reset_player();
        $scope.waiting_for_fight();
      });
    };

    $scope.waiting_for_fight = function(){
      $scope.interval = setInterval(function(){
        $scope.game.getTimeOfDay(function(timeOfDay){
          if(_.first(timeOfDay) === 'evening'){
            clearInterval($scope.interval);
            $scope.fight = new Fight($stateParams.figth_id, $stateParams.player_id)
            $scope.fight.findFight(function(fightInfo){
              if(fightInfo === 'null'){
                $scope.wait_for_next_phase('birdsong')
              }else{
                $scope.sjs.remove_sjs();
                url = url_base+"#/games/"+$scope.game.id+'/players/'+$scope.player.id+"/fight/"+fightInfo.queue.id
                window.location.href = url
              }
            });
          }else{

          }
        });
      },5000);
    };

    //Modal Function
    $scope.open = function (size, callback) {
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
        callback(selectedItem);
      }, function () {
        console.log("NO QUITING");
      });
    };

    //watched variables
    $scope.$watch('block', function(newVal, oldVal) {
      if(newVal === oldVal){return;}
      $scope.player.updateBlock(newVal, function(player){
        console.log('updated block')
        console.log('player block: '+player.block)
      });
    });

    $scope.getInventory = function(){
      $http.get(server+'/inventory/'+$scope.game.id+'/'+$scope.player.id).then(function(response){
        console.log(response.data)
        $scope.inventory = response.data
      });
    };

    load_player();
}]);
