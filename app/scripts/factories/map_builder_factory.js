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

      angular.forEach(board, function(tile){
        var options = {
          x: tile.x,
          y: tile.y,
          rotation: tile.rotation,
          xscale: 0.50,
          yscale: 0.50
        }
        console.log(tile.imageUrl);
        var tile = layer.Sprite( tile.imageUrl , options)
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


