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
        var tile = layer.Sprite( tileF.imageUrl , options)
        tile.rotate(tileF.rotation)
        tile.name = tileF.name
        background.push(tile)
      })
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

    var enchantTile = function(board, tileName){
      angular.forEach(board, function(tile) {
        if(tile.name === tileName){
          var re = /-e1/
          var m = re.exec(tile.src)
          if(m === null){
            tile.loadImg('images/board/'+tileName+'-e1.gif');
            tile.update();
            console.log('e1: '+tile)
          }else{
            tile.loadImg('images/board/'+tileName+'1.gif');
            tile.update();
            console.log('1: '+tile)
          }
        }
      });
    };

    return{
      generateBoard: generateBoard,
      update: update,
      move: move,
      enchantTile: enchantTile
    }
}]);


