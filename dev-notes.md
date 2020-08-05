# Notes on developing Tiny Drill Miner 
### A remake of Icekkile's Little Drill Miner

[Icekkile's Little Drill Miner](https://github.com/Icekkile/LittleDrillMiner) - in progress, made /w Unity game engine


## Dev process diary

**Day 1:**
Time | Notes
-----|------
10:00 | Reasearch on HTML game engines (never used one before xD)
12:00 | Planning the architechture and the logic of the game
21:20 | Finnaly getting to code. New progeject, python-httm up and running
21:45 | creating dev-notes lol, now back to work
21:55 | Reading tutorial, fixing stupid js error cuz cannot even load scripts properly cuz I'm dumb
22:30 | copypaste a script from phaser page, everything works fine. CSS work
23:00 | CSS done, break
23:37 | back to phaser tutorial. Also creating some placeholder pixel art
01:27 | got some assets loaded, everything is behaving weird. Sleep now

*Summary: phaser is weird, cannot do it without studying properly. But that's a job for another day*
*Planning: 3-4 hours. Hacking 'round: most of the time. Actual game work: 0 seconds*

**Day 2:**
Time | Notes
-----|------
15:00 | Learning the engine. Docs are confusing while tutorial doesn't have the suff I need
17:20 | Nooooooo, I've lost my notes! (Had reset to previous commit). Anyway, I'm trying to figure out spritesheets. I really do not understand why on earth they don't work properly 3:
18:24 | Spritesheets didn't work cuz I spelled 'Height' as 'Hight'. I'm helpless...
22:40 | Finally, things are coming together. Now implementing UI system /w containers
23:33 | Buttons capable of calling given function - DONE

*Summary: spent all the time studying basics of the engine, things finally make sence*

**Day 3:**
Time | Notes
-----|------
19:00 | Learning how to create animations
19:40 | Break
21:00 | Ok, back to coding. Trying tp create drill gameobject
21:23 | Redoing drill sprite
21:40 | Drill animation done
23:12 | Drill movement done (yeah, I'm slow)
00:17 | Tiling and camera scrolling done
01:27 | Nah, I don't need pysics engine there... tilig and camera on the whole scene added, generation abstacted away

*That was quite productive*

**Day 4:**
Time | Notes
-----|------
22:00 | Late start today. Working on placing and destroying tiles
23:24 | Placing tiles in chunks and deactivating passed chunks - done
00:06 | For some reason I get a lot of undefined errors whin trying to check the cells the drill stands on. Debugging is horrible. I miss stati typing :((
01:26 | Core mechanics implemented (creating terrain, moving, mining)
02:08 | And finally some basic perlin noise ore generation - onto the fun part!

*Generation, yeah!!! Frankly, the code I wrote for the core game mechanics is terrible and mostly does not use the engine in a proper way. It'll need quite a bit of refactoring, which I'll do when I know the API better. But right now I want to do GENERATION!!!*