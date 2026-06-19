export class Snake {
    constructor() {
    this.body = [{ x: 5, y: 5 }];
    this.direction = { x: 1, y: 0 };
    this.growth = 0;
    }

    grow() {
        this.growth++;
    }

    move() {
        const head = this.body[0];

        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };

        this.body.unshift(newHead);

        if (this.growth > 0) {
            this.growth--;
        } else {
            this.body.pop();
        }
    }

    setDirection(x, y) {
    // empêche demi-tour
    if (this.direction.x === -x && this.direction.y === -y) return;

    this.direction = { x, y };
    }


    draw(ctx, CELL) {
        this.body.forEach(segment => {
            ctx.fillRect(segment.x * CELL, segment.y * CELL, CELL, CELL);
        });
    }

    headIsAt(position) {
        const head = this.body[0];
        return head.x === position.x && head.y === position.y;
    }

    isDead(cols, rows) {
        const head = this.body[0];

        // murs
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
            return true;
        }

        // corps
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].x === head.x && this.body[i].y === head.y) {
                return true;
            }
        }

        return false;
    }
}