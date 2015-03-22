angular.module('MagicRealm')
  .service('MapInfo', function(){
    this.board = [
      //ROW 1
      {name: "cliff1" , x: 213, y: 0, rotation: 4.71, imageUrl:"images/board/cliff1.gif" },
      //ROW 2
      {name: "evilvalley1", x: 106, y: 186, rotation: 1.57, imageUrl:"images/board/evilvalley1.gif" },
      {name: "ledges1" , x: 320, y: 186, rotation: 3.66, imageUrl:"images/board/ledges1.gif" },
      {name: "crag1", x: 534, y: 186, rotation: 2.62, imageUrl:"images/board/crag1.gif" },
      {name: "darkvalley1", x: 748, y: 186, rotation: 1.57, imageUrl:"images/board/darkvalley1.gif" },
      //ROW 3     -29
      {name: "highpass1", x: 0, y: 372, rotation: 1.57, imageUrl:"images/board/highpass1.gif"},
      {name: "borderland1", x: 214, y: 372, rotation: 4.71, imageUrl:"images/board/borderland1.gif"},
      {name: "oakwoods1", x: 428, y: 371, rotation: 3.66, imageUrl:"images/board/oakwoods1.gif"},      
      {name: "deepwoods1", x: 642, y: 372, rotation: 5.76, imageUrl:"images/board/deepwoods1.gif"},
      {name: "curstvalley1", x: 856, y: 372, rotation: 5.76, imageUrl:"images/board/curstvalley1.gif"},
      //ROW 4
      {name: "cavern1", x: 107, y: 558, rotation: 0.52, imageUrl:"images/board/cavern1.gif" },
      {name: "badvalley1", x: 322, y: 558, rotation: 4.71, imageUrl:"images/board/badvalley1.gif" },
      {name: "maplewoods1", x: 534, y: 558, rotation: 1.57, imageUrl:"images/board/maplewoods1.gif" },
      {name: "nutwoods1", x: 749, y: 558, rotation: 2.62, imageUrl:"images/board/nutwoods1.gif" },
      //ROW 5
      {name: "mountain1", x: 214, y: 744, rotation: 4.71, imageUrl:"images/board/mountain1.gif" },
      {name: "caves1", x: 428, y: 744, rotation: 1.57, imageUrl:"images/board/caves1.gif" },
      {name: "ruins1", x: 642, y: 744, rotation: 1.57, imageUrl:"images/board/ruins1.gif" },
      {name: "awfulvalley1", x: 856, y: 744, rotation: 5.76, imageUrl:"images/board/awfulvalley1.gif" },
      //ROW 6
      {name: "pinewoods1", x: 321, y: 930, rotation: 5.76, imageUrl:"images/board/pinewoods1.gif" },
      {name: "lindenwoods1", x: 749, y: 930, rotation: 0.52, imageUrl:"images/board/lindenwoods1.gif" }
      ]
});
