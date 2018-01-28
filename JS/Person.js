var Person = function(game, x, image, patrol) {

  this.isMainPlayer = false;
  this.currentTile = x;
  this.patrol = patrol;
  this.direction = 'd';
  this.oldTween;
  var myTilePosition = isoGroup.children[x]._isoPosition;
  isoGroup.children[x].hasAHuman = true;
  var person = game.add.isoSprite(myTilePosition.x, myTilePosition.y, 0, image, 0, isoGroup);
  person.anchor.setTo(-0.25, 0.4);
  person.animations.add('up', [1], 10, true);
  person.animations.add('right', [2], 10, true);
  person.animations.add('left', [0], 10, true);
  person.animations.add('down', [3], 10, true);
  person.animations.play('down');

  this.update = function() {
      game.iso.topologicalSort(isoGroup);
  },

  this.walkingAudio = function() {
    this.step1 = game.add.audio('step1');
    this.step2 = game.add.audio('step2');
    this.step1.play();
    this.step2.play();

  },


  this.infectAudio = function() {
    this.music = game.add.audio('infect');
    this.music.play();
  },

  this.infect = function(){
    this.isMainPlayer = true;

    this.infectAudio();
    game.killCounter.update();
    game.moveCounter.resetMoves();
    person.tint =  0xb4ead1;
    mainPlayer = this;
    patients --;
    return true;
  },


  this.die = function(p){
     isoGroup.children[this.currentTile].hasAHuman = false;
     people.splice(this.currentTile, 1);
  },


  this.heal = function(callback){

      if(game.Healed) return;
      game.Healed = true;

        var j = this.currentTile;

      var p =isoGroup.children[j];


      var tween = game.add.tween(p);
      tween.to({
              alpha: 0
          },
          10,
          Phaser.Easing.Linear.none, false);

      var tween2 = game.add.tween(person);
      tween2.to({
              isoZ: -150
          },
          2000,
          Phaser.Easing.Linear.none, false);

     tween.start();
     tween2.start();

     tween2.onComplete.add(
         function(){
             game.Healed2 = true;

         });

       tween.chain(tween2);



  },

  this.doWalk = function(next) {

    if(game.Healed) return;

    var nextTilePosition = isoGroup.children[next]._isoPosition;
    this.walkingAudio();

    //switch control to a new human instead of working

    // if(isoGroup.children[mainPlayer.currentTile].willHealYou){
    //     game.state.start('FailScreen');
    //     return;
    // }


    if (isoGroup.children[next].hasAHuman && this.isMainPlayer) {

        isoGroup.children[this.currentTile].hasAHuman = false;

      for (var i = 0; i < people.length; i++) {
        if (people[i].currentTile == next) {
          var infected = people[i].infect(person);
          if(infected){
              this.die(person);
          }
          return;
        }
      }

    }else{


        isoGroup.children[this.currentTile].hasAHuman = false;
        isoGroup.children[next].hasAHuman = true;
        this.currentTile = next;
        var tween = game.add.tween(person);
        tween.to({
                isoZ: 0,
                isoX: (nextTilePosition.x),
                isoY: (nextTilePosition.y)
            },
            200,
            Phaser.Easing.Linear.none, false).to({
                isoZ: 0
            },
            200, Phaser.Easing.Linear.none, false);

        if (this.oldTween != undefined && this.oldTween.isRunning) {
            this.oldTween.chain(tween);
        }
        this.oldTween = tween;
        tween.start();
    }
  },

  this.goRight = function() {
    if (this.currentTile < 132) {
      person.animations.play('right');

      var next = this.currentTile + 12;
      if (this.checkCanWalk(next)) {
        this.doWalk(next);
        this.direction = 'r';
        return true;
      }
    }
    return false;
  },

  this.goLeft = function() {
    if (this.currentTile > 11) {
      person.animations.play('left');
      var next = this.currentTile - 12;
      if (this.checkCanWalk(next)) {
        this.doWalk(next);
        this.direction = 'l';
        return true;
      }
    }
    return false;
  },

  this.checkCanWalk = function(next){

      //return isoGroup.children[next].isWalkable;// && !isoGroup.children[next].hasAHuman;
      if(this.isMainPlayer){
        if (isoGroup.children[next].isWalkable){
          return true;
        }
        return false;
      }
      if (!isoGroup.children[next].hasAHuman && isoGroup.children[next].isWalkable){
        return true;
      }
      return false;

  },

  this.goUp = function() {
    if (this.currentTile % 12 != 0) {
      person.animations.play('up');
      var next = this.currentTile - 1;
      if (this.checkCanWalk(next)) {
        this.doWalk(next);
        this.direction = 'u';
        return true;
      }
    }
    return false;
  },

  this.goDown = function() {
    if (this.currentTile % 12 != 11) {
      person.animations.play('down');
      var next = this.currentTile + 1;
      if (this.checkCanWalk(next)) {
        this.doWalk(next);
        this.direction = 'd';
        return true;
      }
    }
    return false;
  },

  this.movePlayer = function(direction) {
    switch (direction) {
      case 'u':
        return this.goUp();
      case 'd':
        return this.goDown();
      case 'l':
        return this.goLeft();
      case 'r':
        return this.goRight();
    }

  }

  this.pathfind = function(){
    if (this.isMainPlayer) return;

    switch(this.patrol){
      case 'line':
          if (!this.movePlayer(this.direction)) {
            this.movePlayer(this.getOppositeDirection(this.direction));
          }
          break;
      case 'none':
      default:
          break;
    }
  }

  this.getOppositeDirection = function(){
    switch(this.direction){
      case 'u':
        return 'd';
      case 'd':
        return 'u';
      case 'l':
        return 'r';
      case 'r':
        return 'l';
    }
  }
}
