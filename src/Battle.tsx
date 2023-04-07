import React, { useState, useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { GameInstance, IonPhaser } from '@ion-phaser/react'
import './Battle.css'
import scene1 from './assets/scenes/scene1-Bg.jpeg'
import fighter from './assets/characters/fighter.json'
import fighterBg from './assets/characters/fighter.png'
import eri from './assets/characters/eri.json'
import eriBg from './assets/characters/eri.png'
import ken from './assets/characters/ken.json'
import kenBg from './assets/characters/ken.png'
// import eri from './assets/characters/eri.json'
// import eriBg from './assets/characters/eri.png'


class BattleScene extends Phaser.Scene {
    preload() {
        this.load.image("background", scene1);
        this.load.atlas("fighter", fighterBg, fighter);
        this.load.atlas("eri", eriBg, eri);
        this.load.atlas("ken", kenBg, ken);
    }

    create() {
        let bg = this.add
            .image(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                "background"
            )
            .setOrigin(0.5, 0.5);
        bg.displayWidth = this.sys.canvas.width;
        bg.displayHeight = this.sys.canvas.height;

        //eri: character and player 1 at the game
        this.anims.create({
            key: 'shot',
            frames: 'eri',
            frameRate: 12,
            repeat: -1,
            duration: 3,
            delay: 20
        })
        this.add.sprite(300, 400, '').play('shot').scale = 4;

        //ken: character and player 2 at the game
        this.anims.create({
            key: 'shot2',
            frames: 'ken',
            frameRate: 12,
            repeat: -1,
            duration: 3,
            delay: 20
        })
        this.add.sprite(1150, 400, '').play('shot2').scale = 3;


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
    scene: BattleScene
}


const Battle = (props: any) => {
    const gameRef = useRef<HTMLIonPhaserElement>(null);
    const [game, setGame] = useState<GameInstance>();
    const { setInitialize, initialize, name, setName, changeView } = props;
    useEffect(() => {
        if (!props.initialize) {
            setGame(Object.assign({}, battleConfig));
        }
    }, [props.initialize]);
    return (
        <>
            <IonPhaser ref={gameRef} game={game} initialize={!props.initialize} />
            <div
                className='battle'
            >
                <div className='battle_container'>
                    <div className='battle_question'>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique magni quaerat laboriosam officiis fugit libero! Sequi ut rem libero nihil quisquam blanditiis sint voluptate, iure, ad adipisci ipsam debitis qui.</p>
                    </div>

                    <div className='battle_buttons'>
                        <button
                            className='battle_answer'

                        />
                        <button
                            className='battle_answer'

                        />
                        <button
                            className='battle_answer'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Battle