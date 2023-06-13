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
    super({ key: "menuScene" })

    this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  init (data) {
    // Initializing menu scene background color
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    // Places menu Scene in the console to let programmer know the scene is being displayed
    console.log("Menu Scene")
    this.load.image('menuSceneBackground', './images/soccer-ball.jpg')
    this.load.image('startButton', './images/start.png')
    this.load.image("instructionsButton", "./images/instructionsButton.png")
  }

  create (data) {
    // Displaying the menu scene background image
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground');
    // Initializing the position of the image on the screen
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;
    this.menuSceneBackgroundImage.setScale(5); 
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton');
    // Making instructions button interactive (responsive to user's click)
    this.startButton.setInteractive({ useHandCursor: true })
    // Creating a function for when the start button is clicked
    this.startButton.on('pointerdown', () => this.clickButton())

    // Placing instructions button into the scene using coordinates
    this.instructionsButton = this.add.sprite(1920 / 2, (1080 / 2) + 340, "instructionsButton").setScale(0.7)
    
    // Making instructions button interactive (responsive to user's click)
    this.instructionsButton.setInteractive({ useHandCursor: true })
    
    // Creating a function for when the instructions button is clicked
    this.instructionsButton.on("pointerdown", () => this.instructionsClicked())
  }

  update (time, delta) {
  }

  // Function for when start button is clicked
  clickButton () {
    this.scene.start("gameScene")
  }

  // Function for when instructions button is clicked
  instructionsClicked() {
    this.scene.start("instructionsScene")
  }
}

// Exporting the menu scene as default
export default MenuScene
