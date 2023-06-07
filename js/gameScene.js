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
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Game Scene");
    this.load.image('soccerBackground', './images/soccerBackground.jpg');
    this.load.image('ronaldoPlayer', './images/ronaldoPlayer.png');
  }

  create(data) {
    this.background = this.add.image(0, 0, 'soccerBackground').setScale(3.0);
    this.background.setOrigin(0, 0);

    this.ronaldoPlayer = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ronaldoPlayer')
  }

  update(time, delta) {
    //called 60 times a second
    
  }
}

// Exporting the menu scene as default
export default GameScene