'use strict';

var url = 'http://localhost:3000/'
// var url = #actually_url

angular.module('MagicRealm')
  .service('Player',[ '$resource', function($resource){
    var res = $resource(url+'players/:id/:action', {id: '@id'}, {
      show:  {method:'GET', isArray:false, params:{id: '@id'}},
      update: { method:'PUT'},
      move_clearing: {method: 'PUT', params:{id: '@id', action: 'move_clearing'}}
    });
    window.res_player = res
    return res;
}]);

//http://localhost:3000/players/1/move_clearing
//http://localhost:3000/players/1/move_clearing
