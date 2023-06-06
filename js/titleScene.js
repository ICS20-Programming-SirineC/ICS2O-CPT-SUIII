/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Sirine Cherkaoui
// Created on: 05/31/2023
// This is the title scene

// The code written below adds to the code already in Phaser.Scene
class TitleScene extends Phaser.Scene {
  constructor() {
    // Using the "titleScene" key to create an object
    super({ key: "titleScene" });

    this.titleSceneBackgroundImage = null;
    this.titleSceneText = null;
    this.titleSceneTextStyle = { font: '200px Arial Black', fill: '#FCFBFB', align: 'center' };
  }

  init(data) {
    // Initializing title scene background colour
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    // Places Title Scene in the console to let programmer know the scene is being displayed
    console.log("Title Scene");
    // Code for background image
    this.load.image("titleSceneBackground", "./images/Cristiano.jpg");
  }

  create(data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground');
    this.titleSceneBackgroundImage.x = 1920 / 2;
    this.titleSceneBackgroundImage.y = 1080 / 2;

    this.titeSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'SUIII', this.titleSceneTextStyle);
  }

  update(time, delta) {
    if (time > 8000) {
      this.scene.switch("menuScene");
    }
  }
}

// Exporting the title scene as default
export default TitleScene;
