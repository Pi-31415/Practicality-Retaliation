import button from '../objects/button.js'

class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Preloader' })
    }

    preload() {

    }

    create() {
        print_scene("Preloader");
        this.game.sound.stopAll(); //Stops all Music
        preload_complete();

    }

    update() {

    }
}

export default Preloader
