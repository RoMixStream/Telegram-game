document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Размеры холста
    canvas.width = 400;
    canvas.height = 500;

    // Переменные игры
    let birdY = 200;
    let velocity = 0;
    let gravity = 0.5;
    let isGameOver = false;
    
    let obstacles = [];
    let frameCount = 0;
    let score = 0;

    // Загрузка изображения птицы
    const birdImg = new Image();
    birdImg.src = "bird.png"; // Убедись, что файл `bird.png` есть в проекте!

    // Обработка кликов и касаний
    function jump() {
        if (!isGameOver) {
            velocity = -8; // Прыжок вверх
        }
    }
    
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") jump();
    });

    document.addEventListener("mousedown", jump);
    document.addEventListener("touchstart", jump);

    function update() {
        if (isGameOver) return;

        // Обновление позиции птицы
        velocity += gravity;
        birdY += velocity;

        // Проверка столкновений с краями
        if (birdY > canvas.height || birdY < 0) {
            isGameOver = true;
        }

        // Генерация препятствий
        if (frameCount % 90 === 0) {
            let gapY = Math.random() * 200 + 50;
            obstacles.push({ x: canvas.width, gapY: gapY });
        }

        // Движение препятствий
        obstacles.forEach((obs) => {
            obs.x -= 2;
            if (
                (birdY < obs.gapY || birdY > obs.gapY + 120) &&
                obs.x < 60 && obs.x > 30
            ) {
                isGameOver = true;
            }
        });

        obstacles = obstacles.filter(obs => obs.x > -50);

        frameCount++;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Отрисовка птицы
        ctx.drawImage(birdImg, 50, birdY, 40, 40);

        // Отрисовка препятствий
        ctx.fillStyle = "green";
        obstacles.forEach((obs) => {
            ctx.fillRect(obs.x, 0, 50, obs.gapY);
            ctx.fillRect(obs.x, obs.gapY + 120, 50, canvas.height - obs.gapY - 120);
        });

        if (isGameOver) {
            ctx.fillStyle = "red";
            ctx.font = "30px Arial";
            ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
        }
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
function restartGame() {
    birdY = 200;
    velocity = 0;
    isGameOver = false;
    obstacles = [];
    frameCount = 0;
    score = 0;
    loop();
}

// Добавляем обработчик клика для рестарта
canvas.addEventListener("click", () => {
    if (isGameOver) {
        restartGame();
    } else {
        velocity = -8; // Прыжок
    }
});
