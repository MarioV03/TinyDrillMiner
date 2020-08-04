class Generator
{
   constructor(seed)
   {
      this.seed = seed;
      this.width = 128;
      this.height = 300;
   }

   getBlock(x, y)
   {
      return 'dirt';
   }
}