'use strict';

angular.module('MagicRealm')
.controller('FightCtrl', [
  //---------------
    '$scope',
    '$stateParams',
    'Fight',
    '_',
  //---------------

  function ($scope, $stateParams, Fight, _) {
     var base_url = 'http://localhost:9000/'
    $scope.waiting = false;
    $scope.attack = null;
    $scope.defence = null;
    $scope.target = null;
    $scope.phase = 'select';

    var start_fight = function(){
      $scope.fight = new Fight($stateParams.figth_id, $stateParams.player_id)
      load_fight();
    }

    var load_fight = function(){
      console.log($stateParams.figth_id+" "+$stateParams.player_id)
      $scope.fight.loadFight(function(fightInfo){
        $scope.fight.loadOtherFighters(function(){
          console.log($scope.fight)
        });
      });
    };

    $scope.submitFight = function(attack, defence, target){
      if(attack === null || defence === null || target === null){return;}
      $scope.fight.submitFight(attack, defence, target, function(){
        $scope.phase = 'waiting';
        $scope.wait_for_players('continue_or_run');
      });
    }

    $scope.submitChoice = function(option){
      if($scope.choice === null){return;}
      $scope.fight.playerChoice(option, function(){
        $scope.phase = 'waiting';
        $scope.wait_for_players('select');
      });
    };

    $scope.wait_for_players = function(nextPhase){
      $scope.interval = setInterval(function(){
        $scope.fight.currentState(function(fightInfo){
          console.log(fightInfo)
          if(fightInfo.current_state === nextPhase){
            $scope.phase = fightInfo.current_state
            load_fight();
            clearInterval($scope.interval);
          }else if(fightInfo.current_state === 'complete'){

            clearInterval($scope.interval);
            console.log("THE FIGHT IS OVER")
            url = base_url+"#/games/"+$scope.fight.actor.game_id+'/players/'+$stateParams.player_id
            window.location.href = url
          }else{
            $scope.playersNotReady = fightInfo.players
          }
        });
      },5000);
    };

    start_fight();
}]);
