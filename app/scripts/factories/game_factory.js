'use strict';

angular.module('MagicRealm')
  .factory('Game',[
  //---------------
    '_',
    '$http',
  //---------------
    function( _, $http){

    var url = 'http://localhost:3000/games/'
    // TODO: Move url to a config file
    // var url =

    var Game = function(id){
      this.id = id;
      this.gameInfo = null;
    }

    Game.prototype.getGameInfo = function(callback){
      var self = this
      return $http.get(url+this.id).then(function(response){
        self.gameInfo = response.data
        callback(self.gameInfo);
        return response
      });
    }
    Game.prototype.getTimeOfDay = function(callback){
      var self = this
      return $http.get(url+this.id+'/time_of_day').then(function(response){
        callback(response.data)
        return response.data
      });
    }
    Game.prototype.currentPlayer = function(callback){
      var self = this
      return $http.get(url+this.id+'/current_player').then(function(response){
        self.gameInfo.current_player = response.data
        callback(response.data)
      });
    }
    Game.prototype.showClearingTreasures = function(id, callback){
      var self = this
      return $http.get(url+this.id+'/show_clearing_treasures?clearing='+id).then(function(response){
        self.gameInfo.current_player = response.data
        callback(response.data)
      });
    }

    return Game
}]);
