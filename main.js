//----Canvas

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid  white";

//----DOM elements

let mainScreen = document.querySelector(".mainScreen");
let gameScreen = document.querySelector(".gameScreen");
let gameOverScreen = document.querySelector(".gameOverScreen");

//----Buttons

let startButton = document.querySelector("#startButton");
let tryAgainButton = document.querySelector("#tryAgainButton");
let backToButton = document.querySelector("#backToButton");
let btnSound = document.querySelector("#soundActivate");

//----Players choice

let diverBoyImg = document.querySelector("#boy");
let diverGirlImg = document.querySelector("#girl");

//----Images

let bg = new Image();
bg.src = "./img/gameScreen.jpg";
let boy = new Image();
boy.src = "./img/scubaBoy.png";
let girl = new Image();
girl.src = "./img/scubaGirl.png";
let can1 = new Image();
can1.src = "./img/can1.png";
let can2 = new Image();
can2.src = "./img/can2.png";
let can3 = new Image();
can3.src = "./img/can3.png";
let fish1 = new Image();
fish1.src = "./img/fish1.png";
let fish2 = new Image();
fish2.src = "./img/fish2.png";
let fish3 = new Image();
fish3.src = "./img/fish3.png";
let fish4 = new Image();
fish4.src = "./img/fish4.png";
let fish5 = new Image();
fish5.src = "./img/fish5.png";
let fish6 = new Image();
fish6.src = "./img/fish6.png";
let fish7 = new Image();
fish7.src = "./img/fish7.png";
let tank1 = new Image();
tank1.src = "./img/tank1.png";

//----Audio

let audioMainScreen = new Audio("./audios/mainScreenMusic.mp3");
audioMainScreen.volume = 0.1;
let audioScreenGame = new Audio("./audios/screenGameMusic.mp3");
audioScreenGame.volume = 0.3;
let audioGameOver = new Audio("./audios/gameOverMusic.mp3");
audioGameOver.volume = 0.1;
let audioCansHit = new Audio("./audios/kidsCheering.mp3");
audioCansHit.volume = 0.1;
let audioFishHit = new Audio("./audios/fishHit.mp3");
audioFishHit.volume = 0.1;
let audioTankHit = new Audio("./audios/scubaBreathing.mp3");
audioTankHit.volume = 0.2;

//----Diver variables

let diverTanks = 5; // tanks  here represent diverlives
let canDiverLoseTank = true;
let diver = girl;
let defaultDiverX = 60;
let defaultDiverY = 300;
let diverX = defaultDiverX;
let diverY = defaultDiverY;
let diverHeight = 200;
let diverWidth = 180;
let isArrowRight = false;
let isArrowLeft = false;
let isArrowUp = false;
let isArrowDown = false;

//----Can variables

let can1Y = 50;
can1Height = 80;
can1Width = 80;

let can1Xincr = 3;
let can1Yincr = 3;

let canTypes = [can1, can2, can3];
let cans = [];
let sunkCans = [];

//----Fish variables

let hits = 0;
let fishHeight = 100;
let fishWidth = 100;
let fishes = [];
let fishTypes = [fish1, fish2, fish3, fish4, fish5, fish6, fish7];

//----Tank variables

let tankX = 300;
let tankY = 90;
let tankWidth = 50;
let tankHeight = 60;
let tanksArr = [];

//-----General variables

const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
let topZone = 40;
let bottomZone = canvasHeight - diverHeight - 40;
let leftZone = 0;
let rightZone = canvasWidth - 100;
let gameOver = false;
let defaultScore = 0;
let score = defaultScore;
let intervalId = null;
let intervalAnimate = null;

//---FUNCTIONS ---\\

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  swim();

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(diver, diverX, diverY, diverHeight, diverWidth);

  randomFish();
  randomCans();
  fallenCans();
  moveFishes();
  tankRefill();

  //----Draw fallen cans (refresh)
  cans.forEach((can) => {
    ctx.drawImage(can.type, can.x, can.y, can.width, can.height); // don't do it in fallenCans as I want to print cans when move diver as well (clearRect -> your cans get removed)
  });

  //----Draw fishes
  fishes.forEach((fish) => {
    ctx.drawImage(fish.type, fish.x, fish.y, fish.width, fish.height);
  });

  // Draw sunk cans
  sunkCans.forEach((sunkCan) => {
    ctx.drawImage(
      sunkCan.type,
      sunkCan.x,
      sunkCan.y,
      sunkCan.width,
      sunkCan.height
    );
  });

  //----Draw tanks
  tanksArr.forEach((tank) => {
    ctx.drawImage(tank.type, tank.x, tank.y, tank.width, tank.height);
  });
  collisions();

  isGameOver(); // has to be before draw otherwise, gameover when 4 cans are sunk on SCREEN

  ctx.fillStyle = "white";
  ctx.font = "40px New Super Mario Font U, sans-serif";
  ctx.fillText(`Score: ${score}`, 30, 40);

  ctx.fillStyle = "white";
  ctx.font = "40px New Super Mario Font U, sans-serif";
  ctx.fillText(`Fishes hit: ${hits}`, 250, 40);

  ctx.fillStyle = "white";
  ctx.font = "40px New Super Mario Font U, sans-serif";
  ctx.fillText(`Oxygen: ${diverTanks}`, 550, 40);
}

//----GAME OVER

function isGameOver() {
  if (sunkCans.length == 5 || hits >= 5 || diverTanks == 0) {
    clearInterval(intervalId);
    clearInterval(intervalAnimate);
    audioGameOver.play();
    audioScreenGame.pause();
    audioMainScreen.pause();
    mainScreen.style.display = "none";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
  }
}
//---- Cans falling from the top
function fallenCans() {
  cans.forEach((can) => {
    can.y += 5;
    if (can.y > canvasHeight) {
      can.y--;
    }
  });
}
//---- Cans moving
function moveFishes() {
  fishes.forEach((fish) => {
    fish.x -= 10;
  });
}

//----- When collisions happen between the diver and elements

function collisions() {
  // ---- collisions with cans
  for (let i = cans.length - 1; i >= 0; i--) {
    // if collision,the can disappears else if the can is at the bottom, add it to SunkCans
    if (
      cans[i].x >= diverX &&
      cans[i].x <= diverX + diverWidth &&
      cans[i].y >= diverY &&
      cans[i].y <= diverY + diverHeight
    ) {
      audioCansHit.play();
      score += 5;
      cans.splice(i, 1);
    } else if (cans[i].y >= canvasHeight - cans[i].height) {
      sunkCans.push(cans[i]);
      cans.splice(i, 1);
    }
  }

  //----collisions with fishes - fish cannot be touched twice
  for (let i = fishes.length - 1; i >= 0; i--) {
    if (
      fishes[i].x >= diverX &&
      fishes[i].x <= diverX + diverWidth &&
      fishes[i].y >= diverY &&
      fishes[i].y <= diverY + diverHeight &&
      fishes[i].isHit == false
    ) {
      audioFishHit.play();
      hits++;
      fishes[i].isHit = true;
    } else if (fishes[i].x < 0) {
      fishes.splice(i, 1);
    }
  }

  //----collisions with tanks
  for (let i = tanksArr.length - 1; i >= 0; i--) {
    // if collision the tank disappear and tanks in scoreboard increases by 1,
    if (
      tanksArr[i].x >= diverX &&
      tanksArr[i].x <= diverX + diverWidth &&
      tanksArr[i].y >= diverY &&
      tanksArr[i].y <= diverY + diverHeight
    ) {
      tanksArr.splice(i, 1);
      audioTankHit.play();
      if (diverTanks < 5) {
        diverTanks++;
      }
    }
  }
}

//-----DISPLAY ELEMENTS

//----display random fish
function randomFish() {
  if (fishes.length < 5) {
    let fishY = Math.floor(
      Math.random() * (canvasHeight - topZone + fishHeight)
    );
    let fishX = Math.random() * (canvasWidth + 500 - canvasWidth) + canvasWidth;
    let fish = {
      x: fishX,
      y: fishY,
      width: fishWidth,
      height: fishHeight,
      isHit: false,
      type: fishTypes[Math.floor(Math.random() * fishTypes.length)],
    };
    ctx.drawImage(fish.type, fish.x, fish.y, fish.width, fish.height);
    fishes.push(fish);
  }
}

//----display random can
function randomCans() {
  if (cans.length < 5) {
    let can1X = Math.floor(Math.random() * (canvasWidth - can1Width));
    let can1Y = Math.random() * 500;
    let can = {
      x: can1X,
      y: -can1Y,
      width: can1Width,
      height: can1Height,
      type: canTypes[Math.floor(Math.random() * canTypes.length)],
    };
    ctx.drawImage(can.type, can.x, can.y, can.width, can.height);
    cans.push(can);
  }
}

//----display random tank
// diver loses 1 oxygen every 20points,
// every 30 points a tank appears, the diver needs to catch it to increase the oxygen level, and meanwhile every 30 points the diver can loose a tank
function tankRefill() {
  if (score && score % 20 == 0 && canDiverLoseTank) {
    if (diverTanks > 0 && diverTanks <= 5) {
      diverTanks--;
      canDiverLoseTank = false;
    }
  }
  if (score && score % 30 == 0) {
    canDiverLoseTank = true;
    if (tanksArr.length < 1) {
      console.log(score);
      let tankX = Math.floor(Math.random() * (canvasWidth - tankWidth));
      let tank = {
        x: tankX,
        y: tankY,
        width: tankWidth,
        height: tankHeight,
        type: tank1,
      };
      ctx.drawImage(tank1, tank.x, tank.y, tank.width, tank.height);
      tanksArr.push(tank);
    }
  }
}

//----function for makin the diver move
function swim() {
  //console.log("swim()")
  if (isArrowRight) {
    diverX += 30;
    if (diverX > rightZone) {
      diverX -= 30;
    }
    isArrowRight = false;
  }
  if (isArrowLeft) {
    diverX -= 30;
    if (diverX < 0) {
      diverX += 30;
    }
    isArrowLeft = false;
  }
  if (isArrowUp) {
    diverY -= 30;
    if (diverY < topZone) {
      diverY += 30;
    }
    isArrowUp = false;
  }
  if (isArrowDown) {
    diverY += 30;
    if (diverY > bottomZone) {
      diverY -= 30;
    }
    isArrowDown = false;
  }
}

function startAnimate() {
  intervalAnimate = setInterval(() => {
    requestAnimationFrame(draw);
  }, 80);
}

//---- Keys addEventListeners

document.addEventListener("keydown", (event) => {
  //Arrow keys
  if (event.code == "ArrowRight") {
    isArrowRight = true;
    isArrowUp = false;
    isArrowLeft = false;
    isArrowDown = false;
  } else if (event.code == "ArrowUp") {
    isArrowRight = false;
    isArrowUp = true;
    isArrowLeft = false;
    isArrowDown = false;
  } else if (event.code == "ArrowLeft") {
    isArrowRight = false;
    isArrowUp = false;
    isArrowLeft = true;
    isArrowDown = false;
  } else if (event.code == "ArrowDown") {
    isArrowRight = false;
    isArrowUp = false;
    isArrowLeft = false;
    isArrowDown = true;
  }
  draw();
});

//---- functions for screens

function welcomePage() {
  mainScreen.style.display = "block";
  gameScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  audioGameOver.pause();
  audioScreenGame.pause();
}

function start() {
  isArrowRight = false;
  isArrowUp = false;
  isArrowLeft = false;
  isArrowDown = false;
  diverX = defaultDiverX;
  diverY = defaultDiverY;
  fishes = [];
  sunkCans = [];
  cans = [];
  tanksArr = [];
  diverTanks = 5;
  hits = 0;
  audioScreenGame.play();
  audioMainScreen.pause();
  score = defaultScore;
  mainScreen.style.display = "none";
  gameScreen.style.display = "block";
  gameOverScreen.style.display = "none";
  draw();
  startAnimate();
}

//----EventListeners-----\\
window.addEventListener("load", (elem) => {
  welcomePage();

  diverBoyImg.addEventListener("click", () => {
    diver = boy;
  });
  diverGirlImg.addEventListener("click", () => {
    diver = girl;
  });

  startButton.addEventListener("click", () => {
    start();
  });

  tryAgainButton.addEventListener("click", () => {
    start();
    audioGameOver.pause();
  });

  backToButton.addEventListener("click", () => {
    welcomePage();
  });

  btnSound.addEventListener("click", () => {
    if (audioMainScreen.duration > 0 && !audioMainScreen.paused) {
      //Its playing...do your job
      audioMainScreen.pause();
    } else {
      //Not playing...maybe paused, stopped or never played.
      audioMainScreen.play();
    }
  });
});
