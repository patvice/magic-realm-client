'use strict';

var url = 'http://127.0.0.1:3000/'
// var url = #actually_url

angular.module('MagicRealm')
  .service('Game',[ '$resource', function($resource){
    return $resource(url+'games/:id', null, {
      index: {method:'GET', isArray:true},
      show: {method: 'GET', params: {id: '@id'}},
      create: {method: 'POST'}
    });
}]);

