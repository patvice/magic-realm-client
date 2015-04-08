angular.module('MagicRealm')
  .service('MapInfo', function(){
    this.board = [
      //ROW 1
      {name: "cliff" , x: 213, y: 0, rotation: 4.71, imageUrl:"images/board/cliff1.gif" },
      //ROW 2
      {name: "evilvalley", x: 106, y: 186, rotation: 1.57, imageUrl:"images/board/evilvalley1.gif" },
      {name: "ledges" , x: 320, y: 186, rotation: 3.66, imageUrl:"images/board/ledges1.gif" },
      {name: "crag", x: 534, y: 186, rotation: 2.62, imageUrl:"images/board/crag1.gif" },
      {name: "darkvalley", x: 748, y: 186, rotation: 1.57, imageUrl:"images/board/darkvalley1.gif" },
      //ROW 3
      {name: "highpass", x: 0, y: 372, rotation: 1.57, imageUrl:"images/board/highpass1.gif"},
      {name: "borderland", x: 214, y: 372, rotation: 4.71, imageUrl:"images/board/borderland1.gif"},
      {name: "oakwoods", x: 428, y: 371, rotation: 3.66, imageUrl:"images/board/oakwoods1.gif"},
      {name: "deepwoods", x: 642, y: 372, rotation: 5.76, imageUrl:"images/board/deepwoods1.gif"},
      {name: "curstvalley", x: 856, y: 372, rotation: 5.76, imageUrl:"images/board/curstvalley1.gif"},
      //ROW 4
      {name: "cavern", x: 107, y: 558, rotation: 0.52, imageUrl:"images/board/cavern1.gif" },
      {name: "badvalley", x: 322, y: 558, rotation: 4.71, imageUrl:"images/board/badvalley1.gif" },
      {name: "maplewoods", x: 534, y: 558, rotation: 1.57, imageUrl:"images/board/maplewoods1.gif" },
      {name: "nutwoods", x: 749, y: 558, rotation: 2.62, imageUrl:"images/board/nutwoods1.gif" },
      //ROW 5
      {name: "mountain", x: 214, y: 744, rotation: 4.71, imageUrl:"images/board/mountain1.gif" },
      {name: "caves", x: 428, y: 744, rotation: 1.57, imageUrl:"images/board/caves1.gif" },
      {name: "ruins", x: 642, y: 744, rotation: 1.57, imageUrl:"images/board/ruins1.gif" },
      {name: "awfulvalley", x: 856, y: 744, rotation: 5.76, imageUrl:"images/board/awfulvalley1.gif" },
      //ROW 6
      {name: "pinewoods", x: 321, y: 930, rotation: 5.76, imageUrl:"images/board/pinewoods1.gif" },
      {name: "lindenwoods", x: 749, y: 930, rotation: 0.52, imageUrl:"images/board/lindenwoods1.gif" }
      ]
});
