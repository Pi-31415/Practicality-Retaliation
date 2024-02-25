class Example extends Phaser.Scene {
  constructor() {
        super("Example");
    }
   init(data) {
        // Retrieve the TextureAtlasLoader
        this.atlasLoader = data.atlasLoader;
    }
  create() {
    print_scene("Example");
    // Create the background
    this.background = new Background(this, ["ForestBackground","ForestMidground","ForestForeground"]);

     // Now you can pass the atlasLoader to the Player
        this.player = new Player(this, DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2+70, "pi", "idle/Image Sequence_018_0109", this.atlasLoader);
    
    this.player.setTint(0xff0000); // Red tint
this.player.setBrightness(1.0); // Adjsut brightness
     // Create cursor keys for input
     this.cursors = this.input.keyboard.createCursorKeys();
    
     // Create the post processing overlay
     //this.postProcessing = new PostProcessing(this, 'video', null, 'sunrays');
     this.postProcessing = new PostProcessing(this, 'image', 'sunrays', null);
  }

   update(time, delta) {
    this.player.update();
     // Update the background if it has any dynamic behavior
      this.background.update(this.cursors,this.player.getSpeed());
   }
}
