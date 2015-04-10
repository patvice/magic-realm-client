'use strict';

var url = 'http://192.168.0.101:3000/'
// var url = #actually_url

angular.module('MagicRealm')
  .service('PlayerService',[ '$resource', function($resource){
    return $resource (url+'players/:id/:action',null, {
      create: { method: 'POST' },
      show:   { method:'GET', isArray:false, params:{id: '@id'} },
      update: { method:'PUT', params:{id: '@id'} },
    });
}]);
