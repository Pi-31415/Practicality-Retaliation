class Prologue extends Phaser.Scene {
    constructor() {
        super({ key: 'Prologue' });
    }

    preload() {
        // Load Audio
        this.load.audio(
            "prologueaudio",
            "https://intro-to-im.vercel.app/API/assets/prologue.mp3"
        );
        // Load Overlays
        this.load.image(
            "guitar",
            "https://intro-to-im.vercel.app/API/assets/instruction.png"
        );
    }

    create() {
        // Set black background
        this.cameras.main.setBackgroundColor('#000000');

        // Display text centered on the screen
       // Display text centered on the screen
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let originalText = "Name's Pi. Some call me a tech mercenary...others...the devil's engineer. Some live by the code...some die by it.\n\nMe? I rewrite it.\n\nIn this city, every shadow's for sale, and every dream's got a price tag.\n\nThis story...my story. It's about the dazzle of lights and the shadows they cast.";
        let wrappedText = this.wrapText(originalText, 100); // 50 characters per line
        let text = this.add.text(width / 2, height / 2, wrappedText, { font: '30px Arial', fill: '#ffffff', align: 'center' });
        text.setOrigin(0.5, 0.5);

        

        // Play audio
    let audio = this.sound.add("prologueaudio");
    audio.play({ volume: 2, loop: false });

    // Show image and additional text when audio completes
    audio.on('complete', function() {
        console.log("Audio Completed");
        let billboard = this.add.image(width / 2, height / 2 - 100, "guitar");
    }, this); // 'this' binds the context to the scene


        // Input listener for the space bar
        this.input.keyboard.on('keydown-SPACE', () => {
            this.sound.stopAll();  // Stop all sounds
            this.scene.start("Preloader");  // Replace "NextScene" with the key of the next scene
        });
    }
  
   wrapText(text, maxLineLength) {
        const words = text.split(' ');
        let wrappedText = '';
        let currentLine = '';

        for (const word of words) {
            if ((currentLine + word).length < maxLineLength) {
                currentLine += word + ' ';
            } else {
                wrappedText += currentLine + '\n';
                currentLine = word + ' ';
            }
        }

        return wrappedText + currentLine; // Add the last line
    }
}
class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        // Load the background image
        this.load.image("mainmenu", "https://intro-to-im.vercel.app/API/assets/bg.png");
    }

  
  changeColorToGreen() {
        this.indicator.fillColor = 0x00ff00;
    }

    changeColorToBlack() {
        this.indicator.fillColor = 0x000000;
    }
    create() {
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        // Create and position the background image
        let bg = this.add.image(0, 0, "mainmenu").setOrigin(0, 0);
        bg.displayWidth = width;  // make the image fill the width
        let scale = width / bg.width;
        bg.displayHeight = bg.height * scale;  // scale the height to maintain aspect ratio

       // Create a small black rectangle in the bottom right corner
        this.indicator = this.add.rectangle(width - 20, height - 20, 10, 10, 0x000000).setOrigin(1, 1);

        // Define the arrow keys
        this.leftArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Change color to green when an arrow key is pressed
        this.leftArrow.on('down', this.changeColorToGreen, this);
        this.rightArrow.on('down', this.changeColorToGreen, this);

        // Change color back to black when the key is released
        this.leftArrow.on('up', this.changeColorToBlack, this);
        this.rightArrow.on('up', this.changeColorToBlack, this);
        // Create the button using graphics
        let button = this.add.graphics();
        button.lineStyle(2, 0xffffff, 1); // Red border
        button.strokeRect(width / 2 - 200, height / 2 - 25, 400, 50); // x, y, width, height

        // Make the button interactive
        button.setInteractive(new Phaser.Geom.Rectangle(width / 2 - 100, height / 2 - 25, 200, 50), Phaser.Geom.Rectangle.Contains);

        // Add a click event listener to the button
        button.on('pointerdown', () => {
            this.scene.start('Prologue'); // Start the Prologue scene
        });

        // Add text to the button
        let buttonText = this.add.text(width / 2, height / 2, 'BEGIN STORY', { font: '40px Arial', fill: '#ffffff' }) // Red text
            .setOrigin(0.5, 0.5);

        // Optionally, change the button appearance on hover
        button.on('pointerover', () => buttonText.setFill('#33afb8'));
        button.on('pointerout', () => buttonText.setFill('#33afb8'));
    }
}

