let OreGenerator = {
   baseTile: function (x, y, c) {
      return true;
   },

   perlin: function (x, y, config) {
      /* config = { 
            scaleX: num, 
            scaleY: num, 
            offX: num, 
            offY: num, 
            threshold: float[0;1] 
         } */
      return perlin(x / config.scaleX + config.offX, y / config.scaleY + config.offY) > config.threshold;
   },

   lines(x, y) {
      let line = (x < -16 + perlin(0.7, y)*24 + perlin(1.6*y, 0.6*y)*128) && (x > perlin(1.6*y, 0.6*y)*128 - 32) && perlin(0.3, y + 3) > 0.86;
      return line; 
      return perlin(Math.floor(x /8), Math.floor(y / 8)*5 + 0.7) > 0.7;
      return (Math.floor(x / 16) % 2 == 0 && Math.floor(y / 8) % 2 != 0)
   },

   chunks_v1(x, y) {
      let tr = 1 + Math.floor(3*perlin(x*0.1, 1.6));
      let i = -1 -Math.floor(3*perlin(x*0.1, 4.1));

      while(i <= tr) {
         if(OreGenerator.lines(x, y + i)) return true
         i++;
      }
      return false 
   }
}


// --- Major structures ---

class TileData {
   constructor(name, hardness, oreGenFunction, oreGenConfig) {
      this.name = name; // must be the same as the name of the texture
      this.hardness = hardness;
      this.genFunction = oreGenFunction;
      this.genConfig = oreGenConfig;
   }

   generate(x, y) {
      return this.genFunction(x, y, this.genConfig);
   }
}

class Layer {
   constructor(name, thickness, genConfig) {
      this.name = name;
      this.thickness = thickness;
      this.baseOre = genConfig.baseOre;
      this.ores = genConfig.ores;
      this.obstacles = genConfig.obstacles;
   }

   getOre(x, y) {
      let result = false;
      for (const ore in this.ores) {
         if (this.ores[ore].generate(x, y))
            result = this.ores[ore];
      }
      if (result == false) return this.baseOre.name;
      return result.name;
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

   getLayer(x, y) {
      let i = 0;
      while (true) {
         if (!this.layers[i]) return -1;
         if (y < this.layers[i].thickness) {
            if(this.layers[i].thickness - y == 1 && this.layers[i+1]) return i + Math.floor(1.9*perlin(x/23, y));
            if(this.layers[i].thickness - y == 2 && this.layers[i+1]) return i + Math.floor(1.4 *perlin(x/23, y + 1));
            return i;
         }
         y -= this.layers[i].thickness;
         i++;
      }
   }

   getOre(x, y) {
      let layer = this.getLayer(x, y);
      if (layer == -1) return console.log("Generator out of bounds");
      return this.layers[layer].getOre(x, y);
   }

   getObsacle(x, y) {
      let layer = this.getLayer(x, y);
      this.layers[layer].getObsacle(x, y);
   }
}




// --- Cofigurations ---

const Ores = {
   dirt: new TileData('dirt', 1, null, null),
   stone: new TileData('stone', 1, null, null),
   iron: new TileData('iron', 5, OreGenerator.perlin, { scaleX: 13, scaleY: 13, offX: 0, offY: 0, threshold: 0.9 }),
   coal: new TileData('coal', 5, OreGenerator.perlin, { scaleX: 11, scaleY: 11, offX: 2, offY: 4, threshold: 0.8 }),
   gold: new TileData('gold', 3, OreGenerator.perlin, { scaleX: 5, scaleY: 5, offX: 1, offY: 1, threshold: 0.9 }),
   sand: new TileData('sand', 5, OreGenerator.chunks_v1, {})
}

const LayerConfigs = {
   dirtLayer: {
      baseOre: Ores.dirt,
      ores: [Ores.coal, Ores.iron],
      obstacles: []
   },
   sandLayer: {
      baseOre: Ores.stone,
      ores: [Ores.sand],
      obstacles: []
   }
}




// LAYERS
let dirtLayer = new Layer('Dirt layer', 36, LayerConfigs.dirtLayer);
let sandFiealds = new Layer('Sands', 28, LayerConfigs.sandLayer);