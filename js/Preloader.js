class Preloader extends Phaser.Scene {
    constructor() {
        super("Preloader");
    }

    preload() {
        print_scene("Preloader");
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        //Load Overlays
      this.load.image("sunrays", "https://intro-to-im.vercel.app/API/assets/sunrays.png");
        //Load Backgrounds
        this.load.image("ForestBackground", "https://intro-to-im.vercel.app/API/assets/forest-bg.png");
      this.load.image("ForestMidground", "https://intro-to-im.vercel.app/API/assets/forest-fg.png");
      this.load.image("ForestForeground", "https://intro-to-im.vercel.app/API/assets/forest-acc.png");
        // Initialize your TextureAtlasLoader here
        this.atlasLoader = new TextureAtlasLoader(this);
        // Load the atlas using the loader
        this.atlasLoader.loadAtlas("pi", "https://intro-to-im.vercel.app/API/assets/pi-0.png", "https://intro-to-im.vercel.app/API/assets/pi.json");
      

        let overallProgress = 0; // Variable to keep track of overall progress

        this.load.on('progress', (value) => {
            overallProgress = value; // Update the overall progress
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect((width / 2) - 160, (height / 2) - 25, 320 * value, 50);
        });

        this.load.on('fileprogress', (file) => {
            loadingText.setText(`Loading: ${file.key} (${Math.round(overallProgress * 100)}%)`);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
             // Start the Example scene and pass the TextureAtlasLoader
        this.scene.start('Example', { atlasLoader: this.atlasLoader });
        });
    }
}
