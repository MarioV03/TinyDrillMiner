class Generator
{
   constructor(_seed)
   {
      this.seed = _seed;
      noise.seed(_seed);
      this.width = 128;
      this.height = 128;
   }

   getBlock(x, y)
   {
      if(noise.perlin2(x/7, y/7) > 0.4)
      return 'iron';
      return 'dirt';
   }
}