// Game Board
// Player Load, Cactus Load, Floor Load

import Cactus from "./cactus.js";
import { FRAME_RATE, GAME_HIGHT, GAME_WIDTH, MAX, MIN } from "./config.js";
import Floor from "./floor.js";
import Player from "./player.js";

// 1. Draw a Canvas (Board)
// window (tab)
window.addEventListener('load', gameStart);
let player;
let context ;
let floor;
function gameStart(){
    bindEvent();
    prepareCanvas();
    loadSprites();
    gameLoop();
}
function bindEvent(){
  window.addEventListener('keyup',doJump);
}

function doJump(event){
  console.log('Event Code',event.code);
  if(event.code==='Space'){
    player.jump();
  }
}

function prepareCanvas(){
    const canvas = document.querySelector('#canvas');
    canvas.addEventListener('keyup',doJump)
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HIGHT;
    context = canvas.getContext('2d');
    //canvas.style = 'border: 1px solid black';
}

function loadSprites(){
    player = new Player();
    floor = new Floor();
    loadCactus();
}



let cactusArray = [];
function loadCactus(){
    const cactusArr = ['../assets/cactus1.png','../assets/cactus2.png','../assets/cactus3.png'];
    let GAP  = 1 ;
    
    for(var c of cactusArr){
        const cactus = new Cactus(GAME_WIDTH * GAP, GAME_HIGHT , 48, 100, c);
        GAP++;
        cactusArray.push(cactus);
    }
}

function generateRandomNumber(){
    return Math.floor(Math.random() * MAX - MIN + 1) + MIN; 
}

let delay = 0;
function generateRandomCactus(){
    if(delay >=70){
        delay = 0;
    setTimeout(()=>{
        loadCactus();
       // cactusArray.push(new Cactus(GAME_WIDTH * 1, GAME_HEIGHT , 48, 100, '../assets/cactus1.png')
    }, generateRandomNumber());
}
delay++;
}

function printCactus(context){
    // console.log('Cactus Array Size ', cactusArray.length);
    for(let cactus of cactusArray){
        cactus.draw(context);
    }
}

function removeUnUsedCactus(){
    cactusArray = cactusArray.filter(c=>!c.isOutOfScreen());
}

function gameLoop(){
    //console.log('Game Loop');
    clearScreen();
    player.draw(context);
    floor.draw(context);
    printCactus(context);
    generateRandomCactus();
    removeUnUsedCactus();
    setTimeout(function(){
        requestAnimationFrame(gameLoop);
    }, FRAME_RATE);
}

function clearScreen(){
    context.fillStyle = 'white';
    context.fillRect(0,0, GAME_WIDTH, GAME_HIGHT);
}