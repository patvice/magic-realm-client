'use strict';

// var url = 'http://127.0.0.1:3000/'
var url = 'https://shielded-beach-1174.herokuapp.com/'

angular.module('MagicRealm')
  .service('ActionQueue',[ '$resource', function($resource){
    return $resource(url+'action_queues/:id', null ,{
      create: {method: 'POST'},
      update: {method: 'PUT', params:{id: '@id'} },
    });
}]);
