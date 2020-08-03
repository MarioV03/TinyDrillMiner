class Endless extends Phaser.Scene
{
   constructor()
   {
      super('Endless');
   }

   preload()
   {
      this.load.spritesheet('drill', 'assets/drill.png', {frameHeight: 16, frameWidth: 16});
   }
   create()
   {
      this.drill = this.physics.add.sprite(WIDTH/2, HEIGHT/2, 'drill');
      this.drill.setCollideWorldBounds(true);

      this.anims.create
      ({
         key: 'idle',
         frames: this.anims.generateFrameNumbers('drill', {start: 0, end: 3}),
         frameRate: 10,
         repeat: -1
      })
   }
   update()
   {
      this.drill.anims.play('idle');
   }
}