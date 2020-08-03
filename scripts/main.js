const config =
{
    width: WIDTH,
    height: HEIGHT,
    parent: 'game',
    backgroundColor: '#cc4',

    pixelArt: true,
    scale: {zoom: 5},
    type: Phaser.AUTO,

    physics:
    {
        default: 'arcade',
        arcade:
        {
            gravity: {y: 0},
            debug: true
        }
    },

    scene: [Menu, Endless]
};

new Phaser.Game(config);