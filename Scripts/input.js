export function setupInput(snake) {
    document.addEventListener('keydown', e => {
        // console.log('touche:', e.key);

        switch (e.key) {
            case 'ArrowUp':
                snake.setDirection(0, -1);
                break;
            case 'ArrowDown':
                snake.setDirection(0, 1);
                break;
            case 'ArrowLeft':
                snake.setDirection(-1, 0);
                break;
            case 'ArrowRight':
                snake.setDirection(1, 0);
                break;
        }
    });
}