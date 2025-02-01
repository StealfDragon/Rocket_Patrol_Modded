/*
Cassian Jones
Rocket Patrol Reanimated VII: Eclectic Hullabaloo
Insert Time Here
Mods Included:
New Enemy Spaceship (5 Points) (30 minutes)
Parallax Scrolling For Background (3 Points) (15 minutes)
Display Time (3 Points) (3 hours)
Alternate Timing/Scoring Mechanism (5 Points) (2 hours)
New Explosion Effect (5 Points) (2 Hours)
Total Time: Actual time: Many days | Time not including procrastination: ~8
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
