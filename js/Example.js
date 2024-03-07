class Example extends Phaser.Scene {
  constructor() {
    super("Example");
    this.isAttacking = false; // Add this property
  }
  init(data) {
    // Retrieve the TextureAtlasLoader
    this.atlasLoader = data.atlasLoader;
  }
  
  gotoMain(){
    console.log("Main");
    
    // Stop all existing audio
    this.sound.stopAll();
    this.scene.start('MainMenu');
  }
  
  toggleAttackMode() {
    console.log("Action!");
    this.isAttacking = !this.isAttacking;
    this.musicManager.setAttackMode(this.isAttacking);

    if (this.isAttacking) {
      // Set enemyDroid's x position to be 500 units from the player's x position
      this.enemyDroid.sprite.x = this.player.sprite.x + 900;

      // Fade in the enemyDroid
      this.tweens.add({
        targets: this.enemyDroid.sprite,
        alpha: { from: 0, to: 1 },
        duration: 10
      });

      // Fade in the allyDrones after 2 seconds and then enable their attacking mode
      this.time.delayedCall(6000, () => {
        this.allyDrones.forEach(drone => {
          this.tweens.add({
            targets: drone.sprite,
            alpha: { from: 0, to: 1 },
            duration: 100,
            onComplete: () => {
              drone.setAttackingMode(this.isAttacking);
            }
          });
        });
      });
    } else {
      // Fade out the enemyDroid and allyDrones and disable their attacking mode
      this.tweens.add({
        targets: this.enemyDroid.sprite,
        alpha: { from: 1, to: 0 },
        duration: 100
      });
      this.allyDrones.forEach(drone => {
        drone.setAttackingMode(this.isAttacking);
        this.tweens.add({
          targets: drone.sprite,
          alpha: { from: 1, to: 0 },
          duration: 100
        });
      });
    }
  }


  create() {
    print_scene("Example");
    // Create the background
    // Create the parallax background with new implementation
    this.background = new ParallaxBackground(this);

    // Instantiate the EnemyDroid
    this.enemyDroid = new EnemyDroid(
      this,
      5000,
      DEFAULT_HEIGHT / 2 + 120,
      "enemydroid",
      "skeleton-idle_00"
    );

    

    // Now you can pass the atlasLoader to the Player
    this.player = new Player(
      this,
      3900,
      DEFAULT_HEIGHT / 2 + 70,
      "pi",
      "idle/Image Sequence_018_0109",
      this.atlasLoader
    );
    
    //Add the Ally Drones :
    this.allyDrones = [];
    const numberOfDrones = 5; // Set the desired number of drones
    const droneSpawnRadius = 200; // Radius around the player to spawn drones

    for (let i = 0; i < numberOfDrones; i++) {
      // Generate random positions within a circle around the player
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * droneSpawnRadius;
      const x = this.player.sprite.x + radius * Math.cos(angle);
      const y = this.player.sprite.y + radius * Math.sin(angle);

      const drone = new AllyDrone(this, x, y);
      this.allyDrones.push(drone);
    }
    
    // Initially make enemyDroid and allyDrones invisible
    this.enemyDroid.sprite.alpha = 0;
    this.allyDrones.forEach(drone => drone.sprite.alpha = 0);

    
    this.player.toggleDebugMode();
    this.player.setTint(0x00ff00); // Red tint
    this.player.setBrightness(1.0); // Adjsut brightness
    // Create cursor keys for input
    this.cursors = this.input.keyboard.createCursorKeys();
    // Create the post processing overlay
    //this.postProcessing = new PostProcessing(this, 'video', null, 'sunrays');
    this.postProcessing = new PostProcessing(this, "image", "sunrays", null);
    this.musicManager = new BackgroundMusicManager(this, "bgmusic", 1000, 500); // 1000 ms for fade duration, 1000 ms for key hold duration
    // 1000 ms for fade duration
    //Spawn Game Objects
    this.background.spawnGameObject(0, 500, "wall", "", true, false);

    this.background.spawnGameObject(8000, 500, "wall", "", true, false);

 this.background.spawnGameObject(3106, 450, "billboard", "", true, true, 0.6,3);
    



    this.createCars(100); // Create 10 cars for example

    //Add Background Music (Adaptive)
    this.musicManager.create();
    //Add Ambience
    this.ambienceBackground = new AmbienceBackground(this, "Cityambience", 0.2); // 0.5 is the initial volume
    this.ambienceBackground.create();
    // Setup the camera
    this.setupCamera();

    // Set Up Cinematics
     this.cinematic = new Cinematic(this, cinematicsData, this.player);

    this.cinematic.create();
    
    this.cinematic.ConvoSpawn(
      3106, 700,
      "convoIcon",
      "",
      true,
      false,
      0.5
    );

  }

  createCars(numberOfCars) {
    this.cars = this.add.group(); // Create a group for cars

    for (let i = 0; i < numberOfCars; i++) {
      let x = Phaser.Math.Between(0, 15088);
      let y = Phaser.Math.Between(0, 2000);
      let speed = Phaser.Math.FloatBetween(2, 5);
      let scale = Phaser.Math.FloatBetween(0.05, 0.3);

      let car = new CyberCar(this, x, y, "car", null, speed, scale);
      car.setDepth(1); // Set depth to appear between background and midground
      this.cars.add(car);
    }
  }

  setupCamera() {
    // Set the camera bounds to the size of the background
    this.cameras.main.setBounds(
      0,
      0,
      this.background.width,
      this.background.height
    );
    this.cameras.main.startFollow(this.player.sprite, true, 0.05, 0.05);

    // Dynamic zoom based on player speed
    this.cameras.main.setZoom(2); // Initial zoom level
    this.playerSpeedZoomFactor = 0.1; // How much zoom changes with speed
  }

  update(time, delta) {
    this.musicManager.update(this.cursors);
    // Update EnemyDroid
    this.enemyDroid.update(this.player.sprite.x, this.player.sprite.y);

    // Update each ally drone
    this.allyDrones.forEach((drone) => {
      drone.update(this.player.sprite.x,this.player.sprite.y, this.enemyDroid.sprite.x,this.enemyDroid.sprite.y);
    });
    
    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('A'))) {
            this.toggleAttackMode();
        }

    this.player.update();
    
     // Update game objects created with ConvoSpawn
    this.cinematic.gameObjects.getChildren().forEach(gameObject => {
        if (gameObject.isConvoSpawn) {
            gameObject.update(time, delta);
        }
    });
    
    this.cinematic.update(); // Update the cinematic text position
    // Update each car
    this.cars.children.iterate((car) => {
      car.update();
    });
    // Update the background if it has any dynamic behavior
    const targetZoom = 2 - this.player.getSpeed() * this.playerSpeedZoomFactor;
    this.cameras.main.setZoom(
      Phaser.Math.Linear(this.cameras.main.zoom, targetZoom, 0.08)
    );
  }
}
