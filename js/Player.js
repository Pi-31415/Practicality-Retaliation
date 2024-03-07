class Player {
  constructor(scene, x, y, texture, frame) {
    // Debug mode flag
    this.debugMode = false;
    this.debugText = null; // For storing the debug text object
    this.scene = scene;
    this.sprite = scene.matter.add.sprite(x, y, texture, frame);
    this.sprite.setDepth(100);
    // Ensure sprite is dynamic (not static)
    this.sprite.setStatic(false);

    // Setup animations for the player
    this.setupAnimations();

    // Initially play the idle animation
    this.sprite.anims.play("idle", true);

    // Create keyboard controls
    this.cursors = scene.input.keyboard.createCursorKeys();

    // Player physics properties
    this.sprite.setFixedRotation(); // Prevents player from rotating

    // Modify the update method to broadcast the player's speed
    this.speed = 0;

    this.isJumpingForward = false; // New flag for jump_forward state

    // Walking and running
    this.isWalking = false;
    this.walkStartTime = 0;
    this.runThreshold = 1000; // milliseconds threshold for running
    // Debugging - Enable this to see physics bodies
  }

  //Adjust Colors
  // Set the tint of the player's sprite
  setTint(color) {
    this.sprite.setTint(color);
  }
  
   // Method to toggle debug mode
  toggleDebugMode() {
    this.debugMode = !this.debugMode;
console.log(`Debug mode: ${this.debugMode}`); // Add this line for debugging

    // Create or destroy the debug text based on the debug mode
    if (this.debugMode) {
      this.debugText = this.scene.add.text(100, 100, 'asdasd', { fontSize: '16px', fill: '#FFF' });
      this.debugText.setScrollFactor(0); // Make sure the text doesn't scroll with the camera
      this.debugText.setDepth(100);
    } else if (this.debugText) {
      this.debugText.destroy();
      this.debugText = null;
    }
  }

  // Adjust the brightness of the player's sprite
  setBrightness(value) {
    // Ensure the brightness value is between 0 (dark) and 1 (bright)
    const clampedValue = Phaser.Math.Clamp(value, 0, 1);
    // Calculate the tint color based on the brightness value
    const tint = Phaser.Display.Color.GetColor(
      255 * clampedValue,
      255 * clampedValue,
      255 * clampedValue
    );
    this.setTint(tint);
  }

  setupAnimations() {
    this.scene.atlasLoader.createAnimation("idle", "pi", {
      start: 109,
      end: 189,
      zeroPad: 4,
      prefix: "idle/Image Sequence_018_",
      suffix: "",
      frameRate: 30,
      repeat: -1,
    });

    // You can add more animations in a similar way
    this.scene.atlasLoader.createAnimation("idle2", "pi", {
      start: 133,
      end: 190,
      zeroPad: 4,
      prefix: "idle2/Image Sequence_014_",
      suffix: "",
      frameRate: 30,
      repeat: -1,
    });

    this.scene.atlasLoader.createAnimation("run", "pi", {
      start: 177,
      end: 200,
      zeroPad: 4,
      prefix: "run/Image Sequence_013_",
      suffix: "",
      frameRate: 30,
      repeat: -1,
    });

    this.scene.atlasLoader.createAnimation("walk", "pi", {
      start: 102,
      end: 135,
      zeroPad: 4,
      prefix: "walk/Image Sequence_012_",
      suffix: "",
      frameRate: 30,
      repeat: -1,
    });

    this.scene.atlasLoader.createAnimation("jump", "pi", {
      start: 0,
      end: 15,
      zeroPad: 4,
      prefix: "jump/Image Sequence_021_",
      suffix: "",
      frameRate: 30,
      repeat: 0,
    });

    this.scene.atlasLoader.createAnimation("jump_forward", "pi", {
      start: 30,
      end: 84,
      zeroPad: 4,
      prefix: "jump_forward/Image Sequence_019_",
      suffix: "",
      frameRate: 30,
      repeat: 0,
    });

    // Prevent the sprite from going to sleep
    this.sprite.setSleepThreshold(Infinity);
  }

  getSpeed() {
    return this.speed;
  }
  
  // Method to probabilistically initiate a jump
probabilisticJump(probability,isJumping,isMoving) {
  // Generate a random number between 0 and 1
  const randomNum = Math.random();
  // Check if the random number is less than the specified probability
  if (randomNum < probability) {
    // Trigger the jump
    this.initiateJump(isJumping,isMoving);
  }
}

  // Method to initiate a jump
initiateJump(isJumping,isMoving) {
   // Jump Logic
 if (!this.isJumping) {
    this.isJumping = true;
    let jumpAnimation = isMoving ? "jump_forward" : "jump";
    this.isJumpingForward = isMoving; // Set flag if jumping forward

    this.sprite.anims.play(jumpAnimation, true);
    this.speed = isMoving ? 9 : 1; // Adjust speed based on jump type

    // Tween for jumping
    let jumpHeight = isMoving ? 300 : 200;
    this.scene.tweens.add({
      targets: this.sprite,
      y: this.sprite.y - jumpHeight,
      ease: "Power1",
      duration: 500,
      yoyo: true, // Move back down
      onComplete: () => {
        this.isJumping = false;
        if (isMoving) {
          this.sprite.anims.play(this.isRunning ? "run" : "walk", true);
        } else {
          this.sprite.anims.play("idle", true);
        }
      },
    });
  }
}

  update() {
    const isMoving = this.cursors.left.isDown || this.cursors.right.isDown;
    const isJumping = this.cursors.space.isDown;
    const currentTime = this.scene.time.now;

    // Handle movement
    if (isMoving && !this.isJumping) {
      if (this.sprite.body.isSleeping) {
        this.sprite.setAwake();
      }

      const walkDuration = currentTime - this.walkStartTime;
      this.isRunning = walkDuration > this.runThreshold;

      let moveSpeed = this.isRunning ? 7 : 3; // Running or walking speed
      if (this.cursors.left.isDown) {
        this.sprite.setVelocityX(-moveSpeed); // Move left
        this.sprite.flipX = true; // Flip sprite to left
      } else if (this.cursors.right.isDown) {
        this.sprite.setVelocityX(moveSpeed); // Move right
        this.sprite.flipX = false; // Flip sprite to right
      }

      if (!this.isWalking) {
        this.isWalking = true;
        this.walkStartTime = currentTime;
      }

      // Play the appropriate walking or running animation
      this.sprite.anims.play(this.isRunning ? "run" : "walk", true);
    } else if (!isMoving && this.isWalking && !this.isJumping) {
      if (this.isWalking) {
        this.isWalking = false;
        this.sprite.setVelocityX(0); // Stop
        this.sprite.anims.play("idle", true); // Play idle animation
      }
    }

    // Set the player speed for external use (e.g., camera zoom)
    this.speed = Math.abs(this.sprite.body.velocity.x);

   //Probabilistic Jump 

    // Skip walking and running logic if jumping
    if (this.isJumping) {
      return;
    }

    // Reset jump forward flag and resume walking/running animation once the player has landed
    if (!this.isJumping && this.isJumpingForward) {
      this.isJumpingForward = false;
      if (isMoving) {
        this.sprite.anims.play(this.isRunning ? "run" : "walk", true);
      }
    }

    // Walk or run based on duration of key press
    if (isMoving && !this.isWalking) {
      this.isWalking = true;
      this.walkStartTime = currentTime;
    } else if (!isMoving && this.isWalking) {
      this.isWalking = false;
      this.sprite.setVelocityX(0);
      this.sprite.anims.play("idle", true);
    }
    // Update the speed based on player's movement
    if (this.isWalking) {
      const walkDuration = currentTime - this.walkStartTime;
      const isRunning = walkDuration > this.runThreshold;
      this.speed = isRunning ? 7 : 3;
    } else {
      this.speed = 0;
    }

    if (this.isWalking) {
      const walkDuration = currentTime - this.walkStartTime;
      const isRunning = walkDuration > this.runThreshold;

      if (this.cursors.left.isDown) {
        // this.sprite.setVelocityX(isRunning ? -9 : -5);
        this.sprite.anims.play(isRunning ? "run" : "walk", true);
        this.sprite.flipX = true; // Flip sprite to left
      } else if (this.cursors.right.isDown) {
        // this.sprite.setVelocityX(isRunning ? 9 : 5);
        this.sprite.anims.play(isRunning ? "run" : "walk", true);
        this.sprite.flipX = false; // Flip sprite to right
      }
    }
    
     // Check if the player is running and call probabilisticJump
  if (this.isRunning) {
    this.probabilisticJump(0.001,isJumping,isMoving); // 1% chance to jump every frame
  }
    
    // Update debug information if debug mode is on
    if (this.debugMode && this.debugText) {
      const x = Math.round(this.sprite.x);
      const y = Math.round(this.sprite.y);
      //console.log(`X: ${x}, Y: ${y}`);
    }
  }
}
