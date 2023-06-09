/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Sirine Cherkaoui
// Created on: 05/30/2023
// This is the splash scene

// The code written below adds to the code already in Phaser.Scene
class SplashScene extends Phaser.Scene {
  constructor () {
    // Using the "splashScene" key to create an object
    super({ key: "splashScene"})

    // Initializing splashSceneBackgroundImage variable
    this.splashSceneBackgroundImage = null;
  }

  init (data) {
    // Initializing splash scene background colour
    this.cameras.main.setBackgroundColor("#CDC1C1")
  }

  preload () {
    // Adding the Splash Scene in the console to let programmer know the scene is being displayed
    console.log("Splash Scene")

    // Giving Phaser the splash scene image folder and file
    this.load.image("splashSceneBackground", "./images/splashSceneImage.png")
  }

  create (data) {
    // Displaying the image in the preload() section
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, "splashSceneBackground")

    // Centring the background image on the screen
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2

    // Adding text to introduce the game 
    const text = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 4.5,
      "A GAME BY SIRINE CHERKAOUI",
      {
        fontFamily: "Monospace",
        fontSize: "100px",
        color: "#9B2121",
        fontStyle: "Bold",
        strokeThickness: 5,
      }
    )
    text.setOrigin(0.5) // set the origin of the text to its center
  }

  update (time, delta) {
    // Setting the amount of time during which this scene is shown (4 seconds)
    if (time > 4000) {
      
      // Moving on to the title scene
      this.scene.switch("titleScene")
    }
  }
}

// Exporting the splash scene as default
export default SplashScene