'use strict';

angular.module('MagicRealm')
  .factory('Player',['_', '$http', 'ActionQueue', function( _, $http, ActionQueue){

    var url = 'http://localhost:3000/players/'
    var actionUrl = 'http://localhost:3000/action_queues/'
    // TODO: Move url to a config file
    // var url =

    var Player = function(id){
      this.id = id;
      this.playerInfo = null;
      this.actionQueues = [];
      this.lastMoveId = null;
      this.x = 0;
      this.y = 0;
    }

    ////////////////////////////////
    // SongBird
    ///////////////////////////////
    // Get Player Info
    Player.prototype.getPlayerInfo = function(callback){
      var self = this
      return $http.get(url+this.id).then(function(response){
        self.playerInfo = response.data
        self.lastMoveId = self.playerInfo.clearing.id
        self.getActionList(function(){
          callback(self.playerInfo);
        })
        return response
      });
    }
    // Submit Actions to move to the next steps
    Player.prototype.submitAction = function(){
      return $http.get(url+this.id+'/submit_actions').then(function(response){
        return response
      });
    }

    ///////////////////
    // Day Phase
    //////////////////
    // Next Action
    Player.prototype.nextAction = function(dice, callback){
      return $http.get(url+this.id+'/next_action?dice='+dice).then(function(response){
        callback(response.data);
        return response
      });
    }
    // Chose Selection
    Player.prototype.choseSelection = function(dice, chose, callback){
      return $http.get(url+this.id+'/chose_selection?dice='+dice+'&search_action='+chose).then(function(response){
        callback(response.data)
        return response.data
      });
    }
    // End Turn
    Player.prototype.endTurn = function(callback){
      return $http.get(url+this.id+'/end_turn').then(function(response){
        callback();
        return response.data
      });
    }

    /////////////////////////
    // Action Queue
    ////////////////////////
    //
    Player.prototype.getActionList = function(callback){
      var self = this
      return $http.get(actionUrl+'actions_this_turn?player_id='+this.id).then(function(response){
        self.actionQueues = response.data;
        self.setMoveId();
        callback();
        return response
      });
    }

    Player.prototype.createAction = function(params, callback){
      var self = this
      ActionQueue.create(params, function(response){
        self.actionQueues.push(response)
        callback();
      })
    }

    Player.prototype.updateAction = function(params, callback){
      var self = this
      ActionQueue.update(params, function(response){
        self.actionQueues.pop();
        self.actionQueues.push(response)
        if(response.action_name === 'move'){
          self.lastMoveId = response.clearing.id
        }
        callback();
      });
    }

    Player.prototype.destroyAction = function(callback){
      var self = this
      var id = this.lastAction.id
      var destroyMove = (_.last(this.actionQueues).action_name) === 'move'

      ActionQueue.destroy({id: id}, function(){
        self.actionQueues.pop()
        if(destroyMove){
          self.setMoveId();
        }
       callback();
      });
    }
    Player.prototype.setMoveId = function(){
      var self = this
      if(self.actionQueues.lenght < 0){
        self.actionQueues.forEach(function(aQ){
          if(aQ.action_name === 'move'){
            self.lastMoveId = aQ.clearing.id
            self.x = aQ.clearing.x
            self.y = aQ.clearing.y
          }
        });
      }else{
        self.x = self.playerInfo.clearing.x
        self.y = self.playerInfo.clearing.y
      }
    };

    /////////////
    // Fighting
    Player.prototype.findFights = function(){
      var self = this
      return $http.get(url+this.id+'/find_fights').then(function(response){
        callback(response.data);
        return response.data
      });
    }
    Player.prototype.submitFightActions = function(params, callback){
      var self = this
      return $http.get(url+this.id+'/submit_fight_actions?fa_id='+params.id+'&attack='+params.a+"&defense="+params.d).then(function(response){
        callback(response.data);
        return response.data
      });
    }
    Player.prototype.fightResults = function(id, callback){
      var self = this
      return $http.get(url+this.id+'/fight_results?fa_id='+id).then(function(response){
        callback(response.data);
        return response.data
      });
    }
    Player.prototype.continueFighting = function(callback){
      var self = this
      return $http.get(url+this.id+'/continue_fighting').then(function(response){
        callback(response.data);
        return response.data
      });
    }

    /////////////////
    // Blocked
    Player.prototype.updateBlock = function(block, callback){
      var self = this
      return $http.get(url+this.id+'/update_block?block='+block).then(function(response){
        callback(response.data)
        return response.data
      });
    }

    return Player;
}]);
