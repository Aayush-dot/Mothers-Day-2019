# Mothers Day 2019

## v0.1.1
* Implemented bobber function.

## v0.1
* Adjusted the lighting.
* Fixed the texture (now loads).

## v0.0.5a
* Better switching mechanics.
* Added switch sound.

## v0.0.4a
* Cycling and on / off works better.

## v0.0.3a
* Got PointLights on letters working, and with glow as well!

## v0.0.2a
* Basic animated lighting enabled
* Still need to adjust PointLights on letters.
* Need to fix textures.

# Suggestions
* 3D on/off switch? (Replaced with text as of v0.1)
* <a href="https://stackoverflow.com/questions/50948014/emit-light-from-an-object">Bloom?</a> 
* Add more extruded objects to give more detail (don't try to join into 1 mesh).

# Mobile troubleshooting
1. Added cube to check loading: cube loads.
2. Checked console with console remap. No errors.
2. Old non-textured letters do not show either.
2. Turned off blinker functions. <b>Letters show!</b>
2. Disabled pointLights, as suggested in <a href="https://github.com/mrdoob/three.js/issues/9131">three.js issue #9131</a>. Letters show. 
    * "I added a hemisphere light in addition to pointlights and the textures started rendering."
2. Re-enabled blinker functions without pointLights. No problems.
2. Added hemisphere light. Works by itself, but when I re-enable the pointLights the text doesn't show.
2. Added just one pointLight directly to scene. Works!
2. Removed scene pointLight and allowed one sub pointLight to be added. Works!

## Discoveries
1. iOS Safari has a limit of 12 pointLights.