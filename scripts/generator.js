function perlin(x, y) {
   return noise.perlin2(x, y) + 0.5;
}


let OreGenerator = {
   baseTile: function (x, y, c) {
      return true;
   },
   perlin: function (x, y, perlinConfig) {
      return perlin(x / perlinConfig.scaleX + perlinConfig.offX, y / perlinConfig.scaleY + perlinConfig.offY) > perlinConfig.threshold;
   }
}

function pp(x, y, perlinConfig) {
   return perlin(x / perlinConfig.scaleX + perlinConfig.offX, y / perlinConfig.scaleY + perlinConfig.offY) > perlinConfig.threshold;
}


let conf = {
   scaleX: 13,
   scaleY: 13,
   offX: 0,
   offY: 0,
   threshold: 0.9
}


const perlinGeneration = {
   perlin: {
      scaleX: 13,
      scaleY: 13,
      offX: 0,
      offY: 0,
      threshold: 0.9
   },

   create: function () {
      return Object.create(perlinGeneration);
   },

   offset: function (off) {
      this.perlin.offX = off;
      this.perlin.offY = off;
      return this;
   },

   scale: function (s) {
      this.perlin.scaleX = s;
      this.perlin.scaleY = s;
      return this;
   }
}

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

let td = new TileData('test', 8, perlinGeneration.create().offset(5.5));


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
const Ores = {
   dirt: new TileData('dirt', 1, null, null),
   iron: new TileData('iron', 5, OreGenerator.perlin, {scaleX: 13, scaleY: 13, offX: 0, offY: 0, threshold: 0.9}),
   coal: new TileData('coal', 5, OreGenerator.perlin, {scaleX: 11, scaleY: 11, offX: 2, offY: 4, threshold: 0.8}),
   gold: new TileData('gold', 3, OreGenerator.perlin, {scaleX: 5, scaleY: 5, offX: 1, offY: 1, threshold: 0.9}),
   sand: new TileData('sand', 5, OreGenerator.perlin, {scaleX: 11, scaleY: 11, offX: 0, offY: 0, threshold: 0.3})
}

console.log(Ores['dirt']);

Object.freeze(Ores);

// terrainConfigs
let dirtConfig = {
   baseOre: Ores.dirt,
   ores: [Ores.coal, Ores.iron],
   obstacles: []
}

// LAYERS
let dirtLayer = new Layer('Dirt layer', 64, dirtConfig);
let sandFiealds = new Layer('The underground desert', 64, {
   baseOre: Ores.dirt,
   ores: [Ores.sand],
   obstacles: []
});