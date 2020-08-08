class MapView extends Phaser.Scene {
   constructor() {
      super('MapView');
   }

   create() {
      this.add.tileSprite(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, 'dirt_b');
      this.terrain = new Terrain(134, [sandFiealds]);
      this.add.text(2, 0, 'Map View: ' + this.terrain.layers[0].name, 'black 12pt Lato');
      this.index = 0;
      this.x = 0;
      this.y = 0;
   }
   update() {
      do {
         if (this.index > this.terrain.width * this.terrain.height) return;
         this.x = xofi(this.index, this.terrain.width);
         this.y = yofi(this.index, this.terrain.width);

         this.add.image(
            1 + this.x * 2,
            17 + this.y * 2,
            this.terrain.getOre(this.x, this.y))
            .setScale(0.25, 0.25)

         this.index++;
      } while(this.index % 32 != 0)
   }
}

function xofi(i, w) { return i % w }
function yofi(i, w) { return Math.floor(i / w) }