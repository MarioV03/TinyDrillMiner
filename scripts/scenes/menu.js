class Menu extends Phaser.Scene
{
   constructor()
   {
      super('Menu');
   }

   preload()
   {
      this.load.image('bg', 'assets/background.png');
      this.load.image('crystal', 'assets/crystal.png');

      this.load.image('logo', 'assets/logo.png');
      this.load.image('logo_over', 'assets/logo_over.png');
      
      this.load.image('play_up', 'assets/play_btn_up.png');
      this.load.image('play_over', 'assets/play_btn_over.png');
      this.load.image('play_down', 'assets/play_btn_down.png');
   }

   create()
   {
      this.add.image(WIDTH / 2, HEIGHT / 2, 'bg');
      //this.add.image(0, 0, 'play_p');

      const play = new Button(this, WIDTH / 2, 90, 'play_up', 'play_over', 'play_down', () => 
      {
         this.scene.start('Endless')
      });
      this.add.existing(play);

      const logo = new Button(this, WIDTH / 2, 50, 'logo', 'logo_over', 'logo', () => {});
      this.add.existing(logo);

      this.cursors = this.input.keyboard.createCursorKeys();
   }

   update()
   {
   }
}

function mess() {
   console.log('message');
}