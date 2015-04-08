 // $scope.waiting_for_fight = function(){
    //   $scope.interval = setInterval(function(){
    //     $scope.game.currentPlayer(function(gameInfo){
    //       if(gameInfo.time_of_day === 'evening'){
    //         $scope.phase = 'evening'
    //         $scope.findFight();
    //         clearInterval($scope.interval);
    //       }else{
    //         var cP = gameInfo.current_player;
    //         $scope.notifications = gameInfo.notifications
    //         $scope.sjs.moveOtherPlayer(cP.x, cP.y, cP.id);
    //       }
    //     });
    //   },10000);
    // };

    // $scope.findFight = function(){
    //   $scope.player.findFights(function(fightActions){
    //     $scope.fightActions = fightActions
    //     console.log($scope.fightActions)
    //     if($scope.fightActions.length === 0){
    //       $scope.wait_for_next_phase('birdsong')
    //     }
    //     $scope.manageFights();
    //   });
    // };

    // $scope.manageFights = function(){
    //   $scope.fightOptions = {
    //     attack: 0,
    //     defense: 0,
    //   }
    //   if($scope.fightActions.length === 0){
    //     $scope.waitForNextRound();
    //   };
    //   $scope.currentFight = fightActions.pop();
    //   $scope.attack();
    // };
    // $scope.attack = function(){
    //   $scope.items = ['Thurst','Swing','Smash'];
    //   $scope.text = 'Pick your attack...';
    //   $scope.selected = "Nothing Yet";
    //   $scope.open(nil, function(selectedItem){
    //     $scope.fightOptions.attack = $scope.attackToInt(selectedItem)
    //     $scope.defense();
    //   });
    // }
    // $scope.defense = function(){
    //   $scope.items = ['Charge','Dodge','Duck'];
    //   $scope.text = 'Pick your defense...';
    //   $scope.selected = "Nothing Yet";
    //   $scope.open(nil, function(selectedItem){
    //     $scope.fightOptions.defense = $scope.defenseToInt(selectedItem)
    //     $scope.submitFightAction();
    //   });
    // }

    // $scope.attackToInt = function(attack){
    //   var a;
    //   switch(defense){
    //     case 'Thurst':
    //       a = 1;
    //       break;
    //     case 'Swing':
    //       a = 2;
    //       break;
    //     case 'Smash':
    //       a = 3;
    //       break;
    //   }
    //   return a;
    // };

    // $scope.defenseToInt = function(defense){
    //   var d;
    //   switch(defense){
    //     case 'Charge':
    //       d = 1;
    //       break;
    //     case 'Dodge':
    //       d = 2;
    //       break;
    //     case 'Duck':
    //       d = 3;
    //       break;
    //   }
    //   return d;
    // }

    // $scope.submitFightAction =  function(){
    //   var params = {
    //     id: $scope.currentFight.id,
    //     a: $scope.fightOptions.attack,
    //     d: $scope.fightOptions.defense
    //   }
    //   $scope.player.submitFightActions(params, function(fightAction){
    //     $scope.phase = 'waitingOtherTurn'
    //     $scope.interval = setInterval(function(){
    //       $scope.player.fightResults(function(fight){
    //         var fightInfo = _.first(fight)
    //         var results = _.last(fight)
    //         if(fightInfo.complete === true){
    //           $scope.displayResults(results);
    //           clearInterval($scope.interval);
    //         }
    //       });
    //     },10000);
    //   })
    // };

    // $scope.displayResults = function(results){
    //   $scope.items = [''];
    //   $scope.text = results;
    //   $scope.selected = "Nothing Yet";
    //   $scope.open(nil, function(){
    //     $scope.continueFighting();
    //   });
    // }

    // $scope.continueFighting = function(){
    //   $scope.items = ['Continue Fighting', 'Run Away'];
    //   $scope.text = 'What would you like to do about this fight?';
    //   $scope.selected = "Nothing Yet";
    //   $scope.open(nil, function(selectedItem){
    //     var params = {
    //       id: $scope.currentFight.id,
    //       reaction: selectedItem
    //     }
    //     $scope.player.continueFighting(params, function(fa){
    //       if(fa.after_fight_one === null || fa.after_fight_two === null ){
    //         $scope.interval = setInterval(function(){
    //           $scope.player.fightResults(function(fight){
    //             var fightInfo = _.first(fight);
    //             var results = _.last(fight);
    //             c = $scope.continue(fightInfo)
    //             if(c === true)
    //               clearInterval($scope.interval);
    //           });
    //         },10000);
    //       }else{
    //         $scope.continue(fa)
    //       }
    //     });
    //   });
    // }

    // $scope.continue = function(fa){
    //   if(fa.after_fight_one === null || fa.after_fight_two === null ){
    //     return false;
    //   }else if(fa.after_fight_one === 'run_away' || fa.after_fight_one === 'continue'){
    //     $scope.wait_for_next_phase('birdsong')
    //     return true;
    //   }else{
    //     $scope.findFight();
    //     return true;
    //   }
    // }


var enchantTile = function(board, layer, tileName){
      index = 0
      newTile = null;
      angular.forEach(board, function(tile) {
        if(tile.name === tileName){
          var re = /-e1/
          var m = re.exec(tile.src)
          var options = {
              x: tile.x,
              y: tile.y,
              tile: 0.50,
              tile: 0.50
            }
            tile.remove();
          if(m !== null){
            newTile = layer.Sprite('images/board/'+tileName+'-e1.gif', options)
          }else{
            newTile = layer.Sprite('images/board/'+tileName+'1.gif', options)
          }
          board[index].remove()
        }
        index += 1;
      });
      board.push(newTile)
    };
