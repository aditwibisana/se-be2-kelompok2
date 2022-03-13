const CELL_SIZE = 20;
const CANVAS_SIZE = 400;
//made faster
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
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

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

let snake1 = {
    color: "purple",
    position: initPosition(),
    direction: initDirection(),
    score: 0,
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
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        drawCell(ctx, snake1.position.x, snake1.position.y, snake1.color);
        
        drawApple(ctx, apple1.position.x, apple1.position.y, apple1.color);
        drawApple(ctx, apple2.position.x, apple2.position.y, apple2.color);

        if(PRIMA.includes(snake1.score)){
            drawLife(ctx, life.position.x, life.position.y, life.color);
        }
        
        drawScore(snake1);
       

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
        snake.position.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.position.y >= HEIGHT){
        snake.position.y = 0
    }
}


function eat(snake, apple, life) {
    if (snake.position.x == apple.position.x && snake.position.y == apple.position.y) {
        apple.position = initPosition();
        snake.score++;
        
        if (snake.score % 5 == 0) { 
            MOVE_INTERVAL -= 30;
            //console.log("now speed : " + MOVE_INTERVAL);            
        }
    }

    if (snake.position.x == life.position.x && snake.position.y == life.position.y) {
        life.position = initPosition();
        snake.score++;
        
        if (snake.score % 5 == 0) { 
            MOVE_INTERVAL -= 30;           
        }

    }
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

function move(snake) {
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
    setTimeout(function() {
        move(snake);
    }, MOVE_INTERVAL);
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
