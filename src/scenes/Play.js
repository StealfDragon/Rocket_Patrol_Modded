class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        //background sprite
        /*
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 
            'starfield').setOrigin(0, 0)
        */
        this.farground = this.add.tileSprite(0, 0, 640, 480, 
            'farspace').setOrigin(0, 0)

        this.foreground = this.add.tileSprite(0, 0, 640, 480, 
            'closespace').setOrigin(0, 0)

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, 
            game.config.width, borderUISize * 2, 
            0x00FF00).setOrigin(0,0)
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 
            0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, 
            game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, 
            borderUISize, game.config.height, 
            0xFFFFFF).setOrigin(0, 0)

        this.p1Rocket = new Rocket(this, game.config.width/2, 
            game.config.height - borderUISize - borderPadding, 
            'rocket').setOrigin(0.5, 0)

        //this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'X-Wing', 0, 60).setOrigin(0, 0)
        this.ship01.moveSpeed = game.settings.XWingSpeed

        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.p1Score = 0
        
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        //timer stuf
        this.gameOver = false

        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }

        scoreConfig.fixedWidth = 0
        /*
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 
                            'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, 
                            game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', 
                            scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)
        */

        this.callbackFunction = function() {
            //if (this.gameOver == true) {
                this.add.text(game.config.width/2, game.config.height/2, 
                    'GAME OVER', scoreConfig).setOrigin(0.5)
                this.add.text(game.config.width/2, 
                    game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', 
                    scoreConfig).setOrigin(0.5)
                this.gameOver = true
            //}
        }

        this.clock = this.time.addEvent({
            delay: game.settings.gameTimer,
            callback: this.callbackFunction,
            callbackScope: this,
        });

        this.showTime = this.add.text(borderUISize * 15 + 15, 
            borderUISize + borderPadding*2, this.clock.getRemainingSeconds(), timeConfig)

        this.changeClock = function(seconds) {
            //this.remainingTime += x
            let newRemaining = this.clock.getRemainingSeconds() + seconds;
    
            // Ensure the timer doesn't go negative
            if (newRemaining < 0) {
                newRemaining = 0;
                this.gameOver = true
            }
            
            // Reset the clock with the new time
            this.clock.remove(false);
            this.clock = this.time.addEvent({
                delay: newRemaining * 1000, // Convert seconds to milliseconds
                callback: this.callbackFunction,
                callbackScope: this
            });
        }
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        
        //more background stuf
        //this.starfield.tilePositionX -= 4
        this.farground.tilePositionX -= 2
        this.foreground.tilePositionX -= 4

        this.showTime.setText(this.clock.getRemainingSeconds())

        if(!this.gameOver) {
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
        }

        if(this.p1Rocket.y <= borderUISize * 3 + borderPadding) {
            this.p1Rocket.isFiring = false
            this.p1Rocket.y = game.config.height - borderUISize - borderPadding
            this.changeClock(-15)
        }

        this.showTime.setText(this.clock.getRemainingSeconds());

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)  
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } 
        else {
          return false
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let explode = this.add.particles(ship.x, ship.y, 'explosion_particle', {
            angle: { start: 0, end: 360, steps: 16 },
            lifespan: 1500,
            speed: { min: 100, max: 100 },
            scale: { start: 2, end: 2 },
            gravityY: 0,
            //blendMode: 'ADD',
            //emitting: false

        });

        explode.explode(16);
        explode.stop(false);
        explode.on('complete', () => {   // callback after anim completes
            ship.reset()     
            this.changeClock(5)                    // reset ship position
            ship.alpha = 1
                                   // make ship visible again
            //explode.destroy()                       // remove explosion sprite
          })

        /*
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })
          */
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score     
        this.sound.play('sfx-explosion')   
    }
}