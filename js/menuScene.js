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
  }

  init (data) {
    // Initializing menu scene background colour
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload () {
    // Places menu Scene in the console to let programmer know the scene is being displayed
    console.log("Menu Scene")
  }

  create (data) {
  }

  update (time, delta) {
  }
}

// Exporting the menu scene as default
export default MenuScene