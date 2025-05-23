// endboss.class.js

class Endboss extends MovableObject {
  offset = {
    top: 108,
    bottom: 68,
    left: 52,
    right: 52,
  };

  frameDelay = {
    dead: 7,
    hurt: 3,
    alert: 9,
    attack: 9,
    walking: 5,
    intro1: 10,
  };

  world;
  y = 145;
  width = 300;
  height = 300;
  speed = 7;
  attackStart = 0;
  switchDirectionStart = 0;
  ran = 0;
  health = 200;
  damage = 50;

  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  // IMAGES_INTRO = [
  //   "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
  //   "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
  //   "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
  //   "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
  //   "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
  //   "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
  //   "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
  //   "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
  //   "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
  //   "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
  //   "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  // ];

  IMAGES_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    // this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3800;
  }

  setWorld(world) {
    this.world = world;
  }

  animate() {
    setStoppableInterval(() => {
      // if (paused) return;

      this.updateState();

      switch (this.currentState) {
        case "dead":
          this.handleDead();
          break;
        case "intro":
          this.handleIntro();
          break;
        case "hurt":
          this.handleHurt();
          break;
        case "attack":
          this.handleAttack();
          break;
        case "alert":
          this.handleAlert();
          break;
        case "walking":
          this.handleWalking();
          break;
      }
    }, 1000 / 30);
  }

  handleDead() {
    if (this.currentState === "dead") {
      if (this.currentImage < this.IMAGES_DEAD.length) {
        if (this.skipFrame % this.frameDelay.dead === 0) {
          this.playAnimation(this.IMAGES_DEAD);
          SoundManager.playOne(SoundManager.BOSS_HURT, 1, 0.3, 10000);
          SoundManager.playOne(SoundManager.BOSS_DEAD, 1, 0.4, 10000);
        }
      } else {
        this.img = this.imageCache["assets/img/4_enemie_boss_chicken/5_dead/G26.png"];
        this.disableHitbox();
      }
      this.skipFrame += 1;
    }
  }

  handleIntro() {
    let timePassed = new Date().getTime() - this.introStart;
    timePassed = timePassed / 1000;

    if (timePassed < 1.8) {
      if (this.skipFrame % this.frameDelay.intro1 === 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      this.skipFrame += 1;

      this.moveLeft();
    }

    if (timePassed >= 1.8 && timePassed < 2.5) {
      if (this.skipFrame % this.frameDelay.alert === 0) {
        this.playAnimation(this.IMAGES_ALERT);
      }
      this.skipFrame += 1;
    }
  }

  handleHurt() {
    if (this.currentState === "hurt") {
      if (this.skipFrame % this.frameDelay.hurt === 0) {
        this.playAnimation(this.IMAGES_HURT);
      }
      this.skipFrame += 1;
      SoundManager.playOne(SoundManager.BOSS_HURT, 1, 0.3, 1000);

    }
  }

  handleAttack() {
    let timePassed = new Date().getTime() - this.attackStart;
    timePassed = timePassed / 1000;
    if (timePassed < 2.5) {
      if (this.skipFrame % this.frameDelay.attack === 0) {
        this.playAnimation(this.IMAGES_ATTACK);
      }
      this.skipFrame += 1;
      if (timePassed >= 1 && timePassed < 2.5) {
        this.speed = 6;
        SoundManager.playOne(SoundManager.BOSS_ATTACK, 1, 0.3, 2000);
        this.moveLeft();
      }
    } else {
      this.moveRight();
      if (this.skipFrame % this.frameDelay.attack === 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      this.skipFrame += 1;
    }
  }

  handleAlert() {
    if (this.skipFrame % this.frameDelay.alert === 0) {
      this.playAnimation(this.IMAGES_ALERT);
    }
    this.skipFrame += 1;
  }

  handleWalking() {
    if (this.skipFrame % this.frameDelay.walking === 0) {
      this.playAnimation(this.IMAGES_WALKING);
    }
    this.skipFrame += 1;

    let timePassed = new Date().getTime() - this.switchDirectionStart;
    timePassed = timePassed / 1000;

    if (timePassed > 2) {
      this.ran = Math.random();
      this.switchDirectionStart = new Date().getTime();
    }

    if (this.ran < 0.3 && this.x > 1500) {
      this.speed = 4;
      this.moveLeft();
    }

    if (this.ran > 0.3 && this.x < this.world.level.level_end_x) {
      this.speed = 2;
      this.moveRight();
    }
  }

  updateState() {
    let newState;

    if (this.isDead()) {
      newState = "dead";
    } else if (this.world.isPlayingIntro()) {
      newState = "intro";
    } else if (this.isHurt()) {
      newState = "hurt";
    } else if (this.world.isCloseToCharacter(this, 300)) {
      newState = "attack";
    } else if (this.world.isCloseToCharacter(this, 40)) {
      newState = "walking";
    } else {
      newState = "alert";
    }

    if (newState !== this.currentState) {
      this.resetCurrentImage();
      this.resetSkipFrame();
      if (newState === "attack") {
        this.attackStart = new Date().getTime();
      }
      if (newState === "intro") {
        this.introStart = new Date().getTime();
      }
    }

    this.currentState = newState;
  }
}
