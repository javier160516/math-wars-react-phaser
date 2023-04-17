import { GameInstance, IonPhaser } from "@ion-phaser/react";
import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import Battle from "./Battle";
import { ws } from "./config";

class MainScene extends Phaser.Scene {
  //   private helloWorld!: Phaser.GameObjects.Text;

  init() {
    this.cameras.main.setBackgroundColor("#24252A");
  }

  create() {
    // this.helloWorld = this.add.text(
    //   this.cameras.main.centerX,
    //   this.cameras.main.centerY,
    //   "Esperando a otro jugador",
    //   {
    //     font: "40px Arial",
    //     color: "#ffffff",
    //   }
    // );
    // this.helloWorld.setOrigin(0.5);
  }
  update() {
    // this.helloWorld.angle += 1;
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
  scene: MainScene,
};

const Waiting = (props: any) => {
  const gameRef = useRef<HTMLIonPhaserElement>(null);
  const [game, setGame] = useState<GameInstance>();
  const [waiting, setWaiting] = useState(true);
  const [waitingMessage, setWaitingMessage] = useState("");

  useEffect(() => {
    ws.on("connectedInRoom", (data) => {
      if (data.data < 2) {
        setWaiting(true);
        console.log(data.data, " usuarios conectados");
      } else {
        console.log(data.data, ' entro al else');
        if(data.data === 2){
          setWaiting(false);
        }
        if(data.data >= 3){
          // console.log('Desde el else');
          setWaiting(true);
          props.setConnection(false);
        }
      }
    });

    ws.on("message", (data) => {
      setWaitingMessage(data);
    });

    ws.on("disconnected", (data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    setGame(Object.assign({}, gameConfig));
  }, []);
  return (
    <>
      {waiting ? (
        <>
          <IonPhaser ref={gameRef} game={game} />
          <h2 style={{ position: "absolute" }}>Esperando otro jugador</h2>
        </>
      ) : (
        <Battle />
      )}
    </>
  );
};

export default Waiting;
