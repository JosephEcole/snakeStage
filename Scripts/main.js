import { Snake } from './snake.js';
import { Food } from './food.js';
import { setupInput } from './input.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const CELL = 20;
let cols, rows;
let snake;

// nombre de nourritures voulues
const FOOD_COUNT = 10;
let foods = [];

function update() {
    snake.move();

    // vérifier chaque nourriture
    for (let i = 0; i < foods.length; i++) {
        if (snake.headIsAt(foods[i].position)) {
            snake.grow();
            foods[i].respawn(cols, rows);
        }
    }

    if (snake.isDead(cols, rows)) {
        gameOver();
    }
}

function gameOver() {
    alert("Game Over!");
    snake = new Snake();

    // respawn toutes les nourritures
    foods.forEach(f => f.respawn(cols, rows));
}

function drawGrid() {
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;

    for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL, 0);
        ctx.lineTo(x * CELL, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL);
        ctx.lineTo(canvas.width, y * CELL);
        ctx.stroke();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    snake.draw(ctx, CELL);

    // dessiner toutes les nourritures
    foods.forEach(f => f.draw(ctx, CELL));
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

    // créer N nourritures
    foods = [];
    for (let i = 0; i < FOOD_COUNT; i++) {
        const f = new Food();
        f.spawn(cols, rows);
        foods.push(f);
    }

    setupInput(snake);
    gameLoop();
}

document.addEventListener("DOMContentLoaded", init);