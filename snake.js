let scl = 10;
let speed = 1.5;
let score = 0;
const ctx = document.querySelector('canvas').getContext('2d');
const audioBite = new Audio("./Resources/mixkit-chewing-something-crunchy-2244.wav");
const audioGameover = new Audio("./Resources/mixkit-funny-game-over-2878.wav");

let gameOver = false;
let int;

// Initialiser le serpent avec une classe
class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xdir = 1;
        this.ydir = 0;
        this.tail = [{x: this.x, y: this.y}];
    }

    //méthode pour faire bouger le serpent
    move() {
        this.update();
        this.show();
    }

    //méthode pour actualiser le déplacement du serpent
    update() {
        this.x = this.x + this.xdir*scl;
        this.y = this.y + this.ydir*scl;

        this.tail.push({x: this.x, y: this.y});
        this.tail.shift();
    }

    //méthode pour dessiner le serpent + actions pour ne pas revenir en arrière
    show() {
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillStyle = 'rgb(255,165,0)';
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
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

        for(let i = 1; i < this.tail.length; i++) {
            let part = this.tail[i];
            if(this.tail[0].x === part.x && this.tail[0].y === part.y) {
                gameOver = true;
            }
        }

        if (gameOver === true) {
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.font = '35px Verdana';
            ctx.fillText("Game Over!", 140, 240);
            audioGameover.play();
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
            snake.tail.push({x: this.x, y:this.y});
            audioBite.play();
            score ++;
            scoreDisplay.innerHTML = "Score: " + score;
        }
    }
}

let snake = new Snake();
let food = new Food();

function animLoop() {
    //
    // exec toutes les 100ms
    //

    ctx.clearRect(0, 0, 500, 500);  // 

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
