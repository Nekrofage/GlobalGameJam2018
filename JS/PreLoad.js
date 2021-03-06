var PreLoad = {
    preload: function () {

        var style = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        var loadingText = game.add.text(0, 0, "Loading", style);
        loadingText.setTextBounds(0, 385, 1024, 100);

        var barX = (this.game.width - 600) / 2;
        var barY = this.game.height - 200;
        this.add.sprite(barX, barY, 'preloaderBarGray');
        this.preloadBar = this.add.sprite(barX, barY, 'preloaderBar');

        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);

        game.load.script('filter-vignette', './JS/Vignette.js');
        game.load.script('filter-filmgrain', './JS/FilmGrain.js');

        /** GAME ASSETS **/
        // Large BG images
        game.load.image('backgroundimg', 'Images/backgroundimg.png');
        game.load.image('menubackgroundimg', 'Images/blur-hospital.jpg');
        game.load.image('logo', 'Images/hospitalbedlam.png');

        // Tile Images
        game.load.image('g', 'Images/tiles/grass.png');
        game.load.image('e', 'Images/tiles/empty.png');
        game.load.image('p', 'Images/tiles/tile_purple.png');
        game.load.image('c', 'Images/tiles/tile_white.png');
        game.load.image('a', 'Images/greencurtain.png');
        game.load.image('drawersSE', 'Images/tiles/bodyBag.png');
        game.load.image('b', 'Images/tiles/bed_SE.png');
        game.load.image('d', 'Images/tiles/bedcurtain_SE.png');
        // - walls
        game.load.image('tilepurpledoorNWwallLHS', 'Images/tiles/tile_purpledoorSEwallLHS.png');
        game.load.image('tilepurpledoorNWwallRHS', 'Images/tiles/tile_purpledoorSEwallRHS.png');
        game.load.image("tilepurpledoorNW", 'Images/tiles/tile_purpledoorSE.png');
        game.load.image("tilepurpleemergencydoorSW", 'Images/tiles/tile_purpleemergencydoorSW.png');
        game.load.image('wallSW', 'Images/tiles/wallSW.png');

        // Misc Images
        game.load.image('grave', 'Images/tiles/grave.png');
        game.load.image('imgHomeButton2', 'Images/home2.png');
        game.load.image('imgRestartButton2', 'Images/restart2.png');

        // Buttons Sprite sheets
        game.load.spritesheet('imgLevel6Button', 'Images/level6.png', 130, 122, 2);
        game.load.spritesheet('imgLevel1Button', 'Images/level1.png', 130, 122, 2);
        game.load.spritesheet('imgLevel2Button', 'Images/level2.png', 130, 122, 2);
        game.load.spritesheet('imgLevel3Button', 'Images/level3.png', 130, 122, 2);
        game.load.spritesheet('imgLevel4Button', 'Images/level4.png', 130, 122, 2);
        game.load.spritesheet('imgLevel5Button', 'Images/level5.png', 130, 122, 2);
        game.load.spritesheet('nextLevelBtn', 'Images/nextlevel.png', 130, 121.581, 2);
        game.load.spritesheet('imgHomeButton', 'Images/Home.png', 130.5, 122.171, 2);
        game.load.spritesheet('imgRestartButton', 'Images/restart.png', 130, 121.581, 2);

        // Character Sprite sheets
        game.load.spritesheet('doctor', 'Images/characters/Sheets/doctor_sheet.png', 64, 135, 4);
        game.load.spritesheet('germ', 'Images/characters/Sheets/germ_sheet.png', 64, 135, 4);
        game.load.spritesheet('patient1', 'Images/characters/Sheets/patient_blonde_sheet.png', 64, 135, 4);
        game.load.spritesheet('patient2', 'Images/characters/Sheets/patient_brown_sheet.png', 64, 135, 4);

        // Audio
        game.load.audio('menuScreenMusic', 'audio/intro.mp3');
        game.load.audio('step1', ['audio/Step1.mp3', 'audio/Step1.ogg']);
        game.load.audio('step2', ['audio/Step2.mp3', 'audio/Step2.ogg']);
        game.load.audio('infect', 'audio/Infect.mp3')

        // Add Game Controls
        game.cursors = game.input.keyboard.createCursorKeys();
        game.wasd = {
            w: game.input.keyboard.addKey(Phaser.Keyboard.W),
            s: game.input.keyboard.addKey(Phaser.Keyboard.S),
            a: game.input.keyboard.addKey(Phaser.Keyboard.A),
            d: game.input.keyboard.addKey(Phaser.Keyboard.D),
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };
    },

    create: function () {
        // Add audio objects (must be done in create - Phaser cannot handle this in preload).
        game.audioAssets = {
            step1: game.add.audio('step1'),
            step2: game.add.audio('step2'),
            infect: game.add.audio('infect')
        }

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
        this.state.start('StartScreen');
    },
};
