'use strict';

/**
 * @ngdoc function
 * @name comp3004App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comp3004App
 */
angular.module('MagicRealm')
  .controller('GameCtrl',['$scope','$window', 'Game', function ($scope, $window, Game) {
    var sjs = $window.sjs

    var game_height = 700;
    var game_width = 725;
    var scene = sjs.Scene({w:game_width, h:game_height});
    var layer = scene.Layer('board', {useCanvas:false});
    sjs.debug = true;

    var clearingJson = [
      // {
      //  "id":1,
      //  "tile": 1,
      //  "traversable": [2],
      //  "hidden": null,
      //  "type": 'mountain',
      //  "clearing-number": 4,
      //  "exit": false,
      //  "clearing": 1,
      //  "x":200,
      //  "y":26
      // },
      // {
      //  "id":2,
      //  "tile": 1,
      //  "traversable": [3, 6],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":240,
      //  "y":26
      // },
      // {
      //  "id":3,
      //  "tile": 1,
      //  "traversable": [2],
      //  "type": 'wood',
      //  "clearing-number": 0,
      //  "exit": true,
      //  "x":250,
      //  "y":6
      // },
      // {
      //  "id":4,
      //  "tile": 1,
      //  "traversable": [1],
      //  "hidden": 0,
      //  "type": 'moutain',
      //  "clearing-number": 0,
      //  "exit": true,
      //  "x":190,
      //  "y":6
      // },
      // {
      //  "id":5,
      //  "tile": 1,
      //  "traversable": [1, 7],
      //  "hidden": 6,
      //  "type": 'moutain',
      //  "clearing-number": 6,
      //  "exit": false,
      //  "x":180,
      //  "y":62
      // },
      // {
      //  "id":6,
      //  "tile": 1,
      //  "traversable": [2,8],
      //  "hidden": 5,
      //  "type": 'wood',
      //  "clearing-number": 3,
      //  "exit": false,
      //  "x":220,
      //  "y":62
      // },
      // {
      //  "id":7,
      //  "tile": 1,
      //  "traversable": [5, 11],
      //  "hidden": 0,
      //  "type": 'moutain',
      //  "clearing-number": 1,
      //  "exit": false,
      //  "x":200,
      //  "y":96
      // },
      // {
      //  "id":8,
      //  "tile": 1,
      //  "traversable": [6,14],
      //  "hidden": 0,
      //  "type": 0,
      //  "clearing-number": 2,
      //  "exit": true,
      //  "x":240,
      //  "y":96
      // },
      // {
      //  "id":9,
      //  "tile": 2,
      //  "traversable": [10],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 0,
      //  "exit": true,
      //  "x":122,
      //  "y":118
      // },
      // {
      //  "id":10,
      //  "tile": 2,
      //  "traversable": [9,13],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 1,
      //  "exit": false,
      //  "x":135,
      //  "y":138
      // },
      // {
      //  "id":11,
      //  "tile": 2,
      //  "traversable": [7,12],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 2,
      //  "exit": false,
      //  "x":174,
      //  "y":136
      // },
      // {
      //  "id":12,
      //  "tile": 2,
      //  "traversable": [11, 36],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":136,
      //  "y":205
      // },
      // {
      //  "id":13,
      //  "tile": 2,
      //  "traversable": [10,42], // #2 ledges
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 4,
      //  "exit": false,
      //  "x":189,
      //  "y":191
      // },
      // {
      //  "id":14,
      //  "tile": 3,
      //  "traversable": [8,18],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 3,
      //  "exit": false,
      //  "x":258,
      //  "y":140
      // },
      // {
      //  "id":15,
      //  "tile":3,
      //  "traversable": [13], //5# ledges
      //  "hidden": null,
      //  "type": 'mountain',
      //  "clearing-number": 2,
      //  "exit": false,
      //  "x":244,
      //  "y":170
      // },
      // {
      //  "id":16,
      //  "tile": 3,
      //  "traversable": [17,45],
      //  "hidden": 18,
      //  "type": 'wood',
      //  "clearing-number": 4,
      //  "exit": false,
      //  "x":282,
      //  "y":174
      // },
      // {
      //  "id":17,
      //  "tile": 3,
      //  "traversable": [16,18],
      //  "hidden": 14,
      //  "type": 'wood',
      //  "clearing-number": 1,
      //  "exit": false,
      //  "x":292,
      //  "y":144
      // },
      // {
      //  "id":18,
      //  "tile": 3,
      //  "traversable": [14,17],
      //  "hidden": 16,
      //  "type": 'wood',
      //  "clearing-number": 6,
      //  "exit": false,
      //  "x":323,
      //  "y":150
      // },
      // {
      //  "id":19,
      //  "tile": 3,
      //  "traversable": [15], //#2 oak woods
      //  "hidden": null,
      //  "type": 'mountain',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":294,
      //  "y":211
      // },
      // {
      //  "id":20,
      //  "tile": 4,
      //  "traversable": [21],
      //  "hidden": 22,
      //  "type": 'mountain',
      //  "clearing-number": 1,
      //  "exit": false,
      //  "x":394,
      //  "y":133
      // },
      // {
      //  "id":21,
      //  "tile": 4,
      //  "traversable": [20,22],
      //  "hidden": null,
      //  "type": 'mountain',
      //  "clearing-number": 4,
      //  "exit": false,
      //  "x":382,
      //  "y":166
      // },
      // {
      //  "id":22,
      //  "tile": 4,
      //  "traversable": [21],
      //  "hidden": 20,
      //  "type": 'mountain',
      //  "clearing-number": 6,
      //  "exit": false,
      //  "x":424,
      //  "y":146
      // },
      // {
      //  "id":23,
      //  "tile": 4,
      //  "traversable": [24,25],
      //  "hidden": null,
      //  "type": 'mountain',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":398,
      //  "y":197
      // },
      // {
      //  "id":24,
      //  "tile": 4,
      //  "traversable": [22,23],
      //  "hidden": 25,
      //  "type": 'mountain',
      //  "clearing-number": 3,
      //  "exit": false,
      //  "x":438,
      //  "y":175
      // },
      // {
      //  "id":25,
      //  "tile": 4,
      //  "traversable": [23,], //#1 deep woods
      //  "hidden": 25,
      //  "type": 'mountain',
      //  "clearing-number": 2,
      //  "exit": false,
      //  "x":432,
      //  "y":210
      // },
      // {
      //  "id":26,
      //  "tile": 5,
      //  "traversable": [29, 30, 31],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 4,
      //  "exit": false,
      //  "x":527,
      //  "y":158
      // },
      // {
      //  "id":27,
      //  "tile": 5,
      //  "traversable": [28,32],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 2,
      //  "exit": false,
      //  "x":577,
      //  "y":177
      // },
      // {
      //  "id":28,
      //  "tile": 5,
      //  "traversable": [27], //#2 deepwoods
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":518,
      //  "y":210
      // },
      // {
      //  "id":29,
      //  "tile": 5,
      //  "traversable": [26], //#1 curst valley
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 1,
      //  "exit": false,
      //  "x":557,
      //  "y":210
      // },
      // {
      //  "id":30,
      //  "tile": 5,
      //  "traversable": [26],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 0,
      //  "exit": true,
      //  "x":568,
      //  "y":120
      // },
      // {
      //  "id":31,
      //  "tile": 5,
      //  "traversable": [26],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 0,
      //  "exit": true,
      //  "x":505,
      //  "y":120
      // },
      // {
      //  "id":32,
      //  "tile": 5,
      //  "traversable": [27],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 0,
      //  "exit": true,
      //  "x":604,
      //  "y":176
      // },
      // {
      //  "id":33,
      //  "tile": 6,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'mountain',
      //  "clearing-number": 0,
      //  "exit": true,
      //  "x":24,
      //  "y":284
      // },
      // {
      //  "id":34,
      //  "tile": 6,
      //  "traversable": [33,37],
      //  "hidden": null,
      //  "type": 'mountain',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":51,
      //  "y":284
      // },
      // {
      //  "id":35,
      //  "tile": 6,
      //  "traversable": [37, 39],
      //  "hidden": null,
      //  "type": 'mountain',
      //  "clearing-number": 4,
      //  "exit": false,
      //  "x":84,
      //  "y":273
      // },
      // {
      //  "id":36,
      //  "tile": 6,
      //  "traversable": [12,36],
      //  "hidden": null,
      //  "type": 'cave',
      //  "clearing-number": 6,
      //  "exit": false,
      //  "x":110,
      //  "y":250
      // },
      // {
      //  "id":37,
      //  "tile": 6,
      //  "traversable": [34,35],
      //  "hidden": null,
      //  "type": 'mountain',
      //  "clearing-number": 1,
      //  "exit": false,
      //  "x":79,
      //  "y":312
      // },
      // {
      //  "id":38,
      //  "tile": 6,
      //  "traversable": [36], //5# caven
      //  "hidden": null,
      //  "type": 'cave',
      //  "clearing-number": 3,
      //  "exit": false,
      //  "x":110,
      //  "y":316
      // },
      // {
      //  "id":39,
      //  "tile": 6,
      //  "traversable": [35,40], //#1 boarderland
      //  "hidden": null,
      //  "type": 'mountain',
      //  "clearing-number": 2,
      //  "exit": false,
      //  "x":128,
      //  "y":282
      // },
      // {
      //  "id":40,
      //  "tile": 7,
      //  "traversable": [39], // Bad Valley #6
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 1,
      //  "exit": false,
      //  "x":176,
      //  "y":306
      // },
      // {
      //  "id":41,
      //  "tile": 7,
      //  "traversable": [42,43],
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 3,
      //  "exit": false,
      //  "x":181,
      //  "y":265
      // },
      // {
      //  "id":42,
      //  "tile": 7,
      //  "traversable": [13,41], //Dark Woods #2
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 2,
      //  "exit": false,
      //  "x":213,
      //  "y":243
      // },
      // {
      //  "id":43,
      //  "tile": 7,
      //  "traversable": [40,41,45],
      //  "hidden": null,
      //  "type": 'cave',
      //  "clearing-number": 6,
      //  "exit": false,
      //  "x":206,
      //  "y":290
      // },
      // {
      //  "id":44,
      //  "tile": 7,
      //  "traversable": [41,45], //Cavern #2
      //  "hidden": null,
      //  "type": 'cave',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":234,
      //  "y":301
      // },
      // {
      //  "id":45,
      //  "tile": 7,
      //  "traversable": [44,43,16],
      //  "hidden": null,
      //  "type": 'cave',
      //  "clearing-number": 4,
      //  "exit": false,
      //  "x":262,
      //  "y":308
      // },
      {
       "id":46,
       "tile": 8,
       "traversable": [42,47],
       "hidden": null,
       "type": 'wood',
       "clearing-number": 2,
       "exit": false,
       "x":316,
       "y":270
      },
      {
       "id":47,
       "tile": 8,
       "traversable": 0,
       "hidden": null,
       "type": 'wood',
       "clearing-number": 4,
       "exit": false,
       "x":385,
       "y":284
      },
      {
       "id":48,
       "tile": 8,
       "traversable": 0,
       "hidden": null,
       "type": 'wood',
       "clearing-number": 5,
       "exit": false,
       "x":346,
       "y":320
      },
      // {
      //  "id":178,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":420,
      //  "y":280
      // },
      // {
      //  "id":179,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":460,
      //  "y":300
      // },
      // {
      //  "id":180,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":420,
      //  "y":320
      // },
      // {
      //  "id":181,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":460,
      //  "y":340
      // },
      // {
      //  "id":182,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":500,
      //  "y":320
      // },
      // {
      //  "id":183,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":500,
      //  "y":280
      // },
      // {
      //  "id":184,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":560,
      //  "y":300
      // },
      // {
      //  "id":185,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":560,
      //  "y":260
      // },
      // {
      //  "id":186,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":600,
      //  "y":260
      // },
      // {
      //  "id":187,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":600,
      //  "y":320
      // },
      // {
      //  "id":188,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":620,
      //  "y":240
      // },
      // {
      //  "id":189,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":660,
      //  "y":300
      // },
      // {
      //  "id":190,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":120,
      //  "y":380
      // },
      // {
      //  "id":191,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":160,
      //  "y":380
      // },
      // {
      //  "id":192,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":140,
      //  "y":400
      // },
      // {
      //  "id":193,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":180,
      //  "y":400
      // },
      // {
      //  "id":194,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":140,
      //  "y":420
      // },
      // {
      //  "id":195,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":120,
      //  "y":440
      // },
      // {
      //  "id":196,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":240,
      //  "y":420
      // },
      // {
      //  "id":197,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":240,
      //  "y":380
      // },
      // {
      //  "id":198,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":280,
      //  "y":380
      // },
      // {
      //  "id":199,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":280,
      //  "y":440
      // },
      // {
      //  "id":200,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":400,
      //  "y":380
      // },
      // {
      //  "id":201,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":380,
      //  "y":440
      // },
      // {
      //  "id":202,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":420,
      //  "y":420
      // },
      // {
      //  "id":203,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":520,
      //  "y":380
      // },
      // {
      //  "id":204,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":500,
      //  "y":440
      // },
      // {
      //  "id":205,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":560,
      //  "y":420
      // },
      // {
      //  "id":206,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":580,
      //  "y":400
      // },
      // {
      //  "id":207,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":140,
      //  "y":520
      // },
      // {
      //  "id":208,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":160,
      //  "y":520
      // },
      // {
      //  "id":209,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":180,
      //  "y":480
      // },
      // {
      //  "id":210,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":220,
      //  "y":480
      // },
      // {
      //  "id":211,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":180,
      //  "y":540
      // },
      // {
      //  "id":212,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":220,
      //  "y":520
      // },
      // {
      //  "id":213,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":220,
      //  "y":560
      // },
      // {
      //  "id":214,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":280,
      //  "y":520
      // },
      // {
      //  "id":215,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":300,
      //  "y":480
      // },
      // {
      //  "id":216,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":340,
      //  "y":520
      // },
      // {
      //  "id":217,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":360,
      //  "y":480
      // },
      // {
      //  "id":218,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":300,
      //  "y":560
      // },
      // {
      //  "id":219,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":360,
      //  "y":540
      // },
      // {
      //  "id":220,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":420,
      //  "y":480
      // },
      // {
      //  "id":221,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":480,
      //  "y":500
      // },
      // {
      //  "id":222,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":440,
      //  "y":520
      // },
      // {
      //  "id":223,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":440,
      //  "y":560
      // },
      // {
      //  "id":224,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":460,
      //  "y":540
      // },
      // {
      //  "id":225,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":500,
      //  "y":540
      // },
      // {
      //  "id":226,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":540,
      //  "y":520
      // },
      // {
      //  "id":227,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":560,
      //  "y":480
      // },
      // {
      //  "id":228,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":620,
      //  "y":520
      // },
      // {
      //  "id":229,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":560,
      //  "y":560
      // },
      // {
      //  "id":230,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":620,
      //  "y":460
      // },
      // {
      //  "id":231,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":660,
      //  "y":520
      // },
      // {
      //  "id":232,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":240,
      //  "y":600
      // },
      // {
      //  "id":233,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":200,
      //  "y":620
      // },
      // {
      //  "id":234,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":220,
      //  "y":640
      // },
      // {
      //  "id":235,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":240,
      //  "y":680
      // },
      // {
      //  "id":236,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":300,
      //  "y":620
      // },
      // {
      //  "id":238,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":320,
      //  "y":620
      // },
      // {
      //  "id":239,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":460,
      //  "y":620
      // },
      // {
      //  "id":240,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":520,
      //  "y":640
      // },
      // {
      //  "id":241,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":500,
      //  "y":600
      // },
      // {
      //  "id":242,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":560,
      //  "y":620
      // },
      // {
      //  "id":243,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":580,
      //  "y":620
      // },
      // {
      //  "id":115,
      //  "tile": 1,
      //  "traversable": 0,
      //  "hidden": null,
      //  "type": 'wood',
      //  "clearing-number": 5,
      //  "exit": false,
      //  "x":560,
      //  "y":680
      // }
    ];

    var background = layer.Sprite('images/map-v2-clean.gif');
    background.move(0, 0);

    var clearing = scene.Layer('clearning', {useCanvas:true});


    var circles = [];
    var add_circles = function(){
      for (var i = 0; i < clearingJson.length; i++) {
        var circle = clearing.Sprite('images/circle.gif');
        var c = clearingJson[i]

        console.log(c.x);
        circle.move(c.x, c.y);
        circles.push(circle)
      };
    };

    var paint = function() {
      background.update();
      for(var i=0; i < circles.length; i++){
        var c = circles[i]
        c.update();
      }
    };

    var ticker = scene.Ticker(25, paint);

    Game.index(function (index) {
      $scope.game = index
    });

    angular.element('document').ready(function () {
      add_circles();
      ticker.run();
    });

    $scope.game_response = angular.toJson($scope.game, 4);
}]);
