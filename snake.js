var snake;

//initialiser le serpent avec une classe
class SnakeCreation {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xdir = 1;
        this.ydir= 0;
    }

    //méthode pour actualiser le déplacement du serpent
    update() {
        this.x = this.x + this.xdir;
        this.y = this.y + this.ydir;
    }

    //méthode pour dessiner le serpent
    show() {
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(this.x, this.y, 5, 5);
    }
}

//créer un serpent
function setup() {
    snake = new SnakeCreation();
}

//faire apparaître le serpent
function draw() {
    snake.update();
    snake.show();
}