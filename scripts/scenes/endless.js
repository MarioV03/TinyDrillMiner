function cellX(i)
{
   return
}

function cellY(i)
{
   return i*8 + 4;
}


class Endless extends Phaser.Scene
{
   constructor()
   {
      super('Endless');
   }

   preload()
   {
      this.load.image('bg', 'assets/background.png');
      this.load.spritesheet('drill', 'assets/drill.png', {frameWidth: 16, frameHeight: 16});
   }
   create()
   {
      this.add.image(WIDTH/2, HEIGHT/2, 'bg');


      //adding drill
      this.drill = this.add.sprite(WIDTH/2, cellY(0.5), 'drill');
      this.anims.create
      ({
         key: 'idle',
         frames: this.anims.generateFrameNumbers('drill', {start: 0, end: 3}),
         frameRate: 6,
         repeat: -1
      });

      this.drill.isMoving = false;
      this.drill.anims.play('idle');

      // Input
      this.keyboard = this.input.keyboard.addKeys('A, S, D');
   }
   update()
   {
      if(this.drill.x%8 == 0 && this.drill.y%8 == 0) this.drill.isMoving = false;

      // Moving down
      if(!this.drill.isMoving && this.keyboard.S.isDown === true) 
      {
         this.drill.isMoving = 'down';
         this.drill.angle = 0;
         this.drill.y++;
      }
      if(this.drill.isMoving == 'down') this.drill.y++;

      // Moving left
      if(!this.drill.isMoving && this.keyboard.A.isDown === true) 
      {
         this.drill.isMoving = 'left';
         this.drill.angle = 90;
         this.drill.x--;
      }
      if(this.drill.isMoving == 'left') this.drill.x--;

      // Moving right
      if(!this.drill.isMoving && this.keyboard.D.isDown === true) 
      {
         this.drill.isMoving = 'right';
         this.drill.angle = 270;
         this.drill.x++;
      }
      if(this.drill.isMoving == 'right') this.drill.x++; 

      console.log(this.drill.x, this.drill.y, this.drill.isMoving);
   }
}