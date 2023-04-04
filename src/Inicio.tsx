import React, { useEffect, useRef, useState } from "react";
import { GameInstance, IonPhaser } from "@ion-phaser/react";
import Phaser from 'phaser'
import scene from "./assets/scene0-Bg.jpeg";
import logo from "./assets/logo-math-wars-5.svg";
import pista1 from "./assets/music/pista1.mp3";

class InicioScene extends Phaser.Scene {
  preload() {
    this.load.image("background", scene);
    this.load.image("logo", logo);
    this.load.audio("pista1", pista1);
  }

  create() {
    // BACKGROUN
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
      loop: false,
      delay: 0,
    };
    music.play(musicConfig);
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
  scene: InicioScene,
};

const Inicio = (props: any) => {
  const gameRef = useRef<HTMLIonPhaserElement>(null);
  const [game, setGame] = useState<GameInstance>();
  const { setInitialize, initialize, name, setName, changeView } = props;

  useEffect(() => {
    if (!props.initialize) {
      setGame(Object.assign({}, gameConfig));
    }
  }, [props.initialize]);
  return (
    <>
      <IonPhaser ref={gameRef} game={game} initialize={!props.initialize} />
      <div className="container-inicio">
        <input 
            type="text" 
            value={name.value} 
            onChange={(e) => setName({value: e.target.value, error: ''})}
        />
        <button type="button" onClick={() => changeView()}></button>
      </div>
    </>
  );
};

export default Inicio;
