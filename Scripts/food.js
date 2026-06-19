export class Food {
    constructor() {}

    respawn(cols, rows) {
        this.position = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };
    }

    spawn(cols, rows) {
        this.respawn(cols, rows);
    }

    draw(ctx, CELL) {
        ctx.fillStyle = 'red';
        ctx.fillRect(
            this.position.x * CELL,
            this.position.y * CELL,
            CELL,
            CELL
        );
    }
}