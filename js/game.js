/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Sirine Cherkaoui
// Created on: 05/30/2023
// This is the Phaser3 configuration file

// Importing default exports from scene files
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import MenuScene from "./menuScene.js"

// Creating objects of scenes for managing different scenes in the program
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()


// Creating a constant for the basic game scene
const  config = {
  // Type of game
  type: Phaser.AUTO,

  // Adjusting size of the screen
  width: 1920,
  height: 1080,

  // Allowing default arcade game to be played
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },

  // Setting background color
  backgroundColor: 0xf77a,

   // Allowing scale of background to change
  scale: {
    mode: Phaser.Scale.FIT,
    
    // Placing the background in the center of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

// Creating a new Phaser game with config details
const game = new Phaser.Game(config)

// Loading the splashScenes
game.scene.add("splashScene", splashScene)

// Loading the titleScenes
game.scene.add("titleScene", titleScene)

// Loading the menuScenes
game.scene.add("menuScene", menuScene)



// Starting the splash scene
game.scene.start("splashScene")