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
  .controller('GameCtrl',['$scope','$window','Player', function ($scope, $window, Player) {
    var sjs = $window.sjs
    var game_height = 700;
    var game_width = 725;
    var scene = sjs.Scene({w:game_width, h:game_height});
    var layer = scene.Layer('board', {useCanvas:false});
    var input = scene.Input();

    sjs.debug = true;

    var mouse = input.mouse

    Player.show({id: 1}, function(player_info){

      var background = layer.Sprite('images/map-v2-clean.gif');
      background.move(0, 0);

      var clearing = scene.Layer('clearning', {useCanvas:true});
      var objects = scene.Layer('objects', {userCanvas:true})

      var player = objects.Sprite('images/amazon.gif')
      var player_clearing = player_info.clearing

      player.move(player_clearing.x, player_clearing.y);

      var clearingJson = player_info.clearing.traversable_clearings

      var circles = [];
      var add_circles = function(){
        for (var i = 0; i < clearingJson.length; i++) {
          var circle = clearing.Sprite('images/circle.gif');
          var c = clearingJson[i].clearing

          circle.move(c.x, c.y);
          circles.push(circle)
        };
      };

      var paint = function() {
        background.update();
        player.update();
        for(var i=0; i < circles.length; i++){
          var c = circles[i]
          c.update();
        }
        if(input.mouse.click) {
          for (var i = 0; i < clearingJson.length; i++) {
            c = clearingJson[i].clearing
            var within_x = (c.x+25) > mouse.click.x && mouse.click.x > (c.x-25)
            var within_y = (c.y+25) > mouse.click.y && mouse.click.y > (c.y-25)

            if( within_x && within_y){
              $scope.move_clearing(player_info.id, c.id)
              break;
            }
          }
        }
      };

      var ticker = scene.Ticker(25, paint);

      angular.element('document').ready(function () {
        add_circles();
        ticker.run();
      });
      $scope.player_info = player_info
      // $scope.player_response = angular.toJson($scope.player_info, 4);
    });

    $scope.move_clearing = function(p_id, c_id){
      var params = {
        id: p_id,
        clearing_id: c_id
      }

      Player.move_clearing(params, function(){
        console.log("submitted changes");
        $window.location.reload()
      });
    };
}]);
