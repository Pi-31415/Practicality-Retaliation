class EnemyDroid {
  constructor(scene, x, y, texture, frame) {
    this.scene = scene;
    this.sprite = scene.matter.add.sprite(x, y, texture, frame);
    this.sprite.setDepth(1000);
    this.sprite.setStatic(false);
    this.setupAnimations();
    this.sprite.setCollisionCategory(0);
  }

  setupAnimations() {
    this.scene.atlasLoader.createAnimation("idleEnemy", "enemydroid", {
      start: 0,
      end: 66,
      zeroPad: 2, // Adjust as necessary
      prefix: "skeleton-idle_",
      suffix: ".png",
      frameRate: 30,
      repeat: -1,
    });
    this.sprite.anims.play("idleEnemy", true);
  }

  
  followPlayer(playerPositionX, playerPositionY) {
    const offsetDistance = 100; // Distance to maintain from the player
    const stopThreshold = 30; // Distance within which to stop moving

    // Calculate the target position with offset
    const direction = Phaser.Math.Angle.Between(
      this.sprite.x, this.sprite.y,
      playerPositionX + 300, playerPositionY - 100
    );
    const targetX = playerPositionX + Math.cos(direction) * offsetDistance;
    const targetY = playerPositionY + Math.sin(direction) * offsetDistance;

    // Calculate distance to the target position
    const distanceToTarget = Phaser.Math.Distance.Between(
      this.sprite.x, this.sprite.y,
      targetX, targetY
    );

    // Move towards the target position if not within stop threshold
    if (distanceToTarget > stopThreshold) {
      const speed = 2; // Adjust speed as necessary
      this.sprite.setVelocity(
        Math.cos(direction) * speed,
        Math.sin(direction) * speed
      );

      // Flip sprite based on direction
      this.sprite.flipX = this.sprite.x < targetX;
    } else {
      // Stop movement if close to the target
      this.sprite.setVelocity(0, 0);
    }
  }

  update(playerPositionX, playerPositionY) {
    this.followPlayer(playerPositionX, playerPositionY);
    this.sprite.anims.play("idleEnemy", true); 
  }
  
}
