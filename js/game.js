import Preloader from './scenes/Preloader.js'
import MainMenu from './scenes/MainMenu.js'

const config = {
  type: Phaser.WEBGL,
  backgroundColor: '#000000',
  pixelart: false,
  antialias: true,
  autoFocus: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    parent: 'phaser-example'
  },
  physics: {
		default: 'matter',
		matter: {
			enableSleeping: true,
			gravity: {
				y: 2
			},
			debug: {
				showBody: true,
				showStaticBody: true
			}
		}
	},
  plugins: {
    scene: [
      {
        key: 'SpinePlugin',
        plugin: window.SpinePlugin,
        sceneKey: 'spine'
      }
    ]
  },
  scene: [Preloader,MainMenu]
}

window.addEventListener('load', () => {
  new Phaser.Game(config);
})
