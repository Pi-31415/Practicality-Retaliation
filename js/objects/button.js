const button = (scene, x, y, texture,UI_depth, text_UI, font_size, UI_texture_scale, cursive, cb) => {

  var font_family = 'Tangerine_Regular';
  if (cursive) {
    font_family = 'MonsieurLaDoulaise-Regular';
  }

  const UI_texture = scene.add
    .image(x, y, texture)
    .setInteractive();

  UI_texture.scale = UI_texture_scale;

  const UI_Text = scene.add.text(x, y, text_UI, { font: font_size + 'px ' + font_family, fill: '#522f00' }).setScrollFactor(0);
  UI_Text.x = (x - (UI_Text.width / 2));
  UI_Text.y = (y - (UI_Text.height / 2));
  UI_texture.depth = UI_depth;
  UI_Text.depth = UI_depth+1;

  UI_texture.on('pointerover', function () {
    scene.sound.add('button_hover').play();
    UI_texture.scale = UI_texture_scale + 0.03;
    UI_Text.scale = 1.03;
  }, this);

  UI_texture.on('pointerout', function () {
    UI_texture.scale = UI_texture_scale;
    UI_Text.scale = 1.0;
  }, this);

  UI_texture.on('pointerdown', () => {
    scene.sound.add('button_click').play();
    UI_texture.destroy();
    UI_Text.destroy();
    cb();
  });

  function destroy(){
    UI_texture.destroy();
    UI_Text.destroy();
  }


}

export default button
