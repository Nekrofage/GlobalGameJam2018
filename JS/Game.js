var cursorPos, cursor;

var cursors, wasd;


var Game = function (game) { };

Game.Boot = function (game) { };

Game.Boot.prototype =
{
  preload: function () {
    game.time.advancedTiming = true;
    game.debug.renderShadow = false;
    game.stage.disableVisibilityChange = true;
    game.plugins.add(new Phaser.Plugin.Isometric(game));
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    game.bgImg = game.add.sprite(0, 0, 'backgroundimg');
    game.bgImg.tint = 0xfdfd96;
    //game.stage.backgroundColor = "#fdfd96";
    game.iso.anchor.setTo(0.5, 0.02);
  },
  create: function () {
    this.grid = new Grid(game);




   // game.physics.isoArcade.gravity.setTo(0, 0, -500);
    cursorPos = new Phaser.Plugin.Isometric.Point3();

    this.putPeopleIn(game);





  },
  update: function () {
      this.person.update();


      //
    //
    // // Update the cursor position.
    // // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
    // // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
    // game.iso.unproject(game.input.activePointer.position, cursorPos);
    //
    // this.grid.update();
  },
  render: function () {
    game.debug.text(game.time.fps || '--', 2, 14, "#bbbbbb");
  },


    putPeopleIn: function (game) {
        //Add Keyboard controls

        cursors = game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

        wasd = {
            w: game.input.keyboard.addKey(Phaser.Keyboard.W),
            s: game.input.keyboard.addKey(Phaser.Keyboard.S),
            a: game.input.keyboard.addKey(Phaser.Keyboard.A),
            d: game.input.keyboard.addKey(Phaser.Keyboard.D),
            space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };

        //put people in
        this.person = new Person(game, 128, 128, 'doctor');
    }
};
