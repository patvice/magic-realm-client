'use strict';

var url = 'http://192.168.0.101:3000/'
// var url = #actually_url

angular.module('MagicRealm')
  .service('ActionQueue',[ '$resource', function($resource){
    return $resource(url+'action_queues/:id', null ,{
      create: {method: 'POST'},
      update: {method: 'PUT', params:{id: '@id'} },
      destroy: {method: 'DELETE', params:{id: '@id'}}
    });
}]);
