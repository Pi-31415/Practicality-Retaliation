class ParallaxBackground {
  constructor(scene) {
    this.scene = scene;
    this.width = 15088; // Width of your background
    this.height = 1056; // Height of your background

    // Create background layers
    this.background = this.scene.add
      .image(0, 0, "ForestBackground")
      .setOrigin(0, 0)
      .setScale(0.8)
      .setScrollFactor(0.1);
    // Midground with dynamic scaling
    this.midground = this.scene.add
      .image(0, this.scene.scale.height, "ForestMidground")
      .setOrigin(0, 1);
    this.adjustMidgroundScale();
    this.midground.setDepth(4);
    // Foreground with dynamic scaling
    this.foreground = this.scene.add
      .image(0, this.scene.scale.height, "ForestForeground")
      .setOrigin(0, 1);
    this.adjustForegroundScale();
    this.foreground.setDepth(5000);
    // Game objects container
    this.gameObjects = this.scene.add.group();
  }

  adjustMidgroundScale() {
    let midgroundHeight = this.midground.texture.getSourceImage().height;
    let scaleFactor = this.scene.scale.height / midgroundHeight;
    this.midground.setScale(scaleFactor);
    this.midground.setScrollFactor(1, scaleFactor);
  }

  adjustForegroundScale() {
    let foregroundHeight = this.foreground.texture.getSourceImage().height;
    let scaleFactor = this.scene.scale.height / foregroundHeight;
    this.foreground.setScale(scaleFactor);
    this.foreground.setScrollFactor(2, scaleFactor);
  }

  // Modified method to spawn game objects with options for static and passable properties
  spawnGameObject(
    x,
    y,
    texture,
    frame,
    isStatic = false,
    passable = false,
    scale = 1,
    depth = 5
  ) {
    let gameObjectOptions = { isStatic: isStatic };

    // If the object is passable, make it a sensor
    if (passable) {
      gameObjectOptions.isSensor = true;
    }

    let gameObject = this.scene.matter.add.sprite(
      x,
      y,
      texture,
      frame,
      gameObjectOptions
    );
    gameObject.setDepth(depth); // Between the player and midground
    gameObject.setScale(scale);

    // Disable collision, if passable
    if (passable) {
      gameObject.setCollisionCategory(0);
    }

    this.gameObjects.add(gameObject);
  }
}
