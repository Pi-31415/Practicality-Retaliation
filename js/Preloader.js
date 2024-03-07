const cinematicsData = [
  {
    id: "every_corner",
    key: "Every_corner_of_this_city",
    filename: "Every_corner_of_this_city.mp3",
    speaker: "Pi",
    subtitle: "Every corner of this city screams opportunity... for those who know where to look.",
    actions: "phonecall"
  },
  
  {
    id: "youve_got_pi",
    key: "Youve_got_PiMake_it_quick",
    filename: "Youve_got_PiMake_it_quick.mp3",
    speaker: "Pi",
    subtitle: "You've got Pi...Make it quick.",
    actions: "phonepick"
  },
  {
    id: "pi_watched",
    key: "PiIve_watched_youYour_reputation_precedes",
    filename: "PiIve_watched_youYour_reputation_precedes.mp3",
    speaker: "Client",
    subtitle: "Pi...I've watched you...Your reputation precedes you...I require someone with your...exceptional talents.",
    actions: ""
  },
  {
    id: "talk_is_cheap",
    key: "Talk_is_cheapWhats_the_job",
    filename: "Talk_is_cheapWhats_the_job.mp3",
    speaker: "Pi",
    subtitle: "Talk is cheap...What's the job?",
    actions: ""
  },
  {
    id: "a_new_frontier",
    key: "A_new_frontier_Pi_Braincontrolled",
    filename: "A_new_frontier_Pi_Braincontrolled.mp3",
    speaker: "Client",
    subtitle: "A new frontier, Pi. Brain-controlled robotics. I need you to assess the viability using current tech. And if possible, execute it.",
    actions: ""
  },
  {
    id: "asking_for_miracles",
    key: "Youre_asking_for_miracles",
    filename: "Youre_asking_for_miracles.mp3",
    speaker: "Pi",
    subtitle: "You're asking for miracles. Alright, you have my attention. But let's talk numbers. You want top-tier tech? That comes with a top-tier price.",
    actions: ""
  },
  {
    id: "we_are_prepared",
    key: "Understandable_We_are_prepared_to",
    filename: "Understandable_We_are_prepared_to.mp3",
    speaker: "Client",
    subtitle: "Understandable. We are prepared to offer you 500,000 credits, upon successful completion.",
    actions: ""
  },
  {
    id: "five_hundred_k",
    key: "Five_hundred_K_For_a",
    filename: "Five_hundred_K_For_a.mp3",
    speaker: "Pi",
    subtitle: "Five hundred K? For a brain-machine interface breakthrough? We're talking about cutting-edge brain tech here. I won't start the engines for less than a million.",
    actions: ""
  },
  {
    id: "six_hundred_k",
    key: "600000_And_thats_stretching_our",
    filename: "600000_And_thats_stretching_our.mp3",
    speaker: "Client",
    subtitle: "600,000. And that's stretching our generosity.",
    actions: ""
  },
  {
    id: "insulting_both",
    key: "Now_youre_just_insulting_both",
    filename: "Now_youre_just_insulting_both.mp3",
    speaker: "Pi",
    subtitle: "Now you're just insulting both of us. Let's cut to the chase. I want 1.5 million, plus expenses. And I get full autonomy on the project. No oversight.",
    actions: ""
  },
  {
    id: "final_offer",
    key: "This_is_my_final_offer",
    filename: "15_is_out_of_the.mp3",
    speaker: "Client",
    subtitle: "1.5 is... out of the question. 800,000. Final offer. And we require regular updates.",
    actions: ""
  },
  {
    id: "no_deal_then",
    key: "No_deal_thenA_cave_and",
    filename: "No_deal_thenA_cave_and.mp3",
    speaker: "Pi",
    subtitle: "No deal then...A cave and a pile of scraps was enough to make history. I'm making the future!",
    actions: ""
  },
  {
    id: "dont_want_to_cross",
    key: "You_dont_want_to_cross",
    filename: "You_dont_want_to_cross.mp3",
    speaker: "Client",
    subtitle: "You don't want to cross me, Pi. If we cannot have you, nobody will.",
    actions: "attack"
  },
  {
    id: "dance_you_want",
    key: "So_its_a_dance_you",
    filename: "So_its_a_dance_you.mp3",
    speaker: "Pi",
    subtitle: "So it's a dance you want.",
    actions: ""
  },
  {
    id: "come_on_rust_buckets",
    key: "Come_on_you_rust_buckets",
    filename: "Come_on_you_rust_buckets.mp3",
    speaker: "Pi",
    subtitle: "Come on, you rust buckets! Show me what you've got!",
    actions: "disableattack"
  },
  {
    id: "not_today",
    key: "Not_todaynot_ever",
    filename: "Not_todaynot_ever.mp3",
    speaker: "Pi",
    subtitle: "Not today...not ever.",
    actions: ""
  },
  {
    id: "city_is_mine",
    key: "This_city_is_mine",
    filename: "This_city_is_mine.mp3",
    speaker: "Pi",
    subtitle: "This city... is mine.",
    actions: "gotocredits"
  }
];


class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    print_scene("Preloader");
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });

    loadingText.setOrigin(0.5, 0.5);
    //Load Subtitles
    //Load Audio
    this.load.audio(
      "1",
      "https://intro-to-im.vercel.app/API/assets/1.mp3"
    );
    
    //Load all dialogues
    cinematicsData.forEach(clip => {
      this.load.audio(
        clip.key,
        `https://intro-to-im.vercel.app/API/assets/audio/${clip.filename}`
      );
    });

    
    //Load Audio
    this.load.audio(
      "prologue",
      "https://intro-to-im.vercel.app/API/prologue.mp3"
    );
    this.load.audio(
      "bgmusic",
      "https://intro-to-im.vercel.app/API/MidwestLotusCyberpunkLoop.mp3"
    );
    this.load.audio(
      "Cityambience",
      "https://intro-to-im.vercel.app/API/assets/ambience.mp3"
    );
    this.load.audio(
      "nokia",
      "https://intro-to-im.vercel.app/API/assets/nokia.mp3"
    );
    this.load.audio(
      "credits",
      "https://intro-to-im.vercel.app/API/assets/MidwestLotusCyberpunkMetal.mp3"
    );
      this.load.audio(
      "lasersound",
      "https://intro-to-im.vercel.app/API/assets/laser.mp3"
    );
    
    //Load Overlays
    this.load.image(
      "billboard",
      "https://intro-to-im.vercel.app/API/assets/darkoboard.png"
    );
    //Load Overlays
    this.load.image(
      "sunrays",
      "https://intro-to-im.vercel.app/API/assets/sunrays.png"
    );
    this.load.image(
      "blueParticle",
      "https://intro-to-im.vercel.app/API/assets/blue.png"
    );
     this.load.image(
      "redParticle",
      "https://intro-to-im.vercel.app/API/assets/red.png"
    );
    this.load.image(
      "monitor",
      "https://intro-to-im.vercel.app/API/assets/monitor.png"
    );
    this.load.image(
      "obstacle",
      "https://intro-to-im.vercel.app/API/assets/obstacle.png"
    );
    
    //Load Backgrounds
    this.load.image(
      "ForestBackground",
      "https://intro-to-im.vercel.app/API/assets/cyberBack.jpg"
    );
    this.load.image(
      "ForestMidground",
      "https://intro-to-im.vercel.app/API/assets/cyberMid.png"
    );
    
     this.load.image(
      "convoIcon",
      "https://intro-to-im.vercel.app/API/assets/convo.png"
    );
    
    this.load.image(
      "ForestForeground",
      "https://intro-to-im.vercel.app/API/assets/fore.png"
    );
    //Load The Props
    this.load.image(
      "robot",
      "https://intro-to-im.vercel.app/API/robot.png"
    );
     this.load.image(
      "wall",
      "https://intro-to-im.vercel.app/API/assets/wall.png"
    );
    this.load.image(
      "car",
      "https://intro-to-im.vercel.app/API/assets/car1.png"
    );
    
    this.load.image(
      "allyDrone",
      "https://intro-to-im.vercel.app/API/assets/allyDrone.png"
    );
    // Initialize your TextureAtlasLoader here
    this.atlasLoader = new TextureAtlasLoader(this);
    // Load the atlas using the loader
    this.atlasLoader.loadAtlas(
      "pi",
      "https://intro-to-im.vercel.app/API/assets/pi-0.png",
      "https://intro-to-im.vercel.app/API/assets/pi.json"
    );
    this.atlasLoader.loadAtlas(
      "enemydroid",
      "https://intro-to-im.vercel.app/API/assets/enemydroid-0.png",
      "https://intro-to-im.vercel.app/API/assets/enemydroid.json"
    );

    let overallProgress = 0; // Variable to keep track of overall progress

    this.load.on("progress", (value) => {
      overallProgress = value; // Update the overall progress
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 160, height / 2 - 25, 320 * value, 50);
    });

    this.load.on("fileprogress", (file) => {
      loadingText.setText(
        `Loading: ${file.key} (${Math.round(overallProgress * 100)}%)`
      );
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      // Start the Example scene and pass the TextureAtlasLoader
      this.scene.start("Example", { atlasLoader: this.atlasLoader });
    });
  }
}
