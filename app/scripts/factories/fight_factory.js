'use strict';

angular.module('MagicRealm')
  .factory('Fight',[
  //---------------
    '_',
    '$http',
  //---------------
    function( _, $http){

      var url = 'http://192.168.0.101:3000/fight_queues/'
    // TODO: Move url to a config file
    // var url =

    var Fight = function(id, player_id){
      this.id = id;
      this.player_id = player_id;
      this.queue = null;
      this.actor = null;
      this.action = null;
      this.player = null;
      this.otherActors = null;
    }

    Fight.prototype.findFight = function(callback){
      var self = this;
      return $http.get(url+'find_fight?player_id='+this.player_id).then(function(response){
        callback(response.data)
        return response
      });
    };
    Fight.prototype.loadFight = function(callback){
      var self = this;
      return $http.get(url+this.id+'/fight?player_id='+this.player_id).then(function(response){
        self.queue = response.data.queue
        self.actor = response.data.actor
        self.action = response.data.action
        self.player = response.data.player
        callback(response.data)
        return response
      });
    };
    Fight.prototype.loadOtherFighters = function(callback){
      var self = this;
      return $http.get(url+this.id+'/other_fights?actor_id='+this.actor.id).then(function(response){
        self.otherActors = response.data
        self.generate_image_source();
        callback(response.data)
        return response
      });
    };

    Fight.prototype.generate_image_source = function(){
      this.otherActors.forEach(function(actor){
        if(actor.monster_id === null){
          actor.img_src = 'images/character_icons/chr_'+actor.player.character_class.name+'.jpg'
        }else{
          actor.img_src = 'images/monsters_fight/'+actor.monster.name
        }
      })
    };

    Fight.prototype.currentState = function(callback){
      var self = this
      return $http.get(url+this.id+'/current_state').then(function(response){
        callback(response.data)
        return response
      });
    };

    Fight.prototype.submitFight = function(a, d, t, callback){
      var self = this
      var request_url = url+this.id+'/submit_fight?attack='+a+'&defence='+d+'&target='+t+'&fight_id='+this.action.id
      return $http.get(request_url).then(function(response){
        callback(response.data)
        return response
      });
    };

    Fight.prototype.playerChoice = function(option, callback){
      var self = this
      return $http.get(url+this.id+'/player_choice?fight_id='+this.actor.id+'&option='+option).then(function(response){
        callback(response.data)
        return response
      });
    };

    return Fight;
}]);
