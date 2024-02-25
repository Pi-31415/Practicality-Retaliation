import button from '../objects/button.js'

/* 
To use this template, change 3 names of Template Scene in class, super and finally export at bottom
Also change print_scene name
*/

class TemplateScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TemplateScene' })
  }

  preload() {

  }

  create() {
    print_scene("TemplateScene");
    this.game.sound.stopAll(); //Stops all Music

    
  }
}

export default TemplateScene
