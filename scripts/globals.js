const WIDTH = 256;
const HEIGHT = 144;


// UI

class Button extends Phaser.GameObjects.Container
{
   constructor(scene, x, y, upTex, overTex, downTex, func)
   {
      super(scene, x, y);

      this.upImage = scene.add.image(0, 0, upTex);
      this.overImage = scene.add.image(0, 0, overTex);
      this.downImage = scene.add.image(0, 0, downTex);

      this.add(this.upImage);
      this.add(this.overImage);
      this.add(this.downImage);

      this.overImage.setVisible(false);
      this.downImage.setVisible(false);
      this.upImage.setVisible(true);

      this.setSize(this.upImage.width, this.upImage.height);

      this.setInteractive()
         .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, func)
         .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () =>
         {
            this.overImage.setVisible(true);
            this.downImage.setVisible(false);
            this.upImage.setVisible(false);
         })
         .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
         {
            this.overImage.setVisible(false);
            this.downImage.setVisible(true);
            this.upImage.setVisible(false);
         })
         .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () =>
         {
            this.overImage.setVisible(false);
            this.downImage.setVisible(false);
            this.upImage.setVisible(true);
         });
       
   }

   
}