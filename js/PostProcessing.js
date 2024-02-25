class PostProcessing {
  constructor(scene, overlayType, texture, videoKey, blendMode = 'SCREEN') {
    this.scene = scene;
    this.overlayType = overlayType;
    this.texture = texture;
    this.videoKey = videoKey;
    this.blendMode = blendMode;

    if (this.overlayType === 'image') {
      // Create the image overlay and set its blend mode
      this.overlay = this.scene.add.image(0, 0, this.texture).setOrigin(0, 0);
      this.overlay.setBlendMode(Phaser.BlendModes[this.blendMode]);
      this.overlay.setDepth(10000); // Ensure it's on top of everything
    } else if (this.overlayType === 'video') {
      // Create the video overlay and set its blend mode
      this.overlay = this.scene.add.video(0, 0, this.videoKey).setOrigin(0, 0);
      this.overlay.setBlendMode(Phaser.BlendModes[this.blendMode]);
      this.overlay.setDepth(10000); // Ensure it's on top of everything
      this.overlay.play(true); // Loop the video
    }
  }

  // Method to enable or disable the overlay
  setOverlayVisibility(visible) {
    this.overlay.setVisible(visible);
  }
}
