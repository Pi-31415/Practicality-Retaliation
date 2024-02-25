class Background {
  constructor(scene, textures, x = 0, y = 0, scaleX = 1, scaleY = 1) {
    this.scene = scene;
    this.textures = textures; // Array of textures
    this.x = x;
    this.y = y;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.baseSpeed = 2; // Base speed for the furthest layer

    this.sprites = []; // Array to hold multiple tileSprites
    this.createBackgrounds();
  }

  createBackgrounds() {
    let depth = -this.textures.length;

    // Create a tileSprite for each texture
    this.textures.forEach((texture, index) => {
      let spriteY = this.y;
      let spriteDepth = depth + index;
      let spriteScaleY = this.scaleY;
      
     // If it's the last image, set depth to 1000 and adjust Y position
      if (index === this.textures.length - 1) {
        spriteDepth = 1000;
        let spriteHeight = this.scene.sys.canvas.height / this.scaleY;
        spriteY = 0;
        spriteScaleY = 1; // Keep the scale for the last image as 1 to touch the base
      }

      let sprite = this.scene.add.tileSprite(this.x, spriteY, this.scene.sys.canvas.width, this.scene.sys.canvas.height, texture);
      sprite.setOrigin(0, 0);
      sprite.setScale(this.scaleX, spriteScaleY);
      sprite.setDepth(spriteDepth);

      this.sprites.push(sprite);
    });
  }

  update(cursors, speed) {
    this.sprites.forEach((sprite, index) => {
      let speedModifier = 1 + (index * 0.9); // Speed increases with each layer
      let effectiveSpeed = this.baseSpeed * speedModifier * (speed/1.5);

      if (cursors.left.isDown) {
        sprite.tilePositionX -= effectiveSpeed;
      } else if (cursors.right.isDown) {
        sprite.tilePositionX += effectiveSpeed;
      }
    });
  }
}
