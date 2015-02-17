'use strict';

/**
 * @ngdoc function
 * @name comp3004App.controller:SetupCtrl
 * @description
 * # MainCtrl
 * Controller of the comp3004App
 */
angular.module('MagicRealm')
.controller('SetupCtrl',['$scope', '$state', '$stateParams', 'Player', function ($scope, $state, $stateParams, Player) {
  var base_url = 'images/charater_sheets/'
  $scope.id = 0;
  $scope.champ_info =
    [
      { id:1, name:'Amazon', url: base_url+'amazon.jpg' },
      { id:2, name:'Berserker', url: base_url+'berserker.jpg' },
      { id:3, name:'Black Knight', url: base_url+'black_knight.jpg' },
      { id:4, name:'Captain', url: base_url+'captain.jpg' },
      { id:5, name:'Druid', url: base_url+'druid.jpg' },
      { id:6, name:'Dwarf', url: base_url+'dwarf.jpg' },
      { id:7, name:'Elf', url: base_url+'elf.jpg' },
      { id:8, name:'Magician', url: base_url+'magician.jpg' },
      { id:9, name:'Pilgrim', url: base_url+'pilgrim.jpg' },
      { id:10, name:'Sorceror', url: base_url+'sorceror.jpg' },
      { id:11, name:'Swordsman', url: base_url+'swordsman.jpg' },
      { id:12, name:'White Knight', url: base_url+'white_knight.jpg' },
      { id:13, name:'Witch', url: base_url+'witch.jpg' },
      { id:14, name:'Witch King', url: base_url+'witch_king.jpg' },
      { id:15, name:'Wizard', url: base_url+'wizard.jpg' },
      { id:16, name:'Woodsgirl', url: base_url+'woodsgirl.jpg' }
    ]

    $scope.selected_info = {};
    $scope.showForm = false;
    $scope.selected_champ = 0;
    $scope.selected_champ_name = "";
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.great_treasures_vps = 0;
    $scope.usable_spells_vps = 0;
    $scope.fame_vps = 0;
    $scope.notoriety_vps = 0;
    $scope.gold_vps = 0;
    $scope.lessThenFive = false;

    $scope.next = function (){
      $scope.id++;
      if($scope.id == 16){
        $scope.id = 0;
      }
    };
    $scope.prev = function (){
      $scope.id--;
      if($scope.id == -1){
        $scope.id = 15;
      }
    };

    $scope.closeFive = function(){
      $scope.lessThenFive = false;
    }

    $scope.selectChamp = function (champ){
      $scope.selected_champ = champ.id
      $scope.selected_champ_name = champ.name
      $scope.showForm = true;
    }

    $scope.backToSelect = function () {
      $scope.showForm = false;
    }

    $scope.submit = function (){
      var sum = $scope.great_treasures_vps + $scope.usable_spells_vps + $scope.fame_vps + $scope.notoriety_vps + $scope.gold_vps;
      if(sum < 5){
        $scope.lessThenFive = true;
        return;
      }

      var params = {
        game_id: $stateParams.id,
        charater_id: $scope.id,
        first_name: $scope.first_name,
        last_name: $scope.last_name,
        great_treasures_vps: $scope.great_treasures_vps,
        usable_spells_vps: $scope.usable_spells_vps,
        fame_vps: $scope.fame_vps,
        notoriety_vps: $scope.notoriety_vps,
        gold_vps: $scope.gold_vps,
      }

      Player.create(params, function(player){
        console.log("CREATED")
        console.log(player);
        var toParams = {id: player.id}
        $state.go('game', toParams)
      });
    }

}]);
