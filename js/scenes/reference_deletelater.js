import button from '../objects/button.js'

var goblin
let skins = ['goblin', 'goblingirl']
let attachments = ['spear', 'dagger', null]
let animations = ['walk', 'idle']

class TemplateScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TemplateScene' })
  }

  preload() {
    /*this.load.image('skin', 'btn/skin.png');
    this.load.image('animation', 'btn/animation.png');
    this.load.image('attachment', 'btn/attachment.png');*/
/*
    this.load.setPath('spine/');
    this.load.spine('goblin', 'Lin_Cover.json', 'Lin_Cover.atlas');
    this.load.image('bg', 'mainmenu_bg.jpg');
    this.load.image('light', 'sunlight.png');
    */
  }

  create() {

    this.input.setDefaultCursor('url(spine/cursor.cur), pointer');

    /*
    const getAttachments = () => {
      return goblin.skeleton.skin.attachments
    }

    const getSlots = () => {
      return goblin.skeleton.slots
    }

    const setAttachment = (slotName, attachmentName) => {
      goblin.skeleton.setAttachment(slotName, attachmentName)
    }

    const setSkin = skinName => {
      goblin.setSkin(null)
      goblin.setSkinByName(skinName)
    }
*/
    /*const setAnimation = (animation, loop = false) => {
      goblin.play(animation, loop)
    }*/
    /*
        // add buttons
        button(this, 120, 50, 'skin', () => {
          let index = (goblin.customParams.skin += 1)
          let skin = skins[index % skins.length]
          setSkin(skin)
        })*/
      //  this.add.image(960, 540, 'bg');
  /* button(this, 360, 50, 'animation', () => {
      //let index = (goblin.customParams.animation += 1)
      //let animation = animations[index % animations.length]
      var goblin2 = this.add.spine(1000, 1080, 'goblin', 'idle', true);
      //setAnimation(animation, true)
    })/*
    button(this, 600, 50, 'attachment', () => {
      let index = (goblin.customParams.attachment += 1)
      let slot = 'left hand item'
      let attachment = attachments[index % attachments.length]
      setAttachment(slot, attachment)
    })
*/
   
    // add the goblin
   /* goblin = this.add.spine(950, 1080, 'goblin', 'idle', true);
    goblin.scaleX = 0.37;
    goblin.scaleY = 0.37;
*/
    /*goblin.customParams = {
      skin: 0,
      animation: 0,
      attachment: 0
    }*/
    //setSkin('goblin')
    //goblin.setMix('walk', 'idle', 0.3)
    //goblin.setMix('idle', 'walk', 0.3)

    // remove dagger in right hand
    //setAttachment('right hand item', null)

    //console.log('Attachments: ', getAttachments())
    //console.log('Slots: ', getSlots())

    //  Enable lights and set a dark ambient color

    //let sprite = this.matter.add.sprite(this.cameras.main.width / 2, 0, 'skin');
    
    //this.mainmenu_sun_ray = this.add.image(960, 540, 'light');
    //this.mainmenu_sun_ray.setBlendMode(Phaser.BlendModes.SCREEN);
  }
}

export default MainScene
