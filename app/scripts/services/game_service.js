'use strict';

var url = 'http://192.168.0.101:3000/'
// var url = #actually_url

angular.module('MagicRealm')
  .service('GameService',[ '$resource', function($resource){
    return $resource(url+'games/:id', null, {
      index: {method:'GET', isArray:true},
      show: {method: 'GET', params: {id: '@id'}},
      create: {method: 'POST'}
    });
}]);

