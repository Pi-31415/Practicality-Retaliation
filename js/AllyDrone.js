class AllyDrone {
  constructor(scene, x, y) {
    this.scene = scene;
    this.isAttacking = false;
    this.sprite = scene.matter.add.sprite(x, y, "allyDrone");
    this.sprite.setDepth(100);
    this.sprite.setStatic(false);
    this.sprite.setCollisionCategory(0);
    // Set the scale of the sprite (adjust as needed)
    this.sprite.setScale(0.3); // Example scale value
    // Additional properties and methods for boid behavior
    // Properties for sine wave movement
    this.orbitDistance = 0; // Base distance from player
    this.waveAmplitude = 300; // Amplitude of the sine wave
    this.waveFrequency = 0.0007; // Frequency of the sine wave
    this.time = 0; // Time counter
    this.offset = Math.random() * 100;
  }

  setAttackingMode(isAttacking) {
    this.isAttacking = isAttacking;
  }

  shootAtTarget(targetX, targetY) {
    const bulletSpeed = 10; // Adjust as necessary
    const angle = Phaser.Math.Angle.Between(
      this.sprite.x,
      this.sprite.y,
      targetX,
      targetY
    );
    const bullet = this.scene.matter.add.sprite(
      this.sprite.x,
      this.sprite.y,
      "redParticle"
    );
    bullet.setDepth(99);
    bullet.setCollisionCategory(0);
    bullet.setBlendMode(Phaser.BlendModes.ADD); // Set blend mode to ADD

    bullet.setVelocity(
      bulletSpeed * Math.cos(angle),
      bulletSpeed * Math.sin(angle)
    );
    bullet.setIgnoreGravity(true); // Ignore gravity if using Matter.js
    // Set a lifespan for the bullet
    this.scene.time.addEvent({
      delay: 2000, // Duration before the bullet disappears, in milliseconds
      callback: () => bullet.destroy(), // Destroy the bullet
      callbackScope: this,
    });
     this.scene.sound.play('lasersound', { volume: 1}); // Make sure you have loaded this sound in your scene
  }

  update(
    playerPositionX,
    playerPositionY,
    enemyDroidPositionX,
    enemyDroidPositionY,
    deltaTime
  ) {
    this.time = Date.now() * this.waveFrequency + this.offset;

    // Calculate lemniscate (infinity loop) offset
    let denominator = 1 + Math.sin(this.time) * Math.sin(this.time);
    let sineWaveX = (Math.cos(this.time) / denominator) * this.waveAmplitude;
    let sineWaveY =
      ((Math.cos(this.time) * Math.sin(this.time)) / denominator) *
      this.waveAmplitude;

    // Update sprite position with sine wave movement
    this.sprite.x = playerPositionX + sineWaveX;
    // console.log( )
    this.sprite.y = playerPositionY + sineWaveY;
    // Determine if the enemy is to the left or right of the drone
    const enemyIsOnRight = enemyDroidPositionX < this.sprite.x;
    this.sprite.flipX = !enemyIsOnRight; // Flip sprite based on enemy position
    if (this.isAttacking) {
      // Shoot periodically
      if (Phaser.Math.Between(0, 100) < 2) {
        // Random chance to shoot
        this.shootAtTarget(enemyDroidPositionX, enemyDroidPositionY);
      }
    }
  }
}
