'use strict';

angular.module('MagicRealm')
  .factory('Player',['_', '$http', 'ActionQueue', function( _, $http, ActionQueue){

    var url = 'http://localhost:3000/players/'

    var Player = function(id){
      this.id = id;
      this.playerInfo = null;
      this.actionQueue = [];
      this.lastAction = null;
      this.lastMoveCId = null;
      console.log(this.id);
    }

    ////////////////////////////////
    // SongBird
    ///////////////////////////////
    // Get Player Info
    Player.prototype.getPlayerInfo = function(){
      var self = this
      return $http.get(url+this.id).then(function(response){
        console.log(response);
        console.log(response.data);
        self.playerInfo = response.data
        return response
      });
    }
    // Submit Actions to move to the next steps
    Player.prototype.submitAction = function(){
      return $http.put(url+this.id+'/submit_actions').then(function(response){
        return response
      });
    }

    ///////////////////
    // Day Phase
    //////////////////
    // Next Action
    Player.prototype.nextAction = function(){
      return $http.put(url+this.id+'/next_action').then(function(response){
        return response
      });
    }
    // Chose Selection
    Player.prototype.choseSelection = function(){
      return $http.put(url+this.id+'/chose_selection').then(function(response){
        return response
      });
    }
    // End Turn
    Player.prototype.endTurn = function(){
      return $http.put(url+this.id+'/end_turn').then(function(response){
        return response
      });
    }
    /////////////////////////
    // Action Queue
    ////////////////////////
    Player.prototype.createAction = function(params){
      var self = this
      ActionQueue.create(params, function(response){
        self.lastAction = response
        self.actionQueue.push(response)
      })
    }

    Player.prototype.updateAction = function(params){
      var self = this
      ActionQueue.update(params, function(response){
        self.lastAction = response;
        self.actionQueue.pop();
        self.actionQueue.push(response)
      });
    }

    Player.prototype.destroyAction = function(){
      var self = this
      var id = this.lastAction.id
      var destroyMove = (_.last(this.actionQueue).action_name) === 'move'

      ActionQueue.destroy({id: id}, function(){
        self.lastAction = _.last(self.actionQueue)
        if(destroyMove){
          move = _.where(self.actionQueue, {action_name: move})
          self.lastMoveCId = _.last(move).clearing.id
        }
      });
    }

    return Player;
}]);
