import 'phaser';

import CrewScene from './scenes/CrewScene.js';
import BootScene from './scenes/BootScene.js';
import NeedEthScene from './scenes/NeedEthScene.js';
import UnitScene from './scenes/UnitScene.js';
import TransactionScene from './scenes/TransactionScene.js';

/**
 * This will get loaded by WebPack as long as we have already run truffle compile
 */
const lmnft_artifacts = require('./../build/contracts/LimitedMintableNonFungibleToken.json');

export default class Game {
    constructor(parentElement, web3) {
        this.web3 = web3;
        this.loadGame();

        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }

        parentElement.appendChild(this.gameEngine.canvas);
    }

    resize() {
        this.gameEngine.renderer.resize(window.innerHeight, window.innerWidth);
        this.gameEngine.events.emit('resize');
    }

    loadGame() {
        const size = Math.min(600, window.innerWidth);
        const gameConfig = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 200
                    }
                }
            },
            scene: [BootScene, CrewScene, UnitScene, TransactionScene, NeedEthScene]
        };

        const game = new Phaser.Game(gameConfig);
        this.gameEngine = game;

        window.onresize = function() {
            game.renderer.resize(window.innerWidth, window.innerHeight);
            game.events.emit('resize');
        };
    }
}
