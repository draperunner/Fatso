
var playState = {

    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Keyboard
        this.cursor = game.input.keyboard.createCursorKeys();
        this.r = game.input.keyboard.addKey(Phaser.Keyboard.R);

        // Level
        this.createWorld();

        // Wabbit

        var result = this.findObjectsByGID(4, this.map, 'Object Layer 1');
        this.wabbit = game.add.sprite(result[0].x, result[0].y, 'wabbit');
        this.wabbit.anchor.setTo(0.5, 1);
        game.physics.arcade.enable(this.wabbit);
        this.wabbit.body.gravity.y = 500;
        this.wabbit.body.collideWorldBounds = true;

        // Create burgers
        this.burgers = game.add.group();
        this.burgers.enableBody = true;
        this.map.createFromObjects('Object Layer 1', 3, 'burger', 0, true, false, this.burgers);
        numberOfBurgers = this.burgers.length;
    },

    update: function() {
        game.physics.arcade.collide(this.wabbit, this.layer);
        game.physics.arcade.collide(this.wabbit, this.burgers, this.eatBurger);
        this.movePlayer();
        this.reset();
    },

    movePlayer: function() {
        if (this.cursor.left.isDown) {
            this.wabbit.body.velocity.x = -200;
        }
        else if (this.cursor.right.isDown) {
            this.wabbit.body.velocity.x = 200;
        }
        else {
            this.wabbit.body.velocity.x = 0;
        }
        if (this.cursor.up.isDown && this.wabbit.body.onFloor()) {
            this.wabbit.body.velocity.y = -320;
        }
    },

    reset: function () {
        if (this.r.isDown) {
            game.state.start('play');
        }
    },

    eatBurger: function(wabbit, burger) {
        burger.kill();
        wabbit.body.gravity.y += 150;
        numberOfBurgers -= 1 ;
        if (numberOfBurgers <= 0) {
            game.state.start('menu');
        }
    },

    createWorld: function() {
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        this.map.setCollision([1, 2]);
    },
    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByGID: function(gid, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element){
            if(element.gid === gid) {
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    }
};