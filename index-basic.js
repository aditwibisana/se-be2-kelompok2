const CELL_SIZE = 20;

const CANVAS_SIZE = 900;
//made faster
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = (CANVAS_SIZE - 400) / CELL_SIZE;

// Bilangan Prima 1-1000
const PRIMA = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];

//this
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
var MOVE_INTERVAL = 250;
var wallX = [];
var wallY = [];
var levelWall2 = [
  {
    x1: 8,
    x2: 22,
    y: 10,
  },
  {
    x1: 8,
    x2: 22,
    y: 5,
  },
];
var levelWall3 = [
  {
    x1: 8,
    x2: 22,
    y: 15,
  },
];
var levelWall4 = [
  {
    x1: 8,
    x2: 22,
    y: 20,
  },
];
var levelWall5 = [
  {
    x1: 8,
    x2: 22,
    y: 25,
  },
];
var level = 1;
var upLevel = 0;
var isWin = 0;
var isPlay = 0;

let snake1 = {
  color: "purple",
  position: initPosition(),
  direction: initDirection(),
  head: initPosition(),
  score: 0,
  speed: 0,
  move: 250,
  health: 3,
  body: [{ x: 0, y: 0 }],

}

let apple1= {
  color: "red",
  position: initPosition(),
  
}

let apple2= {
  color: "red",
  position: initPosition(),
  
}

let life= {
  color: "red",
  position: initPosition(),
  
}
function getStarted() {
    snake1.score = 0;
    level = 1;
    health = 3;
    wallX = [];
    wallY = [];
  }
  function initWall2() {
    for (let i = 0; i < levelWall2.length; i++) {
      for (let j = levelWall2[i].x1; j <= levelWall2[i].x2; j++) {
        wallX.push(j);
        wallY.push(levelWall2[i].y);
      }
    }
  }
  
  function initWall3() {
    for (let i = 0; i < levelWall3.length; i++) {
      for (let j = levelWall3[i].x1; j <= levelWall3[i].x2; j++) {
        wallX.push(j);
        wallY.push(levelWall3[i].y);
      }
    }
  }
  
  function initWall4() {
    for (let i = 0; i < levelWall4.length; i++) {
      for (let j = levelWall4[i].x1; j <= levelWall4[i].x2; j++) {
        wallX.push(j);
        wallY.push(levelWall4[i].y);
      }
    }
  }
  
  function initWall5() {
    for (let i = 0; i < levelWall5.length; i++) {
      for (let j = levelWall5[i].x1; j <= levelWall5[i].x2; j++) {
        wallX.push(j);
        wallY.push(levelWall5[i].y);
      }
    }
  }
  
  function createWall() {
    let wallCanvas = document.getElementById("snakeBoard");
    let ctx = wallCanvas.getContext("2d");
    for (let i = 0; i < wallX.length; i++) {
      drawCell(ctx, wallX[i], wallY[i], "#808080");
    }
  }
  function hitTheWall(snake) {
    for (let i = 0; i < wallX.length; i++) {
      if (
        snake.position.x === wallX[i] &&
        (snake.direction == 2 || snake.direction == 3)
      ) {
        if (
          snake.position.y - 1 === wallY[i] ||
          snake.position.y + 1 === wallY[i]
        ) {
          overAudio.play();
          if (snake.health === 0) {
            getStarted();
          } else {
            snake.health--;
          }
          stop(snake);
        }
      }
  
      if (
        snake.position.y === wallY[i] &&
        (snake.direction == 0 || snake.direction == 1)
      ) {
        if (
          snake.position.x - 1 === wallX[i] ||
          snake.position.x + 1 === wallX[i]
        ) {
          overAudio.play();
          if (snake.health === 0) {
            getStarted();
          } else {
            snake.health--;
          }
          stop(snake);
        }
      }
    }
  }
  function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}
function initPosition() {
    xTemp = Math.floor(Math.random() * WIDTH);
    yTemp = Math.floor(Math.random() * HEIGHT);
    if (level > 1) {
      if (yTemp % 5 == 0) {
        yTemp++;
      }
    }
    return {
      x: xTemp,
      y: yTemp,
    };
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function drawApple(ctx, x, y) {
    let img = document.getElementById('apple');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawLife(ctx, x, y) {
    let img = document.getElementById('life');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;

    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } else if (snake.color == snake2.color) {
        scoreCanvas = document.getElementById("score2Board");
    } else {
        scoreCanvas = document.getElementById("score3Board");
        
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "25px bangers";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}


function drawSpeed(snake) {
    let speedCanvas;
    speedCanvas = document.getElementById("speedBoard");
    let speedCtx = speedCanvas.getContext("2d");

    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "20px bangers";
    speedCtx.fillStyle = snake.color;
    speedCtx.fillText(MOVE_INTERVAL, 10, speedCanvas.scrollHeight / 2);
}
function drawHealth(snake) {
    let healthCanvas;
    healthCanvas = document.getElementById("healthBoard");
    let healthCtx = healthCanvas.getContext("2d");

    healthCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    healthCtx.font = "25px bangers";
    healthCtx.fillStyle = snake.color;
    healthCtx.fillText(snake.health, 10, healthCanvas.scrollHeight / 2);
}

function drawLevel() {
    let levelCanvas;
    levelCanvas = document.getElementById("levelBoard");
    let levelCtx = levelCanvas.getContext("2d");
    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.font = "25px bangers";
    levelCtx.fillStyle = "#20B2AA";
    levelCtx.fillText(level, 10, levelCanvas.scrollHeight / 2);
  }

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

       ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

       drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);
       for (let i = 1; i < snake1.body.length; i++) {
           drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
       }

        //let snake = document.getElementById("ular");
        //ctx.drawImage(
        //  snake,
        //  snake1.position.x * CELL_SIZE,
        //  snake1.position.y * CELL_SIZE,
        //  CELL_SIZE,
        //  CELL_SIZE
        //);
        //for (let i = 1; i < snake1.score; i++) {
        //  ctx.drawImage(
        //    snake,
        //    snake.body[i].x * CELL_SIZE,
        //    snake.body[i].y * CELL_SIZE,
        //    CELL_SIZE,
        //    CELL_SIZE
        //  );
        //  }
        //
        //ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        drawCell(ctx, snake1.position.x, snake1.position.y, snake1.color);
        
        drawApple(ctx, apple1.position.x, apple1.position.y, apple1.color);
        drawApple(ctx, apple2.position.x, apple2.position.y, apple2.color);

        if(PRIMA.includes(snake1.score)){
            drawLife(ctx, life.position.x, life.position.y, life.color);
        };
        
        drawScore(snake1);
        drawHealth(snake1);
        createWall();
        drawSpeed(snake1);
        drawLevel();
        if (upLevel == 1) {
          upLevel = 0;
          if (level <= 5) {
            alert("level up to : " + level);
          }
        }


    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.position.x < 0) {
        snake.position.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.position.x >= WIDTH) {
        snake.position.x = 0;
    }
    if (snake.position.y < 0) {
        snake.position.y = (CANVAS_SIZE-400) / CELL_SIZE - 1;
    }
    if (snake.position.y >= HEIGHT){
        snake.position.y = 0
    }
}

function isPrime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
      if (num % i === 0) return false;
    return num > 1;
}

function eat(snake, apple, life) {
    if (
      snake.position.x == apple.position.x &&
      snake.position.y == apple.position.y
    ) {
      apple.position = initPosition();
      snake.score++;
        snake.body.push({ x: snake.position.x, y: snake.position.y });
        if (snake.score % 5 == 0) { 
            MOVE_INTERVAL -= 30;
            level++;
            playAudio("Level Up");
            //console.log("speed now : " + MOVE_INTERVAL);
        }
  
      if (snake.score === 25) {
        isWin = 1;
        stop(snake);
        return;
      }
      playAudio("Eat");
  
    //   if (snake.score % 5 == 0 && snake.score != 0) {
    //     snake.move -= 20;
    //     nextLevel(snake);
    //   }
    }
  
    // if (
    //   snake.position.x == apple2.position.x &&
    //   snake.position.y == apple2.position.y
    // ) {
    //   apple2.position = initPosition();
    //   snake.score++;
    //   snake.body.push({ x: snake.position.x, y: snake.position.y });
  
    //   if (snake.score === 25) {
    //     isWin = 1;
    //     stop(snake);
    //     return;
    //   }
  
    //   if (snake.score % 5 == 0 && snake.score != 0) {
    //     snake.move -= 20;
    //     nextLevel(snake);
    //   }
    //}

    if (snake.position.x == life.position.x && snake.position.y == life.position.y) {
        life.position = initPosition();
        snake.score++;
        if(snake.health < 3){
          snake.health++;
        }
        playAudio("Health");
    }
  }

  function playAudio(type){
    if(type === "Eat"){
      var audio = new Audio('assets/eating.mp3');
      audio.play();
    }

    if(type === "Level Up"){
      var audio1 = new Audio('assets/level_up_voice.mp3');
      var audio2 = new Audio('assets/level_up.wav');
      audio1.play();
      audio2.play();
    }
    
    if(type === "Health"){
      var audio = new Audio('assets/get_life_item.mp3');
      audio.play();
    }
  }
  
  function nextLevel(snake) {
    level++;
    if (level == 2) {
      initWall2();
    } else if (level == 3) {
      initWall3();
    } else if (level == 4) {
      initWall4();
    } else if (level == 5) {
      initWall5();
    }
    snake.position = initPosition();
    snake.health += 3;
    stop(snake1);
    upLevel = 1;
  }

function moveLeft(snake) {
    snake.position.x--;
    teleport(snake);
    eat(snake, apple1, life);
    eat(snake, apple2, life);

}

function moveRight(snake) {
    snake.position.x++;
    teleport(snake);
    eat(snake, apple1, life);
    eat(snake, apple2, life);
}

function moveDown(snake) {
    snake.position.y++;
    teleport(snake);
    eat(snake, apple1, life);
    eat(snake, apple2, life);
}

function moveUp(snake) {
    snake.position.y--;
    teleport(snake);
    eat(snake, apple1, life);
    eat(snake, apple2, life);
}
function stop(snake) {
    snake.direction = DIRECTION.STOP;
}

function checkCollision(snakes) {
  let isCollide = false;
  //this
  for (let i = 0; i < snakes.length; i++) {
      for (let j = 0; j < snakes.length; j++) {
          for (let k = 1; k < snakes[j].body.length; k++) {
              if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                  isCollide = true;
              }
          }
      }
  }
  if (isCollide) {
      var audio = new Audio('assets/game_over.wav');
      audio.play();

      alert("Game over");
      getStarted();
  }
  return isCollide;
}

function move(snake) {
    if (isWin == 1) {
        alert("You still Win the Game");
        return;
      }  
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    setTimeout(function() {
      move(snake);
    }, M=snake.move);
}
function moveBody(snake) {
  snake.body.unshift({ x: snake.position.x, y: snake.position.y });
  snake.body.pop();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        snake1.direction = DIRECTION.LEFT;
    } else if (event.key === "ArrowRight") {
        snake1.direction = DIRECTION.RIGHT;
    } else if (event.key === "ArrowUp") {
        snake1.direction = DIRECTION.UP;
    } else if (event.key === "ArrowDown") {
        snake1.direction = DIRECTION.DOWN;
    }

})

move(snake1);
