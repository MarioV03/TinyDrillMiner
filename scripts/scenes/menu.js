class Menu extends Phaser.Scene
{
   constructor()
   {
      super('Menu');
   }

   preload()
   {
      this.load.image('bg', 'assets/bg.png');
      this.load.image('dirt_b', 'assets/dirt_back.png');

      this.load.image('logo', 'assets/logo.png');
      this.load.image('logo_over', 'assets/logo_over.png');

      this.load.image('info', 'assets/info.png');
      this.load.image('info_over', 'assets/info_over.png');

      this.load.image('stats', 'assets/stats.png');
      this.load.image('stats_over', 'assets/stats_over.png');
      
      this.load.image('play_up', 'assets/play_btn_up.png');
      this.load.image('play_over', 'assets/play_btn_over.png');

      this.load.image('back_up', 'assets/back_up.png');
      this.load.image('back_over', 'assets/back_over.png');
      
      // Ore textures
      this.load.image('dirt', 'assets/dirt.png');
      this.load.image('sand', 'assets/sand.png');
      this.load.image('stone', 'assets/stone.png');
      this.load.image('coal', 'assets/coal.png');
      this.load.image('copper', 'assets/copper.png');
      this.load.image('iron', 'assets/iron.png');
      this.load.image('gold', 'assets/gold.png');
      this.load.image('diamonds', 'assets/diamonds.png');
   }

   create()
   {
      this.add.image(WIDTH / 2, HEIGHT / 2, 'bg');
      //this.add.image(0, 0, 'play_p');

      const play = new Button(this, WIDTH / 2, 75, 'play_up', 'play_over', 'play_down', () => 
      {
         this.scene.start('Endless')
      });
      this.add.existing(play);

      const info = new Button(this, WIDTH / 2 - 13, 101, 'info', 'info_over', 'info', () => 
      {
         this.scene.start('MapView')
      });
      this.add.existing(info);

      const stats = new Button(this, WIDTH / 2 + 13, 101, 'stats', 'stats_over', 'stats', () => 
      {
         this.scene.start('Endless')
      });
      this.add.existing(stats);

      const logo = new Button(this, WIDTH / 2, 47, 'logo', 'logo_over', 'logo', () => {});
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