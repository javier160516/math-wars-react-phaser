import React, { useEffect, useRef, useState } from "react";
import { GameInstance, IonPhaser } from "@ion-phaser/react";
import Phaser from 'phaser'
import scene from "./assets/scene0-Bg.jpeg";
import gameLogo from "./assets/logo-math-wars-5.svg";
import pista1 from "./assets/music/pista1.mp3";
import audioStart from "./assets/soundeffects/start.mp3"



export class InicioScene extends Phaser.Scene {
  
  preload() {
    this.load.image("background", scene);
    this.load.image("logo", gameLogo);
    this.load.audio("pista1", pista1);
    this.load.audio("start", audioStart);
    
  }

 
  create() {
    // BACKGROUND
    let bg = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "background"
      )
      .setOrigin(0.5, 0.5);
    bg.displayWidth = this.sys.canvas.width;
    bg.displayHeight = this.sys.canvas.height;

    // LOGO
    let logo = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 3.5 - 80,
      "logo"
    );
    logo.displayWidth = 500;
    logo.displayHeight = 200;


    // MUSICA
    let music = this.sound.add("pista1");
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

    const pause = document.querySelector('#pause');

    pause?.addEventListener('click', ()=>{
      // if(!this.game.sound.mute){
      //  this.sound.mute = true;
        
      // }else{
      //  this.sound.mute = false;
      // }
      if(music.isPlaying){
        music.pause();
      }else if(music.isPaused){
        music.play();
      }
    });

    //SONIDO BOTON START
    let startSound = this.sound.add("start");
    let startSoundConfig = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    };
    startSound.play(startSoundConfig);

    const start = document.querySelector('#start');
    start?.addEventListener('click', ()=>{
      startSound.play();
    });
  }
}

const gameConfig: GameInstance = {
  width: "100%",
  height: "100%",
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: "100%",
    height: "100%",
  },
  dom: {
    createContainer: true
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
  scene: InicioScene
};

const Inicio = (props: any) => {
  const gameRef = useRef<HTMLIonPhaserElement>(null);
  const [game, setGame] = useState<GameInstance>();
  const { alias, setAlias, handleStart, connection } = props;

  useEffect(() => {
    if (!connection) {
      setGame(Object.assign({}, gameConfig));
    }
  }, [connection]);
  return (
    <>
      <IonPhaser ref={gameRef} game={game} initialize={!connection} />
      <div className="container-inicio">
        <input 
            type="text" 
            value={alias}
            placeholder="Escribe tu nombre" 
            onChange={(e) => setAlias(e.target.value)}
        />
        <button id="start" type="button" onClick={(e) => handleStart(e)}></button>
      </div>
      <div className="container-music">
        <button id="pause" type="button"></button>
      </div>
    </>
  );
};



export default Inicio;

