
import React, { useState, useEffect, useRef } from 'react'
import Phaser, { GameObjects } from 'phaser'
import { GameInstance, IonPhaser } from '@ion-phaser/react'
import './Battle.css'
import scene1 from './assets/scenes/scene1-Bg.jpeg'
import fighter from './assets/characters/fighter.json'
import fighterBg from './assets/characters/fighter.png'
import magic from './assets/characters/elves-craft-pixel.json'
import magicBg from './assets/characters/elves-craft-pixel.png'
import correct from './assets/correct_a3.svg'
import wrong from './assets/wrong_a2.svg'
import fighTrack from './assets/music/fight1.ogg'
import mov from './assets/soundeffects/mov.mp3'



class HealthBar {

    constructor(scene: any, x: any, y: any) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease(amount: number) {
        this.value -= amount;

        if (this.value < 0) {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw() {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 80, 16);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

        if (this.value < 30) {
            this.bar.fillStyle(0xff0000);
        }
        else {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }

}

class Missile extends Phaser.GameObjects.Image {

    constructor(scene: any, frame: any) {
        super(scene, 0, 0, 'elves', frame);

        this.visible = false;
    }

}

class Elf extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, color: any, x: number | undefined, y: number | undefined) {
        super(scene, x, y);

        this.color = color;

        this.setTexture('elves');
        this.setPosition(x, y);

        this.play(this.color + 'Idle');

        scene.add.existing(this);

        this.on('animationcomplete', this.animComplete, this);

        this.alive = true;

        var hx = (this.color === 'blue') ? 110 : -40;

        this.hp = new HealthBar(scene, x - hx, y - 110);

        this.timer = scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this });
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
    }

    animComplete(animation: { key: string }) {
        if (animation.key === this.color + 'Attack') {
            this.play(this.color + 'Idle');
        }
    }

    damage(amount: any) {
        if (this.hp.decrease(amount)) {
            this.alive = false;

            this.play(this.color + 'Dead');

            (this.color === 'blue') ? bluesAlive-- : greensAlive--;
        }
    }

    fire() {
        var target = (this.color === 'blue') ? getGreen() : getBlue();

        if (target && this.alive) {
            this.play(this.color + 'Attack');

            var offset = (this.color === 'blue') ? 20 : -20;
            var targetX = (this.color === 'blue') ? target.x + 30 : target.x - 30;

            this.missile.setPosition(this.x + offset, this.y + 20).setVisible(true);

            this.scene.tweens.add({
                targets: this.missile,
                x: targetX,
                ease: 'Linear',
                duration: 500,
                onComplete: function (tween, targets) {
                    targets[0].setVisible(false);
                }
            });

            target.damage(Phaser.Math.Between(2, 8));

            this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this });
        }
    }

}

class BlueElf extends Elf {

    constructor(scene: this, x: number, y: number) {
        super(scene, 'blue', x, y);

        this.missile = new Missile(scene, 'blue-missile');

        scene.add.existing(this.missile);
    }

}

class GreenElf extends Elf {

    constructor(scene: this, x: number, y: number) {
        super(scene, 'green', x, y);

        this.missile = new Missile(scene, 'green-missile');

        scene.add.existing(this.missile);
    }

}

let blues: any[] = [];
let greens: any[] = [];

var bluesAlive = 1;
var greensAlive = 1;




class BattleScene extends Phaser.Scene {

    preload() {
        this.load.image("correct",correct);
        this.load.image("wrong", wrong);
        this.load.image("background", scene1);
        this.load.atlas("fighter", fighterBg, fighter);
        this.load.atlas("elves", magicBg, magic);
        this.load.audio("fightMusic", fighTrack);
        this.load.audio("mov", mov);
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
        let movSoundConfig={
            mute: false,
            volume:0.5,
            rate:1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
        mov.play(movSoundConfig);

       const movSound = document.querySelector('.battle_buttons');
       movSound?.addEventListener('pointerover', ()=>{
        mov.play();
       })

        
        
        let correctAnswer: GameObjects.Image
        let wrongAnswer: GameObjects.Image
       

        let answer = document.querySelector('#answer');
        answer?.addEventListener('click', ()=>{
            
            correctAnswer = this.add.image(
                this.cameras.main.width / 2,
                this.cameras.main.height / 3.5 - 80,
                "correct"
            );
            
            correctAnswer.displayHeight = 250;
            correctAnswer.displayWidth = 300;
          
               
            
        })
        

        

        let answer2 = document.querySelector('#answer2');
        answer2?.addEventListener('click',()=>{
     
            wrongAnswer = this.add.image(
                this.cameras.main.width / 2,
                this.cameras.main.height / 3.5 - 80,
                "wrong"
            );
         
            wrongAnswer.displayHeight = 250;
            wrongAnswer.displayWidth = 250;
            
            
        })

        let bg = this.add
            .image(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                "background"
            )
            .setOrigin(0.5, 0.5);
        bg.displayWidth = this.sys.canvas.width;
        bg.displayHeight = this.sys.canvas.height;
        //characters
        //alive
        this.anims.create({ key: 'greenIdle', frames: this.anims.generateFrameNames('elves', { prefix: 'green_idle_', start: 0, end: 4 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'blueIdle', frames: this.anims.generateFrameNames('elves', { prefix: 'blue_idle_', start: 0, end: 4 }), frameRate: 10, repeat: -1 });
        //attack
        this.anims.create({ key: 'greenAttack', frames: this.anims.generateFrameNames('elves', { prefix: 'green_attack_', start: 0, end: 5 }), frameRate: 10 });
        this.anims.create({ key: 'blueAttack', frames: this.anims.generateFrameNames('elves', { prefix: 'blue_attack_', start: 0, end: 4 }), frameRate: 10 });
        //die
        this.anims.create({ key: 'greenDead', frames: this.anims.generateFrameNames('elves', { prefix: 'green_die_', start: 0, end: 4 }), frameRate: 6 });
        this.anims.create({ key: 'blueDead', frames: this.anims.generateFrameNames('elves', { prefix: 'blue_die_', start: 0, end: 4 }), frameRate: 6 });
        // blues.push(new BlueElf(this, 120, 476));
        // blues.push(new BlueElf(this, 220, 480));
        // blues.push(new BlueElf(this, 320, 484));
        blues.push(new BlueElf(this, 300, 480));

        // greens.push(new GreenElf(this, 560, 486));
        // greens.push(new GreenElf(this, 670, 488));
        // greens.push(new GreenElf(this, 780, 485));
        greens.push(new GreenElf(this, 1150, 484));
        
    
    }
}



function getGreen() {
    if (greensAlive) {
        greens = Phaser.Utils.Array.Shuffle(greens);

        for (var i = 0; i < greens.length; i++) {
            if (greens[i].alive) {
                return greens[i];
            }
        }
    }

    return false;
}
function getBlue() {
    if (bluesAlive) {
        blues = Phaser.Utils.Array.Shuffle(blues);

        for (var i = 0; i < blues.length; i++) {
            if (blues[i].alive) {
                return blues[i];
            }
        }
    }

    return false;
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
                        <button id='answer'
                            className='battle_answer'
                           
                            

                        />
                        <button id='answer2'
                            className='battle_answer'

                        />
                        <button id='answer'
                            className='battle_answer'
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Battle
