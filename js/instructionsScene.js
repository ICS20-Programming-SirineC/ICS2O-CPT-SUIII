/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Sirine Cherkaoui
// Created on: 06/10/2023
// This is the menu scene

// This class is the Instructions Scene
class InstructionsScene extends Phaser.Scene {
  constructor() {
    // Using the "instructionsScene" key to create an object
    super({ key: "instructionsScene" });
    
    // Constructing background image
    this.instructionsSceneBackgroundImage = null;
    
    // Constructing back button
    this.backButton = null;

    // Constructing the scene text and applying style
    this.instructionsSceneText = null;
    this.instructionsSceneTextStyle = { font: "135px Arial Black", fill: "white", align: "left" };

    // Constructing the explanation text and applying style
    this.explanationText = null;
    this.explanationTextStyle = { font: "40px Arial Black", fill: "white", align: "left" };
  }

  init(data) {
    // Setting the background color for the scene
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    // Places Instructions Scene in the console to let programmer know the scene is being displayed
    console.log("Instructions Scene");
    
    // Loading in the images for the background and the back button
    this.load.image("instructionsSceneBackgroundImage", "./images/instructionsSceneImg.jpg");
    this.load.image("backButton", "./images/backButton.png");
  }

  create(data) {
    // Creating the background image and placing it into the scene
    this.instructionsSceneBackgroundImage = this.add.sprite(0, 0, "instructionsSceneBackgroundImage").setScale(1);
    this.instructionsSceneBackgroundImage.x = 1920 / 2;
    this.instructionsSceneBackgroundImage.y = 1080 / 2;
    
    // Placing instruction text into scene with coordinates
    this.instructionsSceneText = this.add.text(1920 / 2, (1080 / 2) - 450, "Instructions:", this.instructionsSceneTextStyle).setOrigin(0.5);

    // Adding the explanation text
    this.explanationText = this.add.text(1920 / 2, (1080 / 2) - 230, "You are Ronaldo.\nTo score points you have to shoot as many goals as possible using the space bar.\nAvoid colliding with red cards!\nAfter three red cards, the game is over and you lose.\nGood luck!", this.explanationTextStyle).setOrigin(0.5);
    
    // Placing back button into scene with coordinates
    this.backButton = this.add.sprite(1920 / 2, (1080 / 2) + 320, "backButton");
    
    // Making back button interactive using the hand cursor
    this.backButton.setInteractive({ useHandCursor: true });
    
    // Creating a function when the button is clicked
    this.backButton.on("pointerdown", () => this.clickBack());
  }

  update(time, delta) {
  }
  
  // If the back button is clicked, return to the menu scene
  clickBack() {
    this.scene.start("menuScene")
  }
}

export default InstructionsScene;
