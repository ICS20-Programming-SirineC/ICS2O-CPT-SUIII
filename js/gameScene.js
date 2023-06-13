// Copyright (c) 2020 Mr. Coxall. All rights reserved.
//
// Modified by: Sirine Cherkaoui
// Created on: 06/05/2023
// This is the menu scene
/* global Phaser */

// Game scene class represents the main game scene of the soccer game.
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameScene' });

    // Game variables
    this.background = null;
    this.ronaldoPlayer = null;
    this.soccerMissile = false;
    this.createTimer = 0;
    this.score = 0;
    this.lives = 3; // New variable for tracking lives
    this.scoreText = null;
    this.livesText = null; // New variable for displaying lives
    this.scoreTextStyle = {
      font: '65px Arial Black',
      fill: 'red',
      align: 'center',
    };
    this.gameOverText = null;
    this.gameOverTextStyle = {
      font: '65px Monospace',
      fill: 'white',
      align: 'center',
    };
    this.bgmusic = null;
    this.gameOverSound = null;
  }

  // Initialization method for the scene.
  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  // Preload method for loading assets.
  preload() {
    console.log('Game Scene');
    this.load.image('soccerBackground', './images/soccerBackground.jpg');
    this.load.image('ronaldoPlayer', './images/ronaldoPlayer.png');
    this.load.image('missile', './images/missile.png');
    this.load.image('nets', './images/nets.png');
    this.load.image('redCard', './images/redCard.png');
    this.load.audio('suiii', './sounds/suiii.mp3');
    this.load.audio('cheer', './sounds/cheer.wav');
    this.load.audio('ough', './sounds/ough.mp3');
    this.load.audio('bgmusic', './sounds/bgmusic.mp3'); // Background music
    this.load.audio('gameover', './sounds/gameover.wav'); // Game over sound
  }

  // Create method for initializing game objects and logic.
  create(data) {
    // Set up the background
    this.background = this.add.image(0, 0, 'soccerBackground').setScale(3.0);
    this.background.setOrigin(0, 0);

    // Add background music
    this.bgmusic = this.sound.add('bgmusic', { loop: true, volume: 0.5 });
    this.bgmusic.play();

    // Display the score text
    this.scoreText = this.add.text(
      10,
      10,
      'Score: ' + this.score.toString(),
      this.scoreTextStyle
    );

    // Display the lives text
    this.livesText = this.add.text(
      10,
      80,
      'Lives: ' + this.lives.toString(),
      this.scoreTextStyle
    );

    // Create the player sprite
    this.ronaldoPlayer = this.physics.add.sprite(
      1920 / 2,
      1080 - 100,
      'ronaldoPlayer'
    );

    // Create groups for missiles, nets, and red cards
    this.missileGroup = this.physics.add.group();
    this.netsGroup = this.add.group();
    this.redCardGroup = this.add.group();

    // Create the initial game elements
    this.createGameElements();

    // Handle collisions between missiles and nets
    this.physics.add.collider(
      this.missileGroup,
      this.netsGroup,
      function (missileCollide, netsCollide) {
        netsCollide.destroy();
        missileCollide.destroy();
        this.sound.play('cheer');
        this.score = this.score + 1;
        this.scoreText.setText('Score: ' + this.score.toString());
        this.createGameElements();
      }.bind(this)
    );

    // Handle overlap between player and red cards
    this.physics.add.overlap(
      this.ronaldoPlayer,
      this.redCardGroup,
      function (ronaldoPlayerCollide, redCardCollide) {
        this.sound.play('ough');
        redCardCollide.destroy();
        this.lives = this.lives - 1;
        this.livesText.setText('Lives: ' + this.lives.toString());
        if (this.lives <= 0) {
          this.physics.pause();
          ronaldoPlayerCollide.destroy();
          // Display game over text
          this.gameOverText = this.add
            .text(
              1920 / 2,
              1080 / 2,
              'Game Over!\nClick to play again.',
              this.gameOverTextStyle 
            )
            .setOrigin(0.5);
          this.gameOverText.setInteractive({ useHandCursor: true });
          this.gameOverText.on('pointerdown', () => {
            this.scene.restart();
            this.score = 0;
            this.lives = 3;
            this.bgmusic.stop(); // Stop the background music
          });
          this.gameOverSound = this.sound.add('gameover'); // Game over sound
          this.gameOverSound.play();
        } else {
          ronaldoPlayerCollide.x = 1920 / 2;
          ronaldoPlayerCollide.y = 1080 - 100;
        }
      }.bind(this)
    );
  }

  // Method for creating game elements such as nets and red cards
  createGameElements() {
    const numNets = 2;
    const numRedCards = Math.floor(numNets / 2);

    for (let i = 0; i < numNets; i++) {
      const elementsXLocation = Math.floor(Math.random() * 1920) + 1;
      let elementsXVelocity = Math.floor(Math.random() * 50) + 1;
      elementsXVelocity *= Math.round(Math.random()) ? 1 : -1;

      const aNets = this.physics.add.sprite(elementsXLocation, -100, 'nets');
      aNets.body.velocity.y = 200;
      aNets.body.velocity.x = elementsXVelocity;
      this.netsGroup.add(aNets);

      if (i < numRedCards) {
        const aRedCard = this.physics.add.sprite(
          elementsXLocation,
          -300,
          'redCard'
        );
        aRedCard.body.velocity.y = 200;
        aRedCard.body.velocity.x = elementsXVelocity;
        this.redCardGroup.add(aRedCard);
      }
    }
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT');
    const keyRightObj = this.input.keyboard.addKey('RIGHT');
    const keyUpObj = this.input.keyboard.addKey('UP');
    const keyDownObj = this.input.keyboard.addKey('DOWN');
    const keySpaceObj = this.input.keyboard.addKey('SPACE');

    // Update player position based on keyboard input
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

    // Wrap player position around the screen
    if (this.ronaldoPlayer.x < 0) {
      this.ronaldoPlayer.x = 1920;
    } else if (this.ronaldoPlayer.x > 1920) {
      this.ronaldoPlayer.x = 0;
    }

    if (this.ronaldoPlayer.y < 0) {
      this.ronaldoPlayer.y = 1080;
    } else if (this.ronaldoPlayer.y > 1080) {
      this.ronaldoPlayer.y = 0;
    }

    // Shoot missiles when the spacebar is pressed
    if (keySpaceObj.isDown === true) {
      if (this.soccerMissile === false) {
        this.soccerMissile = true;
        const aNewMissile = this.physics.add.sprite(
          this.ronaldoPlayer.x + 40,
          this.ronaldoPlayer.y - 140,
          'missile'
        );
        this.missileGroup.add(aNewMissile);
        this.sound.play('suiii');
      }
    }

    if (keySpaceObj.isUp === true) {
      this.soccerMissile = false;
    }

    // Update missile positions and destroy them when they reach the top of the screen
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15;
      if (item.y < 0) {
        item.destroy();
      }
    });

    // Periodically create new game elements
    this.createTimer -= delta;
    if (this.createTimer <= 0) {
      this.createGameElements();
      this.createTimer = 3000; // Adjust the timer duration as desired (3 seconds in this case)
    }
  }
}

export default GameScene;
