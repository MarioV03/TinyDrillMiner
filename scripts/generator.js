function perlin(x, y)
{
   return noise.perlin2(x, y) + 0.5;
}

class TileData {
   constructor(name, hardness, generate) {
      this.name = name; // must be the same as the name of the texture
      this.hardness = hardness;
      this.generate = generate;
   }
}


class Layer {
   constructor(name, thickness, genConfig) {
      this.name = name;
      this.thickness = thickness
      this.baseOre = genConfig.baseOre;
      this.ores = genConfig.ores;
      this.obstacles = genConfig.obstacles;
   }

   getOre(x, y) {
      let result = false;
      for (const ore in this.ores) {
         if (this.ores[ore].generate(x, y))
         result = this.ores[ore].generate(x, y);
      }      
      if (!result) return this.baseOre.name;
      return result;
   }

   getObsacle(x, y) {
      let result = false;
      for (const obstacle in this.obstacles) {
         result = obstacle.generate(x, y);
      }
      return result;
   }
}


class Terrain {
   constructor(_seed, layers) {
      this.seed = _seed;
      noise.seed(_seed);
      this.width = 128;
      this.layers = layers;
      // console.log(this.layers);

      this.height = 0;
      for (let i = 0; i < layers.length; i++) {
         this.height += layers[i].thickness;
      }
   }

   getLayer(y) {
      let i = 0;
      while (true) {
         if (!this.layers[i]) return -1;
         if (y < this.layers[i].thickness) return i;
         y -= this.layers[i].thickness;
         i++;
      }
   }
   
   getOre(x, y) {
      let layer = this.getLayer(y);
      if (layer == -1) return console.log("Generator out of bounds");
      // console.log('global gen');
      return this.layers[layer].getOre(x, y);
   }

   getObsacle(x, y) {
      let layer = this.getLayer(y);
      this.layers[layer].getObsacle(x, y);
   }
}



// --- Cofigurations ---


let Ores = {
   dirt: new TileData('dirt', 1, function () {return}),
   iron: new TileData('iron', 5, function (x, y) { if (perlin(x/11, y/11) > 0.8) return 'iron';}),
   coal: new TileData('iron', 5, function (x, y) { if (perlin(x/13 + 5, y/13 + 5.5) > 0.8) return 'coal';})
}

// terrainConfigs
let dirtConfig = {
   baseOre: Ores.dirt,
   ores: [Ores.iron, Ores.coal],
   obstacles:[]
}

// LAYERS
let dirtLayer = new Layer('Dirt layer', 64, dirtConfig);