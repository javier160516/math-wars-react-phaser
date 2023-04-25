import React, { useState, useEffect, useRef } from "react";
import Phaser, { GameObjects } from "phaser";
import { GameInstance, IonPhaser } from "@ion-phaser/react";
import "./Battle.css";
import scene1 from "./assets/scenes/scene1-Bg.jpeg";
import scene2 from "./assets/scenes/scene2-Bg.jpeg";
import scene3 from "./assets/scenes/Scene3_Bg.jpeg";
import Heart from "./assets/resources/heart.png";
import correct from "./assets/correct_a3.svg";
import wrong from "./assets/wrong_a2.svg";
import fighTrack from "./assets/music/fight1.ogg";
import mov from "./assets/soundeffects/mov.mp3";
import panel from "./assets/resources/panel.png";
import brawler from "./assets/characters/brawler.png"
import knight from './assets/characters/knight.png'
import ken from './assets/characters/spritesheet.png'
import exp from './assets/characters/explosion.png'
import { color } from "react-native-reanimated";

const randomScenes = (max) => {
  const random = Math.floor(Math.random() * max);
  return scenes[random];
};

const scenes = [scene1, scene2, scene3];

class BattleScene extends Phaser.Scene {
  preload() {
    this.load.image("correct", correct);
    this.load.image("wrong", wrong);
    this.load.audio("fightMusic", fighTrack);
    this.load.audio("mov", mov);
    this.load.image("background", randomScenes(3));
    this.load.image("Heart", Heart);
    this.load.image("Heart2", Heart);
    this.load.image("panel", panel);
    this.load.image("panel2", panel);
    this.load.spritesheet('brawler', brawler, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('knight', knight, { frameWidth: 95, frameHeight: 48 });
    this.load.spritesheet('ken', ken, { frameWidth: 140, frameHeight: 71 });
    this.load.spritesheet('exp', exp, { frameWidth: 65, frameHeight: 65 })
    // this.load.spritesheet('life', life, {frameWidth: 20, frameHeight: 20})
  }
  create() {
    let music = this.sound.add("fightMusic");
    let musicConfig = {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    music.play(musicConfig);

    let mov = this.sound.add("mov");
    let movSoundConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    mov.play(movSoundConfig);

    const movSound = document.querySelector(".battle_buttons");
    movSound?.addEventListener("pointerover", () => {
      mov.play();
    });

    let correctAnswer: GameObjects.Image;
    let wrongAnswer: GameObjects.Image;

    let answer = document.querySelector("#answer");
    answer?.addEventListener("click", () => {
      correctAnswer = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 3.5 - 80,
        "correct"
      );

      correctAnswer.displayHeight = 250;
      correctAnswer.displayWidth = 300;
    });

    let answer2 = document.querySelector("#answer2");
    answer2?.addEventListener("click", () => {
      wrongAnswer = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 3.5 - 80,
        "wrong"
      );

      wrongAnswer.displayHeight = 250;
      wrongAnswer.displayWidth = 250;
    });

    let bg = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "background"
      )
      .setOrigin(0.5, 0.5);
    bg.displayWidth = this.sys.canvas.width;
    bg.displayHeight = this.sys.canvas.height;
    //panel player 1
    let panel = this.add.image(
      this.cameras.main.width / 6.5,
      this.cameras.main.height / 3 - 150,
      "panel"
    );
    panel.displayWidth = 280;
    panel.displayHeight = 100;
    //pnael player 2
    let panel2 = this.add.image(
      this.cameras.main.width / 1.2,
      this.cameras.main.height / 3 - 150,
      "panel2"
    );
    panel2.displayWidth = 280;
    panel2.displayHeight = 100;
    //hearth image lifebar or heatlhbar
    let heart = this.add.image(
      this.cameras.main.width / 12,
      this.cameras.main.width / 3 - 430,
      "Heart"
    );
    heart.displayWidth = 35;
    heart.displayHeight = 35;
    //hearth image lifebar or heatlhbar
    let heart2 = this.add.image(
      this.cameras.main.width / 1.12,
      this.cameras.main.width / 3 - 430,
      "Heart"
    );
    heart2.displayWidth = 35;
    heart2.displayHeight = 35;
    //characters
    // const current = this.add.text(48, 460, 'Playing: walk', { color: '#00ff00' });

    // this.add.image(0, 0, 'brawler', '__BASE').setOrigin(0, 0);
    // target--------------------------------------------
    {
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [0, 1, 2, 3] }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [5, 6, 7, 8] }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'kick',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [10, 11, 12, 13, 10] }),
        frameRate: 8,
        repeat: -1,
        repeatDelay: 2000
      });

      this.anims.create({
        key: 'punch',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [15, 16, 17, 18, 17, 15] }),
        frameRate: 8,
        repeat: -1,
        repeatDelay: 2000
      });

      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [20, 21, 22, 23] }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'jumpkick',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [20, 21, 22, 23, 25, 23, 22, 21] }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'win',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [30, 31] }),
        frameRate: 8,
        repeat: -1,
        repeatDelay: 2000
      });

      this.anims.create({
        key: 'die',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [35, 36, 37] }),
        frameRate: 8,
      });

      const keys = ['walk', 'idle', 'kick', 'punch', 'jump', 'jumpkick', 'win', 'die'];
      const cody = this.add.sprite(200, 370).setFlip(true);
      cody.setInteractive();
      cody.setScale(4);
      cody.play('walk');

      let c = 0;
      // this.input.on('pointerup', function (pointer: any) {
      //   c++;
      //   if (c === keys.length) {
      //     c = 0;
      //   }
      //   cody.play(keys[c]);
      //   // current.setText('Playing: ' + keys[c]);
      // });
      // cody.on('pointerup', function(){
      //   c++;
      //   if (c === keys.length){
      //     c = 0;
      //   }
      //   cody.play(keys[c])
      // })

      let label = this.add.text(800, 600, 'Respuesta 1', { color: '#fafafa' })
      label.setInteractive();
      label.on('pointerup', function () {
        c++;
        if (c === keys.length) {
          c = 0;
        }
        cody.play(keys[c])
      })
      label.setColor("#92a8d1")
      label.setPadding(30);
      // labaelKen.width(300)
      label.setBackgroundColor("#ffffff")
      label.setOrigin(0.05);
      label.setStyle({ FillStyle: "#fefefe" })
    }
    

    //second character

    //"13,10,9,6,5,3,2,1"
    this.anims.create({
      key: 'ken1',
      frames: this.anims.generateFrameNumbers('ken', { frames: [0, 1, 3, 4, 5, 6] }),
      frameRate: 8,
      repeat: -1,
    })
    this.anims.create({
      key: 'ken2',
      frames: this.anims.generateFrameNumbers('ken', { frames: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }),
      frameRate: 10,
      repeat: -1
      // repeatDelay: 2000
    })
    const ken = this.add.sprite(900, 370);
    ken.setScale(4);
    ken.play('ken1');
    const keyA = ['ken1', 'ken2']

    const labaelKen = this.add.text(1000, 600, 'Respuesta 2', { color: "#fafafa" });
    labaelKen.setInteractive();
    labaelKen.on('pointerup', function () {
      k++;
      if (k === keyA.length) {
        k = 0;
      }
      ken.play(keyA[k]);
    })
    let k = 0;
    labaelKen.setColor("#92a8d1")
    labaelKen.setPadding(30);
    // labaelKen.width(300)
    labaelKen.setBackgroundColor("#ffffff")
    labaelKen.setOrigin(0.05);
    labaelKen.setStyle({ FillStyle: "#fefefe" })

    //button
    const answer3 = this.add.text(1200, 600, 'Respuesta 3', { color: "#fafafa" });
    answer3.setInteractive();
    answer3.on('pointerup', function(){
      console.log('answer 3');
    })
    answer3.setColor("#92a8d1")
    answer3.setPadding(30);
    // labaelKen.width(300)
    answer3.setBackgroundColor("#ffffff")
    answer3.setOrigin(0.05);
    answer3.setStyle({ FillStyle: "#fefefe" })


    //health bar


    // console.log(widthA + "widtha");

    // let actual = widthB
    let graph = this.add.graphics();
    let graphics = this.add.graphics();

    let a = 200

    let life1 = new Phaser.Geom.Rectangle(130, 100, a, 20);

    graph.clear()
    graph.fillRectShape(life1)
    graph.fillStyle(0x00000)

    let widthA = 108;
    let widthB = 2;

    let hit = this.add.text(420, 80, 'lifeBar', { color: "fafafa" });
    hit.setInteractive();
    hit.setColor("#fffffff");
    hit.on('pointerup', function () {
      // widthB = -2
      // widthA = 20
      widthB -= widthA

      // life.width = widthB--
      console.log('hello');
     
      let life = new Phaser.Geom.Rectangle(330, 100, widthB, 20);
      graphics.fillRectShape(life)
      graphics.fillStyle(0xfafafa)
      console.log(life.width + "hello");
    })
    // graphics.fillRectShape(life)
  }
}


const battleConfig: GameInstance = {
  width: "100%",
  height: "100%",
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: "100%",
    height: "100%",
  },
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: true,
    },
  },
  scene: BattleScene,
};

const Battle = (props: any) => {
  const gameRef = useRef<HTMLIonPhaserElement>(null);
  const [game, setGame] = useState<GameInstance>();
  // const { setInitialize, initialize, name, setName, changeView } = props;
  useEffect(() => {
    if (!props.initialize) {
      setGame(Object.assign({}, battleConfig));
    }
  }, [props.initialize]);
  return (
    <>
      <IonPhaser ref={gameRef} game={game} initialize={!props.initialize} />

      <div className="battle">
        <div className="battle_container">
          <div className="battle_question">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Similique magni quaerat laboriosam officiis fugit libero! Sequi ut
              rem libero nihil quisquam blanditiis sint voluptate, iure, ad
              adipisci ipsam debitis qui.
            </p>
          </div>

          <div className="battle_buttons">
            {/* <button id="answer" className="battle_answer" />
            <button id="answer2" className="battle_answer" />
            <button id="answer" className="battle_answer" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Battle;
