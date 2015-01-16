var loadState = {

	preload: function () {		
		// Add a loading label 
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		// Add a progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		// Load all assets
		game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
        game.load.image('wabbit', 'assets/wabbit.png');
        game.load.image('burger', 'assets/burger.png');

        game.load.image('tileset', 'assets/tileset.png');
        game.load.tilemap('lvl1', 'lvl/lvl1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('lvl2', 'lvl/lvl2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('lvl3', 'lvl/lvl3.json', null, Phaser.Tilemap.TILED_JSON);

	},

	create: function() { 
		game.state.start('menu');
	}
};