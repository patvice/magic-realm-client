angular.module('MagicRealm')
  .factory('MapBuilder',[
  //-------------
  'spriteJs',
  'MapInfo',
  //-------------
  function (spritesJS, MapInfo) {

    var generateBoard = function(layer){
      var background = []
      var board = MapInfo.board

      angular.forEach(board, function(tileF){
        var options = {
          x: tileF.x,
          y: tileF.y,
          xscale: 0.50,
          yscale: 0.50
        }
        console.log(tileF.imageUrl);
        var tile = layer.Sprite( tileF.imageUrl , options)
        tile.rotate(tileF.rotation)
        background.push(tile)
      })

      console.log(background);
      return background;
    }

    var update = function(board){
      angular.forEach(board, function(tile) {
        tile.update();
      });
    };

    var move = function(board, x, y){
      angular.forEach(board, function(tile) {
        tile.move(x, y);
      });
      if(x === 0) {
        return y
      }else {
        return x
      }
    };

    return{
      generateBoard: generateBoard,
      update: update,
      move: move,
    }
}]);


