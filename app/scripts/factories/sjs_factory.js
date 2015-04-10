'use strict';

angular.module('MagicRealm')
  .service('Sjs',['_', 'spriteJs', 'MapBuilder', function( _, spriteJs, MapBuilder){

    ////////////////
    // Draw Varabiles
    ///////////////
    //
    var sjs = spriteJs
    sjs.debug = true;

    var oldMouseX = 0;
    var oldMouseY = 0;
    var offSetX = 0;
    var offSetY = 0;
    var x_y_mouse = "0, 0";

    var spriteObjects = {};
    spriteObjects.blueCircles = [];
    spriteObjects.greenCircles = [];

    var scene = sjs.Scene({w: 700, h: 600});

    var board = scene.Layer('board', {useCanvas:false});
    var clearing = scene.Layer('clearing', {useCanvas:true});
    var buildings = scene.Layer('buildings', {userCanvas:true});
    var objects = scene.Layer('objects', {userCanvas:true});
    var player = scene.Layer('player', {userCanvas:true})

    var input = scene.Input();
    var mouse = input.mouse;

    var clearingObjects = [];
    var clearingScene = sjs.Scene({w: 700, h: 80});
    var tray = clearingScene.Layer('tray', {userCanvas:true});

    var background = MapBuilder.generateBoard(board);
    var updateMove;
    var updateGoldPiles;

    //////////////////
    // Draw Functions
    //////////////////
    //
    var setGame = function(){
      //Guard
      spriteObjects.guard = buildings.Sprite('images/dwellings/guard.jpg')
      spriteObjects.guard.position(956, 447);
      //House
      spriteObjects.house = buildings.Sprite('images/dwellings/house.jpg')
      spriteObjects.house.position(1124, 520);
      //Inn
      spriteObjects.inn = buildings.Sprite('images/dwellings/inn.jpg')
      spriteObjects.inn.position(527, 705);
      //Chapel
      spriteObjects.chapel = buildings.Sprite('images/dwellings/chapel.jpg')
      spriteObjects.chapel.position(606, 1105);
    };

    var setPlayer = function(className, x, y){
      var img = 'images/character_icons/chr_'+className+'.jpg'
      var playerSprite = player.Sprite(img);
      playerSprite.move(x, y)
      spriteObjects.player = playerSprite;
    };

    var setOtherPlayers = function(game, player_id){
      spriteObjects.otherPlayers = [];
      game.players.forEach(function(player){
        if(player_id !== player.id){
          var img = 'images/character_icons/chr_'+player.character_class.name+'.jpg'
          var playerSprite = objects.Sprite(img);
          playerSprite.id = player.id
          playerSprite.move(player.clearing.x, player.clearing.y)
          spriteObjects.otherPlayers.push(playerSprite);
        }
      });
    }

    var setTreasures = function(treasures){
      spriteObjects.treasures = []
      treasures.forEach(function(treasure){
        var sprite = objects.Sprite('images/treasures.gif');
        sprite.id = treasure.clearing_id;
        sprite.move(treasure.x-offSetX, treasure.y-offSetY);
        spriteObjects.treasures.push(sprite)
      });
    }

    var setCircles = function(clearing){
    };

    var paint = function() {
      MapBuilder.update(background);
      cicyleSpriteObject(updateSprite, [])

      // if(mouse.position.x !== x_mouse && mouse.position.y !== y_mouse){
      //   x_mouse = mouse.position.x
      //   y_mouse = mouse.position.y
      //   move_circle(x_mouse, y_mouse)
      // }
      if(input.keyboard.up)   { moveObjects(0, 5) }
      if(input.keyboard.down) { moveObjects(0, -5)}
      if(input.keyboard.left) { moveObjects(5, 0) }
      if(input.keyboard.right){ moveObjects(-5, 0)}

      if(mouse.click){
        var yM = mouse.click.x !== oldMouseX
        var xM = mouse.click.y !== oldMouseY
        if(yM && xM){
          oldMouseX = mouse.click.x
          oldMouseY = mouse.click.y
          clearClearingSence();
          if(spriteObjects.blueCircles)
            checkForCircles();
        }
      }
    };
    var cicyleSpriteObject = function(callback, args){
      Object.keys(spriteObjects).forEach(function (key) {
        var value = spriteObjects[key]
        if(Array.isArray(value)){
          if(key !== 'clearings'){
            value.forEach(function(v){
              callback(v, args)
            });
          }
        }else{
          callback(value, args)
        }
      });
    };

    var updateSprite = function(sprite, args){
      sprite.update();
    };

    var moveSprite = function(sprite, args){
      var x = _.first(args);
      var y = _.last(args);
      sprite.move(x, y);
    }
    var addToClearingScence = function(sprite, args){
      // remove circles
      var re = /circle/
      var m = re.exec(sprite.src)
      if(m !== null){return;}
      // Calls function to update treasure list

      var x = _.first(args);
      var y = _.last(args);

      var withInX = sprite.x < x && (sprite.x+30) > x
      var withInY = sprite.y < y && (sprite.y+30) > y
      if(withInX && withInY){
        var re = /treasures/
        var m = re.exec(sprite.src)
        if(m !== null){updateGoldPiles(sprite.id)}
        placeInClearing(sprite)
      }
    }

    var moveObjects = function (x,y){
      MapBuilder.move(background, x, y)
      var args = [x,y]
      offSetY -= y
      offSetX -= x
      cicyleSpriteObject(moveSprite, args)
    };
    var checkInClearing = function(x, y){
      var args = [x,y]
      cicyleSpriteObject(addToClearingScence, args)
    };

    var placeInClearing = function(sprite){

      var re = /(\images\/.*)/;
      var m = re.exec(sprite.src)
      var url = _.last(m)

      var newSprite = tray.Sprite(url)

      var x = (clearingObjects.length*30)+5
      newSprite.position(x,5)
      clearingObjects.push(newSprite)
    };

    var clearClearingSence = function(){
      ticket2.pause();
      clearingObjects.forEach(function(sprite){
        sprite.remove()
      });
      updateGoldPiles(0);
      clearingObjects = [];
      checkInClearing(oldMouseX, oldMouseY);
      ticket2.resume();
    };

    var checkForCircles = function(){
      spriteObjects.blueCircles.forEach(function(bC){
        var withInX = bC.x < oldMouseX && (bC.x+30) > oldMouseX
        var withInY = bC.y < oldMouseY && (bC.y+30) > oldMouseY
        if(withInX && withInY){
          updateMove(bC.id)
        }
      });
    }

    var clearingPaint = function(){
      clearingObjects.forEach(function(cO){
        try {
          cO.update();
        }finally{
           return;
        }
      });
    };

    var removeAddMonsters = function(monsters){
      var oldMonsters = spriteObjects.monsters
      spriteObjects.monsters = []
      if(oldMonsters !== undefined){
        oldMonsters.forEach(function(monster){
          monster.remove();
        });
      }
      monsters.forEach(function(monster){
        var img = 'images/monsters/'+monster.url
        var monsterSprite = buildings.Sprite(img);
        monsterSprite.move(monster.x-offSetX, monster.y-offSetY)
        spriteObjects.monsters.push(monsterSprite);
      });
    }

    var Sjs = function(player, game, callback1, callback2){
      setPlayer(player.playerInfo.character_class.name, player.x, player.y);

      setOtherPlayers(game, player.playerInfo.id);
      removeAddMonsters(game.monsters)
      setTreasures(player.playerInfo.found_clearings);
      setGame();
      updateMove = callback1;
      updateGoldPiles = callback2;
      ticket.run();
    };

    Sjs.prototype.movePlayerSB = function(x,y,action){
      if(action !== 'move'){return;}

      if(!spriteObjects.greenCircles)
        spriteObjects.greenCircles = []

      var passedMove = clearing.Sprite('images/circle.gif')
      passedMove.position(spriteObjects.player.x-12, spriteObjects.player.y-12)
      spriteObjects.greenCircles.push(passedMove)
      spriteObjects.player.position((x-offSetX),y-offSetY);
    };
    Sjs.prototype.movePlayer = function(x,y){
      spriteObjects.player.position((x-offSetX),y-offSetY);
    }

    Sjs.prototype.moveOtherPlayer = function(x,y,id){
      spriteObjects.otherPlayers.forEach(function(player){
        if(player.id === id){
          player.position(x-offSetX,y-offSetY)
        }
      })
    }

    Sjs.prototype.setBlueCircles = function(clearings){
      spriteObjects.blueCircles = []
      clearings.forEach(function(c){
        var sprite = clearing.Sprite('images/circleBlue.gif')
        sprite.position(c.x-offSetX-12, c.y-offSetY-12)
        sprite.id = c.id
        spriteObjects.blueCircles.push(sprite)
      })
    };
    Sjs.prototype.removeBlueCircles = function(clearings){
      var sprites = spriteObjects.blueCircles
      spriteObjects.blueCircles = []
      sprites.forEach(function(s){
        s.remove();
      })
    };
    Sjs.prototype.removeGreenCircles = function(){
      var sprites = spriteObjects.greenCircles
      spriteObjects.greenCircles = []
      sprites.forEach(function(sprite){
        sprite.remove();
      });
    }
    Sjs.prototype.removeAndSetTreasures = function(treasures){
      var t = spriteObjects.treasures
      spriteObjects.treasures = []
      t.forEach(function(treasure){
        treasure.remove();
      })
      treasures.forEach(function(treasure){
        var sprite = objects.Sprite('images/treasures.gif');
        sprite.id = treasure.clearing_id;
        sprite.move(treasure.x-offSetX, treasure.y-offSetY);
        spriteObjects.treasures.push(sprite)
      });
    }
    Sjs.prototype.addMonsters = function(monsters){
      removeAddMonsters(monsters);
    }

    Sjs.prototype.pauseTicker = function(sjs){
      sjs.ticker.pause()
    };
    Sjs.prototype.resumeTicket = function(sjs){
      sjs.ticker.resume();
    };

    Sjs.prototype.enchantTile = function(tileName){
      MapBuilder.enchantTile(background, tileName);
    };

    Sjs.prototype.reverseTiles = function(tileNames){
      tileNames.forEach(function(tileName){
        MapBuilder.enchantTile(background, tileName);
      });
    }

    Sjs.prototype.remove_sjs = function(){
      scene.remove();
    }

    var ticket = scene.Ticker(5, paint);
    var ticket2 = clearingScene.Ticker(20, clearingPaint)

  return Sjs
}]);
