class BackgroundMusicManager {
 constructor(scene, key, volumeFadeDuration, keyHoldDuration) {
        this.scene = scene;
        this.defaultKey = key; // Key for the normal mode
        this.attackModeKey = "credits"; // Key for the attack mode
        this.volumeFadeDuration = volumeFadeDuration;
        this.keyHoldDuration = keyHoldDuration;
        this.music = null;
        this.isFading = false;
        this.keyHoldTimer = null;
        this.isAttackMode = false;
    }
   setAttackMode(isAttacking) {
        this.isAttackMode = isAttacking;
        if (isAttacking) {
            this.switchTrack(this.attackModeKey, 0.07); // Attack mode music
        } else {
            this.switchTrack(this.defaultKey, 0.6); // Normal mode music
        }
    }
  
   switchTrack(newKey, volume) {
        if (this.music) {
            this.music.stop();
        }
        this.music = this.scene.sound.add(newKey, { volume: volume, loop: true });
        this.music.play();
    }
  
  create() {
        this.switchTrack(this.defaultKey, 0); // Start with default music at volume 0
    }

  create() {
    this.music = this.scene.sound.add(this.defaultKey, { volume: 0, loop: true });
    this.music.play();
  }
  update(cursors) {
    if (this.isAttackMode) {
      // Do not change volume in attack mode
      return;
    }
    if (cursors.left.isDown || cursors.right.isDown) {
      if (!this.keyHoldTimer) {
        this.keyHoldTimer = this.scene.time.addEvent({
          delay: this.keyHoldDuration,
          callback: () => {
            this.fadeVolume(0.6); // Fade to max volume
          },
          loop: false,
        });
      }
    } else {
      if (this.keyHoldTimer) {
        this.keyHoldTimer.remove(false);
        this.keyHoldTimer = null;
      }
      this.fadeVolume(0); // Fade to min volume
    }
  }

  fadeVolume(targetVolume) {
    if (this.isFading || this.music.volume === targetVolume) return;

    this.isFading = true;
    this.scene.tweens.add({
      targets: this.music,
      volume: targetVolume,
      duration: this.volumeFadeDuration,
      onComplete: () => {
        this.isFading = false;
      },
    });
  }
}

class AmbienceBackground {
  constructor(scene, audioKey, volume = 3) {
    this.scene = scene;
    this.audioKey = audioKey;
    this.volume = volume;
    this.music = null;
  }

  create() {
    // Add and play the music
    this.music = this.scene.sound.add(this.audioKey, {
      volume: this.volume,
      loop: true,
    });
    this.music.play();
  }

  setVolume(newVolume) {
    this.volume = newVolume;
    if (this.music) {
      this.music.setVolume(this.volume);
    }
  }
}
