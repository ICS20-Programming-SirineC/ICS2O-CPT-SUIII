/* global Phaser */

// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Sirine Cherkaoui
// Created on: 05/30/2023
// This is the Phaser3 configuration file

// Creating a constant to detail the basic Phaser game
const  config = {
  // Type of game
  type: Phaser.AUTO,

  // Size of the screen
  width: 1920,
  height: 1080,

  // Setting background color
  backgroundColor: 0xffffff ,
}

// Creating a new Phaser game with config details
const game = new Phaser.Game(config)
console.log(game)
