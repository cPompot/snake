let scl = 10;

// Initialiser le serpent avec une classe
class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xdir = 1;
        this.ydir = 0;
    }

    //méthode pour faire un appel de méthode asynchrone
    start(){
        var self = this;
        setInterval(function() {
            self.move()
        }, 100); //Binding js. https://stackoverflow.com/questions/2001920/calling-a-class-prototype-method-by-a-setinterval-event
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
        //pour contenir dans le cadre (entre 0 et la largeur - l'échelle)
        if (this.x > 490) {
            this.x = 490;
        }
        if (this.x < 0) {
            this.x = 10;
        }
        if (this.y < 0) {
            this.y = 10;
        }
        if (this.y > 490) {
            this.y = 490;
        }
    }

    //méthode pour dessiner le serpent
    show() {
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(this.x, this.y, scl, scl);
    }

    moveLeft() {
        this.xdir = -1;
        this.ydir = 0;
    }

    moveRight() {
        this.xdir = 1;
        this.ydir = 0;
    }
    
    moveUp() {
        this.xdir = 0;
        this.ydir = -1;
    }

    moveDown() {
        this.xdir = 0;
        this.ydir = 1;
    }
}

let snake = new Snake();

function initGame () {
    snake.start();
}

//appel de la fonction
initGame();

//pour associer les touches aux déplacements du serpent
document.onkeydown = function (el) {
    switch (el.keyCode) {
      case 37:
        snake.moveLeft();
        break;
      case 39:
        snake.moveRight();
        break;
      case 38:
        snake.moveUp();
        break;
      case 40:
        snake.moveDown();
        break;
    }
}

class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    show() {
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.fillStyle = 'rgb(255,0,100)';
        ctx.fillRect(this.x, this.y, scl, scl);
    }
}