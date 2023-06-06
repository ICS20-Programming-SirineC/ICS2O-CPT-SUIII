/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Sirine Cherkaoui
// Created on: 05/31/2023
// This is the menu scene

// The code written below adds to the code already in Phaser.Scene
class MenuScene extends Phaser.Scene {
  constructor () {

    // Using the "menuScene" key to create an object
    super({ key: "menuScene"})

    this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  init (data) {
    // Initializing menu scene background colour
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    // Places menu Scene in the console to let programmer know the scene is being displayed
    console.log("Menu Scene")
    this.load.image('menuSceneBackground', './images/soccer-ball.jpg')
    this.load.image('startButton', './images/start.png')
  }

  create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground');
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;
    this.menuSceneBackgroundImage.setScale(5); 
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton');
    this.startButton.setInteractive({ useHandCursor: true})
    this.startButton.on('pointerdown', () => this.clickButton ())
  }

  update (time, delta) {
  }

  clickButton () {
    this.scene.start('gameScene')
    }
}

// Exporting the menu scene as default
export default MenuScene