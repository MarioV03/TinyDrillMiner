let config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('BG', 'assets/background.png');
    this.load.spritesheet('drill', 'assets/drill.png', { frameWidth: 16, frameHeight: 16 });
}

function create ()
{
    this.add.image(WIDTH/2, HEIGHT/2, 'BG');
    player = this.add.sprite(100, 450, 'drill');
    player.anims.add('idle');
    player.anims.play('idle, 50, true')
}

function update ()
{
}