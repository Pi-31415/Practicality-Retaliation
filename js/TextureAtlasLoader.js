class TextureAtlasLoader {
  constructor(scene) {
    this.scene = scene;
  }

  loadAtlas(key, textureURL, atlasURL) {
    this.scene.load.atlas(key, textureURL, atlasURL);
  }

  createAnimation(key, atlasKey, animationDetails) {
    const frameNames = this.scene.anims.generateFrameNames(atlasKey, {
      start: animationDetails.start,
      end: animationDetails.end,
      zeroPad: animationDetails.zeroPad,
      prefix: animationDetails.prefix,
      suffix: animationDetails.suffix,
    });

    this.scene.anims.create({
      key: key,
      frames: frameNames,
      frameRate: animationDetails.frameRate,
      repeat: animationDetails.repeat,
    });
  }
}
