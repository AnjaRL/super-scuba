//canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid  blue";

//DOM elements
let mainScreen = document.querySelector(".mainScreen");
let gameScreen = document.querySelector(".gameScreen");
let gameOverScreen = document.querySelector(".gameOverScreen");

//Buttons
let startButton = document.querySelector("#startButton");
let tryAgainButton = document.querySelector("#tryAgainButton");
let backToButton = document.querySelector("#backToButton");
//!!!!!!!!  add sound button !!!!!!!!

//Images
let bg = new Image();
bg.src = "./img/gameScreen.jpg";

let boy = new Image();
boy.src = "./img/scubaBoy.png";
let diver = new Image();
diver.src = "./img/scubaGirl.png";
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
let tank = new Image();
tank.src = "./img/tank.png";

// Diver variables
let defaultDiverX = 60;
let defaultDiverY = 100;
let diverX = defaultDiverX;
let diverY = defaultDiverY;
let diverHeight = 200;
let diverWidth = 180;
let isArrowRight = false;
let isArrowLeft = false;
let isArrowUp = false;
let isArrowDown = false;

//General variables
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

// Can variables
let can1Y = 50;
can1Height = 80;
can1Width = 80;

let can1Xincr = 3;
let can1Yincr = 3;

let canTypes = [can1, can2, can3];
let cans = [];
let sunkCans = [];

//Fish variables

let hits = 0;
let fishHeight = 120;
let fishWidth = 120;
let fishes = [];
let fishTypes = [fish1, fish2, fish3, fish4, fish5, fish6, fish7];

//Tank variables
let tankX = 600;
let tankY = 90;
let tankWidth = 40;
let tankHeight = 50;
let tanks = 5;

//Functions
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  swim();

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(diver, diverX, diverY, diverHeight, diverWidth);
  //ctx.drawImage(tank, tankX, tankY, tankWidth, TankHeight);

  // Draw fallen cans (refresh)
  cans.forEach((can) => {
    ctx.drawImage(can.type, can.x, can.y, can.width, can.height); // I don't do it in fallenCans as you want to print your cans when you move your diver as well (clearRect -> your cans get removed)
  });

  // Draw fishes
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

  collisions();

  isGameOver(); // has to be before draw otherwise, gameover when 4 cans are sunk on SCREEN

  ctx.fillStyle = "white";
  ctx.font = "22px Verdana";
  ctx.fillText(`Score: ${score}`, 30, 30);

  ctx.fillStyle = "white";
  ctx.font = "22px Verdana";
  ctx.fillText(`Hit Fishes: ${hits}`, 160, 30);

  ctx.fillStyle = "white";
  ctx.font = "22px Verdana";
  ctx.fillText(`Tanks: ${tanks}`, 350, 30);
}

function animate() {
  // Only to create new cans and change cans Y
  randomFish();
  randomCans();
  fallenCans();
  moveFishes();
}

function isGameOver() {
  if (sunkCans.length == 5 || hits >= 5) {
    clearInterval(intervalId);
    clearInterval(intervalAnimate);
    mainScreen.style.display = "none";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
  }
}

function fallenCans() {
  cans.forEach((can) => {
    can.y += can.height;
    if (can.y > canvasHeight) {
      can.y -= can.height;
    }
  });
}

function moveFishes() {
  fishes.forEach((fish) => {
    fish.x -= fish.width;
  });
}

function collisions() {
  for (let i = cans.length - 1; i >= 0; i--) {
    // if collision the can disappears else if the can is at the bottom, add it to SunkCans
    if (
      cans[i].x >= diverX &&
      cans[i].x <= diverX + diverWidth &&
      cans[i].y >= diverY &&
      cans[i].y <= diverY + diverHeight
    ) {
      score += 10;
      cans.splice(i, 1);
    } else if (cans[i].y >= canvasHeight - cans[i].height) {
      sunkCans.push(cans[i]);
      cans.splice(i, 1);
    }
  }

  for (let i = fishes.length - 1; i >= 0; i--) {
    if (
      fishes[i].x >= diverX &&
      fishes[i].x <= diverX + diverWidth &&
      fishes[i].y >= diverY &&
      fishes[i].y <= diverY + diverHeight &&
      fishes[i].isHit == false
    ) {
      hits++;
      fishes[i].isHit = true;
    } else if (fishes[i].x < 0) {
      fishes.splice(i, 1);
    }
  }
}

function randomFish() {
  if (fishes.length < 2) {
    let fishY = Math.floor(Math.random() * (canvasHeight - fishHeight));
    let fish = {
      x: canvasWidth,
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

function randomCans() {
  if (cans.length < 5) {
    let can1X = Math.floor(Math.random() * (canvasWidth - can1Width));
    let can = {
      x: can1X,
      y: can1Y,
      width: can1Width,
      height: can1Height,
      type: canTypes[Math.floor(Math.random() * canTypes.length)],
    };
    ctx.drawImage(can.type, can.x, can.y, can.width, can.height);
    cans.push(can);
  }
}

function swim() {
  //console.log("swim()")
  if (isArrowRight) {
    diverX = diverX + 20;
    if (diverX > rightZone) {
      diverX = diverX - 20;
    }
    isArrowRight = false;
  }
  if (isArrowLeft) {
    diverX = diverX - 20;
    if (diverX < 0) {
      diverX = diverX + 20;
    }
    isArrowLeft = false;
  }
  if (isArrowUp) {
    diverY = diverY - 20;
    if (diverY < topZone) {
      diverY = diverY + 20;
    }
    isArrowUp = false;
  }
  if (isArrowDown) {
    diverY = diverY + 20;
    if (diverY > bottomZone) {
      diverY = diverY - 20;
    }
    isArrowDown = false;
  }
  console.log(diverX, diverY);
}

function startLoop() {
  intervalId = setInterval(() => {
    requestAnimationFrame(animate); /*cans move without the diver swims */
  }, 2000); /*cans are falling every 5 sec */
}

function startAnimate() {
  intervalAnimate = setInterval(() => {
    requestAnimationFrame(draw);
  }, 500);
}

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
  hits = 0;
  score = defaultScore;
  mainScreen.style.display = "none";
  gameScreen.style.display = "block";
  gameOverScreen.style.display = "none";
  draw();
  startLoop();
  startAnimate();
}

window.addEventListener("load", (elem) => {
  start();
  startButton.addEventListener("click", () => {
    start();
  });
  tryAgainButton.addEventListener("click", () => {
    start();
  });
});
