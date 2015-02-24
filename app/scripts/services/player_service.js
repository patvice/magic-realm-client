'use strict';

// var url = 'http://localhost:3000/'
var url = 'https://shielded-beach-1174.herokuapp.com/'

angular.module('MagicRealm')
  .service('Player',[ '$resource', function($resource){
    return $resource (url+'players/:id/:action',null, {
      create: { method: 'POST' },
      show:   { method:'GET', isArray:false, params:{id: '@id'} },
      update: { method:'PUT', params:{id: '@id'} },
      move_clearing: { method: 'PUT', params:{id: '@id', action: 'move_clearing'} },
      destroy_last_action: {method: 'PUT', params:{id: '@id', action:'destroy_last_action'}},
      submit_actions: {method: 'PUT', params:{id: '@id', action: 'submit_actions'}},
      next_action: {method: 'PUT', params:{id: '@id', action: 'next_action'}},
      chose_selection: {method: 'PUT', params:{id: '@id', action: 'chose_selection'}},
      end_turn: {method: 'GET', params:{id: '@id', action:'end_turn'}}
    });
}]);
