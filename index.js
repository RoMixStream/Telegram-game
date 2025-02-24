document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Настройки холста
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

    // Обработка нажатий на клавишу
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            velocity = -8;
        }
    });

    function update() {
        if (isGameOver) return;

        // Обновление позиции птицы
        velocity += gravity;
        birdY += velocity;

        // Проверка столкновений с краями экрана
        if (birdY > canvas.height || birdY < 0) {
            isGameOver = true;
        }

        // Генерация препятствий
        if (frameCount % 90 === 0) {
            let gapY = Math.random() * 200 + 50;
            obstacles.push({ x: canvas.width, gapY: gapY });
        }

        // Движение и удаление старых препятствий
        obstacles = obstacles.map(obs => ({ ...obs, x: obs.x - 3 })).filter(obs => obs.x > -50);

        // Проверка столкновений с препятствиями
        for (let obs of obstacles) {
            if (obs.x < 50 && obs.x > 0) {
                if (birdY < obs.gapY || birdY > obs.gapY + 100) {
                    isGameOver = true;
                }
            }
        }

        frameCount++;
        score++;
    }

    function draw() {
        // Очистка экрана
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Отрисовка птицы
        ctx.fillStyle = "red";
        ctx.fillRect(50, birdY, 20, 20);

        // Отрисовка препятствий
        ctx.fillStyle = "green";
        for (let obs of obstacles) {
            ctx.fillRect(obs.x, 0, 50, obs.gapY);
            ctx.fillRect(obs.x, obs.gapY + 100, 50, canvas.height - obs.gapY - 100);
        }

        // Отрисовка счета
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, 10, 20);

        // Сообщение о проигрыше
        if (isGameOver) {
            ctx.fillStyle = "black";
            ctx.font = "30px Arial";
            ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
        }
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
