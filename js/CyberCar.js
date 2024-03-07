class CyberCar extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed, scale) {
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.speed = speed; // Speed of the car
        this.scale = scale; // Size of the car

        // Set initial properties
        this.setOrigin(0.5, 0.5).setScale(this.scale);
        this.scene.add.existing(this); // Add to the scene

        // Determine movement direction
        this.movementDirection = Math.random() < 0.5 ? 1 : -1;
        if (this.movementDirection === -1) {
            this.flipX = true; // Flip horizontally if moving left
        }

        // Particle system for thruster
        this.createThrusterParticles();
    }

    createThrusterParticles() {
        const particles = this.scene.add.particles('blueParticle'); // Assume 'blueParticle' is a small blue circle

        this.particleEmitter = particles.createEmitter({
            speed: this.speed,
            scale: { start:  this.scale*5, end: 0 },
            blendMode: 'ADD',
            lifespan: 2000,
            on: false // Initially off, will be controlled in update
        });

           // Position the emitter at the center of the car
    this.particleEmitter.startFollow(this);

    }

    update() {
        // Move the car
        this.x += this.speed * this.movementDirection;

        // Emit particles
        if(this.active) {
            this.particleEmitter.on = true;
            this.particleEmitter.setAngle({ min: this.movementDirection === 1 ? 180 : 0, max: this.movementDirection === 1 ? 180 : 360 });
        }

        // Check if the car goes off-screen and reset its position
        if ((this.movementDirection === 1 && this.x > 15088) ||
            (this.movementDirection === -1 && this.x < 0)) {
            this.x = this.movementDirection === 1 ? -this.width : 15088 + this.width;
            this.particleEmitter.on = false; // Turn off emitter when off-screen
        }
    }
}

//Cyberpunk TV Class
class CyberpupnkTV {
    constructor(scene, x, y, texture, videoScale) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.videoScale = videoScale;
        this.video = this.scene.add.video(this.x, this.y).setVisible(false);

        // Configure the webcam stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                this.video.loadMediaStream(stream, true);
                this.video.play();
            })
            .catch((err) => {
                console.error(`Error: ${err}`);
            });

        this.video.on('created', () => {
            this.video.setDisplaySize(this.videoScale.width, this.videoScale.height).setVisible(true);
        });

        // Add TV frame (if any) on top of the video
        if (this.texture) {
            this.scene.add.image(this.x, this.y, this.texture);
        }
    }

    // Method to resize video and TV frame
    resize(scale) {
        this.video.setDisplaySize(this.videoScale.width * scale, this.videoScale.height * scale);
        if (this.texture) {
            this.scene.add.image(this.x * scale, this.y * scale, this.texture).setScale(scale);
        }
    }
}
