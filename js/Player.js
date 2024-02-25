class Player {
  constructor(scene, x, y, texture, frame) {
    this.scene = scene;
    this.sprite = scene.matter.add.sprite(x, y, texture, frame);
    this.sprite.setDepth(100);
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

    // Walking and running
    this.isWalking = false;
    this.walkStartTime = 0;
    this.runThreshold = 1000; // milliseconds threshold for running
  }
  
  //Adjust Colors
  // Set the tint of the player's sprite
  setTint(color) {
    this.sprite.setTint(color);
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
      start: 0,
      end: 84,
      zeroPad: 4,
      prefix: "jump_forward/Image Sequence_019_",
      suffix: "",
      frameRate: 30,
      repeat: 0,
    });
  }

  getSpeed() {
    return this.speed;
  }

  update() {
    const isMoving = this.cursors.left.isDown || this.cursors.right.isDown;
    const currentTime = this.scene.time.now;

    if (this.cursors.space.isDown && !this.isJumping) {
      this.isJumping = true;

      if (isMoving) {
        // Jump forward animation when arrow key is held down
        this.sprite.anims.play("jump_forward", true);

        this.speed = 1;
        // Start the tween with a short delay
        this.scene.time.delayedCall(700, () => {
          // Delay of 250 milliseconds
          this.speed = 9;
          this.scene.tweens.add({
            targets: this.sprite,
            y: this.sprite.y - 300, // Move up
            ease: "Power1",
            duration: 400,
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
        });
      } else {
        // Normal jump animation when only space is pressed
        this.sprite.anims.play("jump", true);
        this.scene.tweens.add({
          targets: this.sprite,
          y: this.sprite.y - 200, // Move up
          ease: "Power1",
          duration: 300,
          yoyo: true, // Move back down
          onComplete: () => {
            this.isJumping = false;
            this.sprite.anims.play("idle", true);
          },
        });
      }
      return; // Skip the rest of the update logic while jumping
    }

    // Skip walking and running logic if jumping
    if (this.isJumping) {
      return;
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
  }
}
