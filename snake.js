// Initialiser le serpent avec une classe
class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xdir = 1;
        this.ydir = 0;
    }
    start(){
        var self = this;
        setInterval(function(){self.move()}, 100); // Binding js. appel de méthode asynchrone https://stackoverflow.com/questions/2001920/calling-a-class-prototype-method-by-a-setinterval-event
    }

    move(){
        this.update();
        this.show();
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

function initGame () {
    let snake = new Snake();
    snake.start();
}

window.onload = function() {
    initGame()
};