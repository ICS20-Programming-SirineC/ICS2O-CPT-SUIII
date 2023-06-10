/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Sirine Cherkaoui
// Created on: 04/06/2023
// This is the game scene

// The code written below adds to the code already in Phaser.Scene
class GameScene extends Phaser.Scene {

    //create nets
    createNets() {
      const netsXLocation = Math.floor(Math.random() * 1920) +1 //this will get a number between 1 & 1920
      let netsXVelocity = Math.floor(Math.random() * 50) +1 //this will get a number between 1 & 50
      netsXVelocity *= Math.round(Math.random()) ? 1 : -1 //this will add a minus sign in 50% of cases
      const aNets = this.physics.add.sprite(netsXLocation, -100, 'nets')
      aNets.body.velocity.y = 200
      aNets.body.velocity.x = netsXVelocity
      this.netsGroup.add(aNets)
    }
  
    constructor() {
        super({ key: "gameScene" });
        this.background = null; // Reference to the background image
        this.ronaldoPlayer = null; // Reference to the player sprite
        this.soccerMissile = false; // Check if the missile can be fired
    }

    init(data) {
        this.cameras.main.setBackgroundColor("#ffffff"); // Set the background color of the scene
    }

    preload() {
        console.log("Game Scene");
        this.load.image('soccerBackground', './images/soccerBackground.jpg');
        this.load.image('ronaldoPlayer', './images/ronaldoPlayer.png');
        this.load.image('missile', './images/missile.png');
        this.load.image('nets', './images/nets.png')
        //sound
        this.load.audio('suiii', './sounds/suiii.mp3');
        this.load.audio('cheer', './sounds/cheer.wav');
      
    }

    create(data) {
        this.background = this.add.image(0, 0, 'soccerBackground').setScale(3.0);
        this.background.setOrigin(0, 0);

        this.ronaldoPlayer = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ronaldoPlayer');

        // create a group for the missiles
        this.missileGroup = this.physics.add.group();

        // create a group for the nets
        this.netsGroup = this.add.group();
        this.createNets()

        //Collision between ronaldoPlayer and nets
        this.physics.add.collider(this.missileGroup, this.netsGroup, function (missileCollide, netsCollide) {
          netsCollide.destroy()
          missileCollide.destroy()
          this.sound.play('cheer')
          this.createNets()
          this.createNets()
        }.bind(this))
      
        
    }

    update(time, delta) {
        // called 60 times a second

        const keyLeftObj = this.input.keyboard.addKey('LEFT');
        const keyRightObj = this.input.keyboard.addKey('RIGHT');
        const keyUpObj = this.input.keyboard.addKey('UP');
        const keyDownObj = this.input.keyboard.addKey('DOWN');
        const keySpaceObj = this.input.keyboard.addKey('SPACE');

        if (keyLeftObj.isDown === true) {
            this.ronaldoPlayer.x = this.ronaldoPlayer.x - 15;
        }

        if (keyRightObj.isDown === true) {
            this.ronaldoPlayer.x = this.ronaldoPlayer.x + 15;
        }

        if (keyUpObj.isDown === true) {
            this.ronaldoPlayer.y = this.ronaldoPlayer.y - 15;
        }

        if (keyDownObj.isDown === true) {
            this.ronaldoPlayer.y = this.ronaldoPlayer.y + 15;
        }

        // Check if the player sprite surpasses the screen borders horizontally
        if (this.ronaldoPlayer.x < 0) {
            this.ronaldoPlayer.x = 1920; // Set the player sprite position to the other side of the screen
        } else if (this.ronaldoPlayer.x > 1920) {
            this.ronaldoPlayer.x = 0; // Set the player sprite position to the other side of the screen
        }

        // Check if the player sprite surpasses the screen borders vertically
        if (this.ronaldoPlayer.y < 0) {
            this.ronaldoPlayer.y = 1080; // Set the player sprite position to the other side of the screen
        } else if (this.ronaldoPlayer.y > 1080) {
            this.ronaldoPlayer.y = 0; // Set the player sprite position to the other side of the screen
        }

        if (keySpaceObj.isDown === true) {
            if (this.soccerMissile === false) {
                //fire missile
                this.soccerMissile = true;
                const aNewMissile = this.physics.add.sprite(this.ronaldoPlayer.x + 40, this.ronaldoPlayer.y - 140, 'missile');
                this.missileGroup.add(aNewMissile);
                this.sound.play('suiii');
            }
        }

        if (keySpaceObj.isUp === true) {
            this.soccerMissile = false;
        }

        this.missileGroup.children.each(function (item) {
            item.y = item.y - 15;
            if (item.y < 0) {
                item.destroy();
            }
        });
    }
}

// Exporting the menu scene as default
export default GameScene;
