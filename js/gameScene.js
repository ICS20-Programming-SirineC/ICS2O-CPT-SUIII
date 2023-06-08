/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Sirine Cherkaoui
// Created on: 05/31/2023
// This is the game scene

// The code written below adds to the code already in Phaser.Scene
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameScene" });
    this.background = null;
    this.ronaldoPlayer = null;
    this.soccerMissile = false
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Game Scene");
    this.load.image('soccerBackground', './images/soccerBackground.jpg');
    this.load.image('ronaldoPlayer', './images/ronaldoPlayer.png');
    this.load.image('missile', './images/missile.png');
    //sound
    this.load.audio('suiii', './sounds/suiii.mp3')
  }

  create(data) {
    this.background = this.add.image(0, 0, 'soccerBackground').setScale(3.0);
    this.background.setOrigin(0, 0);

    this.ronaldoPlayer = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ronaldoPlayer');

    // create a group for the missiles

    this.missileGroup = this.physics.add.group ()
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
         this.soccerMissile = true
         const aNewMissile = this.physics.add.sprite(this.ronaldoPlayer.x, this.ronaldoPlayer.y, 'missile')
         this.missileGroup.add(aNewMissile)
         this.sound.play('suiii')
      }
    }

    if (keySpaceObj.isUp === true) {
      this.soccerMissile = false
    }

    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      if(item.y < 0) {
        item.destroy()
      }
    })
  } 
}

// Exporting the menu scene as default
export default GameScene;
