/*
Cassian Jones
Rocket Patrol Reanimated VII: Eclectic Hullabaloo
Insert Time Here
Mods Included:
New Enemy Spaceship (5 Points)
Alternate Timing/Scoring Mechanism (5 Points)
Mouse Control For Movement and Fire (5 Points)
New Explosion Effect (5 Points)
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height:480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

let keyFIRE, keyRESET, keyLEFT, keyRIGHT

let borderUISize = game.config.height /15
let borderPadding = borderUISize / 3
