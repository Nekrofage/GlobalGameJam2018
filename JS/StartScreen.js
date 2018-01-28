

var StartScreen = {
    preload : function() {},

    create: function () {

      var totalLevels = 2;
    for (var level = 1; level < (totalLevels+1); level++)
    {
       var xWidthOffset = level * (game.world.width / (totalLevels +2));
       var buttonName = 'imgLevel' + level + 'Button';
       game.add.button(xWidthOffset, 200, buttonName, function(){return this.startGame(level);}, this, 1, 1);
     };

        // this.buttonStartLevel1 = game.add.button(game.world.centerX - 200, 200, 'imgLevel1Button', function(){ return this.startGame(1);}, this, 1,0);
        // this.buttonStartLevel2 = game.add.button(game.world.centerX - 50, 200, 'imgLevel2Button', function(){ return this.startGame(2);}, this, 1,0);

        //this.music = game.add.audio('menuScreenMusic');
        //this.music.play();
        //game.input.onDown.add(changeVolume, this);
    },

    startGame: function (level) {
        game.levelSelected = level;
        this.state.start('Game');
    },
};
