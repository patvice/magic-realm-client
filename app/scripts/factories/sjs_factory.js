'use strict';

angular.module('MagicRealm')
  .service('Sjs',['_', 'spriteJs', 'MapBuilder', function( _, spriteJs, MapBuilder){

    ////////////////
    // Draw Varabiles
    ///////////////
    //
    var sjs = spriteJs
    sjs.debug = true;

    var x_mouse = 0;
    var y_mouse = 0;
    var offSetX = 0;
    var offSetY = 0;
    var x_y_mouse = "0, 0";
    var spriteObjects = {};

    var gameHeight = 650;
    var gameWidth = 725;
    var scene = sjs.Scene({w: gameWidth, h: gameHeight});
    var board = scene.Layer('board', {useCanvas:false});
    var clearing = scene.Layer('clearing', {useCanvas:true});
    var buildings = scene.Layer('buildings', {userCanvas:true});
    var objects = scene.Layer('objects', {userCanvas:true});

    var input = scene.Input();
    var mouse = input.mouse;

    var background = MapBuilder.generateBoard(board);

    //////////////////
    // Draw Functions
    //////////////////
    //
    var setCircles = function(clearing){
      var circle = clearing.Sprite('images/circle.gif')
      spriteObjects.circle = circle
    }

    var move_circle = function (x, y){
      spriteObjects.circle.position(x-12, y-12);
    };
    var lasted_clicked = function(){
      x_y_mouse = (mouse.click.x+offSetX)+", "+(mouse.click.y+offSetY);
    }

    var paint = function() {
      MapBuilder.update(background);
      Object.keys(spriteObjects).forEach(function (key) {
        var value = spriteObjects[key]
        if(Array.isArray(value)){
          value.forEach(function(v){
            v.update();
          });
        }else{
          value.update();
        }
      });

      if(mouse.position.x !== x_mouse && mouse.position.y !== y_mouse){
        x_mouse = mouse.position.x
        y_mouse = mouse.position.y
        move_circle(x_mouse, y_mouse)
      }
      if(input.keyboard.up)   { offSetY -= MapBuilder.move(background, 0, 5) }
      if(input.keyboard.down) { offSetY -= MapBuilder.move(background, 0, -5) }
      if(input.keyboard.left) { offSetX -= MapBuilder.move(background, 5, 0) }
      if(input.keyboard.right){ offSetX -= MapBuilder.move(background, -5, 0) }
      if(mouse.click)   { lasted_clicked() }
    };

    var Sjs = function(){
      ticket.run();
    };

    Sjs.prototype.lastedClicked = function(){
      return x_y_mouse;
    };
    Sjs.prototype.pauseTicker = function(sjs){
      sjs.ticker.pause()
    };
    Sjs.prototype.resumeTicket = function(sjs){
      sjs.ticker.resume();
    };

    setCircles(clearing)
    var ticket = scene.Ticker(5, paint);

  return Sjs
}]);
