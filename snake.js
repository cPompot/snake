let scl = 10;
let speed = 1.5;
const snakeBody = [];
let tailLength = 2;
let score = 0;
const ctx = document.querySelector('canvas').getContext('2d');

let gameOver = false;
let int;

class SnakePart {
    constructor (x, y) {
    this.x = x;
    this.y = y;
    }
}

// Initialiser le serpent avec une classe
class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xdir = 1;
        this.ydir = 0;
    }

    //méthode pour faire bouger le serpent
    move() {
        this.show();
        this.update();
    }

    //méthode pour actualiser le déplacement du serpent
    update() {
        this.x = this.x + this.xdir*scl;
        this.y = this.y + this.ydir*scl;
    }

    //méthode pour dessiner le serpent + actions pour ne pas revenir en arrière
    show() {
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(this.x, this.y, scl, scl);

        /*ctx.fillStyle = 'rbg(0, 190, 0)';
        for (let i = 0; i < snakeBody.length; i++) {
            let bodyPart = snakeBody[i];
            ctx.fillRect(part.x, part.y, scl, scl);
        }

        snakeBody.push(new SnakePart(this.x, this.y));*/
    }

    moveLeft() {
        if (this.xdir == 1) {
            return;
        };
        this.xdir = -1;
        this.ydir = 0;
    }

    moveRight() {
        if (this.xdir == -1) {
            return;
        };
        this.xdir = 1;
        this.ydir = 0;
    }
    
    moveUp() {
        if (this.ydir == 1) {
            return;
        };
        this.xdir = 0;
        this.ydir = -1;
    }

    moveDown() {
        if (this.ydir == -1) {
            return;
        };
        this.xdir = 0;
        this.ydir = 1;
    }

    checkGameOver() {
        if (this.x < 0) {
            gameOver = true;
        } else if (this.y < 0) {
            gameOver = true;
        } else if (this.x > 500) {
            gameOver = true;
        } else if (this.y > 500) {
            gameOver = true;
        };

        if (gameOver === true) {
            console.log('hello');
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.font = 'Press Start 2P';
            ctx.fillText("Game Over!", 220, 230);
        }
    }
}



//pour associer les touches aux déplacements du serpent
document.onkeydown = function (el) {
    switch (el.key) {
      case 'ArrowLeft':
        snake.moveLeft();
        break;
      case 'ArrowRight':
        snake.moveRight();
        break;
      case 'ArrowUp':
        snake.moveUp();
        break;
      case 'ArrowDown':
        snake.moveDown();
        break;
    }
}

//Initialiser la nourriture avec une classe
class Food {
    constructor() {
        this.pickLocation();
    }

    show() {
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.fillRect(this.x, this.y, scl, scl);
    }

    //méthode pour choisir de manière aléatoire la position de la nourriture
    pickLocation() {
        let columns = Math.floor(500/scl);
        let rows = Math.floor(500/scl);
        this.x = columns*Math.floor(Math.random()*(500/columns)); // 50 * [1,10]
        this.y = rows*Math.floor(Math.random()*(500/rows));
    }

    //méthode pour vérifier si le serpent entre en collision avec la nourriture
    checkCollision() {
        if (this.x === snake.x && this.y === snake.y) {
            this.pickLocation();
            tailLength ++;
            score ++;
        }
    }
}

let snake = new Snake();
let food = new Food();

//Pour faire apparaître le score - NE MARCHE PAS
function drawScore () {
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.font = '10px Press Start 2P';
    ctx.fillText("Score " + score, 450, 10);
}

function animLoop() {
    //
    // exec toutes les 100ms
    //

    ctx.clearRect(0, 0, 500, 500);  // 

    drawScore();

    snake.checkGameOver();
    if (gameOver) {
        clearInterval(int)
        return
    }

    snake.move();
    

    food.checkCollision();
    food.show();

    
}


//Fonction pour jouer
function game() {
    int = setInterval(animLoop, 100*speed);
}

//appel de la fonction
game();
