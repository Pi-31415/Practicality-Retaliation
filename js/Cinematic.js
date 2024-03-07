class Cinematic {
  constructor(scene, cinematicsData, player) {
    this.scene = scene;
    this.cinematicsData = cinematicsData;
    this.player = player; // Store the player reference
    this.currentCinematicIndex = 0;
    this.subtitleText = null;
    this.isCinematicPlaying = false;
    this.collidedObject = null;
    this.lastSpawnSide = "left"; // Track the last spawn side (left or right)
    // Game objects container
    this.gameObjects = this.scene.add.group();
    this.phonecallAudio = null; // Add this line
  }

  create() {
    // Create the text object for subtitles, but set it to invisible
    this.subtitleText = this.scene.add
      .text(this.scene.scale.width / 2, this.scene.scale.height * 0.5, "", {
        font: "30px Arial",
        fill: "#FFFFFF",
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(10000)
      .setVisible(false);

    // Setup collision events
    this.setupCollisionEvents();
  }

  executeAction(action) {
    switch (action) {
      case "phonecall":
        console.log("Executing phone call action");
        // Play the 'nokia' audio in a loop with a specified volume
        if (!this.phonecallAudio) {
          this.phonecallAudio = this.scene.sound.add("nokia", { loop: true });
          this.phonecallAudio.play({ volume: 0.1 });
        }
        break;
      case "phonepick":
        console.log("Executing phone pick action");
        // Stop the 'nokia' audio
        // Stop the 'nokia' audio
        if (this.phonecallAudio && this.phonecallAudio.isPlaying) {
          this.phonecallAudio.stop();
          this.phonecallAudio = null;
        }
        break;
      case "attack":
        console.log("Executing attack action");
        if (this.scene instanceof Example) {
          this.scene.toggleAttackMode();
        }
        break;

      case "disableattack":
        console.log("Executing disable attack action");
        if (this.scene instanceof Example) {
          this.scene.toggleAttackMode();
        }
        break;
      // ... other cases ...
    }
  }

  ConvoSpawn(
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
    // Add a custom property to identify objects created with ConvoSpawn
    gameObject.isConvoSpawn = true;

    gameObject.setDepth(depth);
    gameObject.setScale(scale);
    gameObject.setBlendMode(Phaser.BlendModes.ADD); // Set additive blend mode

    // Disable collision, if passable
    if (passable) {
      gameObject.setCollisionCategory(0);
    }

    // Store initial Y position and a variable for sine movement
    gameObject.initialY = y;
    gameObject.sineOffset = 0;

    this.gameObjects.add(gameObject);

    // Update method to animate the game object
    gameObject.update = function (time, delta) {
      this.sineOffset += delta * 0.001; // Adjust speed here
      this.y = this.initialY + Math.sin(this.sineOffset) * 40; // Adjust amplitude here
    };

    return gameObject;
  }

  update() {
    if (this.subtitleText.visible) {
      // Position the text above the player
      const player = this.scene.player.sprite;
      this.subtitleText.setPosition(player.x, player.y + 200); // Adjust the Y offset as needed
    }
  }

  setupCollisionEvents() {
    this.scene.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      if (this.isCinematicPlaying) {
        return;
      }

      // Determine the collided object (which is not the player)
      let other =
        bodyA.gameObject === this.scene.player.sprite
          ? bodyB.gameObject
          : bodyA.gameObject;
      if (other) {
        this.collidedObject = other; // Store the reference to the collided object
        if (!other.frame || other.frame.texture.key !== "wall") {
          // Make the collided object passable immediately after collision
          if (this.collidedObject.setCollisionCategory) {
            this.collidedObject.setCollisionCategory(0);
          }
          // Retrieve the current clip
          const currentClip = this.cinematicsData[this.currentCinematicIndex];
          if (currentClip && currentClip.actions === "phonepick") {
            this.executeAction("phonepick");
          }

          this.playCinematic();
        }
      }
    });
  }

  addLineBreaks(str, n) {
    const words = str.split(" ");
    let currentLine = "";
    let formattedText = "";

    words.forEach((word) => {
      if ((currentLine + word).length > n) {
        formattedText += currentLine.trim() + "\n";
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    });

    return formattedText + currentLine.trim();
  }
  playCinematic() {
    if (this.currentCinematicIndex >= this.cinematicsData.length) {
      return;
    }

    const currentClip = this.cinematicsData[this.currentCinematicIndex];
    let volume = currentClip.speaker === "Pi" ? 0.5 : 1;
    let audio = this.scene.sound.add(currentClip.key, {
      volume: volume,
      loop: false,
    });
    audio.play();

    // Display subtitles for both Pi and the client
    const formattedSubtitle = this.addLineBreaks(currentClip.subtitle, 60);
    this.subtitleText.setText(formattedSubtitle);
    this.subtitleText.setVisible(true);

    audio.on("complete", () => {
      // Retrieve the current clip
      const currentClip = this.cinematicsData[this.currentCinematicIndex];
      // Check if there is an action associated with the current clip and execute it
      if (currentClip.actions && currentClip.actions !== "phonepick") {
        this.executeAction(currentClip.actions);
      }

      // Hide the subtitle text after the audio clip is finished
      this.subtitleText.setVisible(false);
      if (currentClip.speaker === "Pi") {
        this.subtitleText.setVisible(false);
      }

      if (
        currentClip.actions !== "clientResponse" &&
        this.currentCinematicIndex + 1 < this.cinematicsData.length &&
        this.cinematicsData[this.currentCinematicIndex + 1].speaker === "Client"
      ) {
        // If the next clip is the client speaking, play it automatically
        this.currentCinematicIndex++;
        this.playCinematic();
      } else {
        this.isCinematicPlaying = false;
        this.currentCinematicIndex++;

        if (this.collidedObject && this.collidedObject.destroy) {
          this.collidedObject.destroy();
          this.collidedObject = null;

          // Logic for spawning new object after collision

          // Randomize the offset between 2000 and 4000
          let randomOffset = Phaser.Math.Between(2000, 3000);
          let newX =
            this.player.sprite.x +
            (this.lastSpawnSide === "left" ? randomOffset : -randomOffset);
          this.lastSpawnSide = this.lastSpawnSide === "left" ? "right" : "left"; // Alternate the side

          // Ensure newX is within the specified range
          newX = Math.max(100, Math.min(newX, 7900));

          // Spawn a new object
          this.ConvoSpawn(newX, 700, "convoIcon", "", true, false, 0.5);
        }
      }

      if (this.currentCinematicIndex >= this.cinematicsData.length) {
        console.log("Done");
        if (this.scene instanceof Example) {
          this.scene.gotoMain();
        }
         
      }
    });
  }
}
