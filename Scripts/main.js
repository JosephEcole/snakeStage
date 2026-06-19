import { Snake } from './snake.js';
import { Food } from './food.js';
import { setupInput } from './input.js';

const canvas = document.getElementById("game");
console.log("canvas =", canvas);

const ctx = canvas.getContext("2d");

const CELL = 20;
let cols, rows;
let snake, food;

function update() {
    snake.move();

    if (snake.headIsAt(food.position)) {
        snake.grow();
        food.respawn(cols, rows);
    }

    if (snake.isDead(cols, rows)) {
        gameOver();
    }
}

function gameOver() {
    alert("Game Over!");
    snake = new Snake();
    food.respawn(cols, rows);
}

function drawGrid() {
    ctx.strokeStyle = "#333"; // couleur de la grille
    ctx.lineWidth = 1;

    // lignes verticales
    for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL, 0);
        ctx.lineTo(x * CELL, canvas.height);
        ctx.stroke();
    }

    // lignes horizontales
    for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL);
        ctx.lineTo(canvas.width, y * CELL);
        ctx.stroke();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();            // ← ajoute la mini-grille
    snake.draw(ctx, CELL);
    food.draw(ctx, CELL);
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

function resize() {
    canvas.width = Math.floor(window.innerWidth / CELL) * CELL;
    canvas.height = Math.floor(window.innerHeight / CELL) * CELL;

    cols = canvas.width / CELL;
    rows = canvas.height / CELL;
}

function init() {
    window.addEventListener("resize", resize);
    resize();

    snake = new Snake();
    food = new Food();

    food.spawn(cols, rows);
    setupInput(snake);
    gameLoop();
}

// attends que le DOM soit complètement chargé avant d'initialiser le jeu
document.addEventListener("DOMContentLoaded", () => {
    init();
});
