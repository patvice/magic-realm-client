'use strict';

var url = 'http://localhost:3000/'
// var url = #actually_url

angular.module('MagicRealm')
  .service('Player',[ '$resource', function($resource){
    return $resource (url+'players/:id/:action',null, {
      create: { method: 'POST' },
      show:   { method:'GET', isArray:false, params:{id: '@id'} },
      update: { method:'PUT' },
      move_clearing: { method: 'PUT', params:{id: '@id', action: 'move_clearing'} },
      destroy_last_action: {method: 'PUT', params:{id: '@id', action:'destroy_last_action'}}
    });
}]);

//http://localhost:3000/players/1/move_clearing
//http://localhost:3000/players/1/move_clearing
