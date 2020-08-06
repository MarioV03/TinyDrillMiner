class Endless extends Phaser.Scene {
   constructor() {
      super('Endless');
   }

   preload() {
      this.load.image('bg', 'assets/background.png');
      this.load.image('dirt_b', 'assets/dirt_back.png');
      this.load.spritesheet('drill', 'assets/drill.png', { frameWidth: 16, frameHeight: 16 });
   }
   create() {

      // Generator and tile buffer
      this.terrain = new Generator(1234);
      this.tileBuffer = [];

      this.shiftTileBuffer = function () {
         this.tileBuffer.shift().forEach(element => {
            element.setActive(false);
         });

         let newrow = [];
         for (let i = 0; i < 128; i++) {
            let y = this.tileBuffer[17][0].y + 8;
            newrow.push(this.add.image(i*8+4, y, this.terrain.getBlock(i, (y-4)/8)));

         }
         this.tileBuffer.push(newrow);
      };

      this.bg = this.add.tileSprite(0, 0, this.terrain.width * 8, this.terrain.height * 8, 'dirt_b');

      for (let y = 0; y < 19; y++) {
         this.tileBuffer.push([]);
         for (let x = 0; x < 128; x++) {
            this.tileBuffer[y].push(this.add.image(x * 8 + 4, y * 8 + 4, this.terrain.getBlock(x, y)));
         }
      }

      this.bg.setOrigin(0, 0);

      //adding drill
      this.drill = this.add.sprite(this.terrain.width * 4, 8, 'drill');
      this.drill.depth = 1;
      this.anims.create
         ({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('drill', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
         });

      this.drill.isMoving = false;
      this.drill.checkCell = function (xoff, yoff, tiles) {
         let row, block;
         row = tiles[(this.y - tiles[0][0].y + 4) / 8 + yoff];
         block = row[this.x / 8 + xoff];
         if (block.visible)
            return block;
      };
      this.drill.collect = function (item) { };
      this.drill.anims.play('idle');


      // Input
      this.keyboard = this.input.keyboard.addKeys('A, S, D');

      // Camera
      this.cameras.main.startFollow(this.drill);
      this.cameras.main.setBounds(0, 0, this.terrain.width * 8, this.terrain.height * 8);

      // Flags
      {
         this.shiftTileBufferFlag = false;
      }
   }
   update() {
      // DRILL MOVEMENT
      {
         // Moving down
         if (!this.drill.isMoving && this.keyboard.S.isDown === true && this.drill.y < this.terrain.height * 8 - 8) {
            this.drill.isMoving = 'down';
            this.drill.angle = 0;
            this.drill.y++;
            if(this.drill.y > HEIGHT/2) this.shiftTileBufferFlag = true;
         }
         if (this.drill.isMoving == 'down') this.drill.y++;

         // Moving left
         if (!this.drill.isMoving && this.keyboard.A.isDown === true && this.drill.x > 8) {
            this.drill.isMoving = 'left';
            this.drill.angle = 90;
            this.drill.x--;
         }
         if (this.drill.isMoving == 'left') this.drill.x--;

         // Moving right
         if (!this.drill.isMoving && this.keyboard.D.isDown === true && this.drill.x < this.terrain.width * 8 - 8) {
            this.drill.isMoving = 'right';
            this.drill.angle = 270;
            this.drill.x++;
         }
         if (this.drill.isMoving == 'right') this.drill.x++;
      }

      // Generating next row of tiles
      if (this.shiftTileBufferFlag) {
         this.shiftTileBufferFlag = false;
         this.shiftTileBuffer();
      }

      console.log();

      // Tile mining
      if (this.drill.x % 8 == 0 && this.drill.y % 8 == 0) this.drill.isMoving = false;
      // se
      if (!this.drill.isMoving && this.drill.checkCell(0, 0, this.tileBuffer)) {
         let block = this.drill.checkCell(0, 0, this.tileBuffer);
         this.drill.collect(block);
         block.setActive(false);
         block.setVisible(false);
      }
      // sw
      if (!this.drill.isMoving && this.drill.checkCell(-1, 0, this.tileBuffer)) {
         let block = this.drill.checkCell(-1, 0, this.tileBuffer);
         this.drill.collect(block);
         block.setActive(false);
         block.setVisible(false);
      }
      // nw
      if (!this.drill.isMoving && this.drill.checkCell(-1, -1, this.tileBuffer)) {
         let block = this.drill.checkCell(-1, -1, this.tileBuffer);
         this.drill.collect(block);
         block.setActive(false);
         block.setVisible(false);
      }
      // ne
      if (!this.drill.isMoving && this.drill.checkCell(0, -1, this.tileBuffer)) {
         let block = this.drill.checkCell(0, -1, this.tileBuffer);
         this.drill.collect(block);
         block.setActive(false);
         block.setVisible(false);
      }
   }
}