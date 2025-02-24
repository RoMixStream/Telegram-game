document.addEventListener("DOMContentLoaded", () => {
    let clickCount = 0;
    const maxClicks = 100;
    const coin = document.getElementById("coin");
    const progressBar = document.getElementById("progress-bar");
    const counter = document.getElementById("counter");
    const lock = document.getElementById("lock");

    // Запрет контекстного меню (ПКМ)
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    // Запрет выделения текста и перетаскивания
    document.addEventListener("selectstart", (event) => {
        event.preventDefault();
    });

    document.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });

    // Запрет двойного тапа (увеличения экрана)
    let lastTouchEnd = 0;
    document.addEventListener("touchend", (event) => {
        let now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Функция обработки кликов по монете
    function handleClick() {
        if (clickCount < maxClicks) {
            clickCount++;
            progressBar.style.width = (clickCount / maxClicks) * 100 + "%";
            counter.textContent = `${clickCount} / ${maxClicks}`;

            // Эффект дергания монеты
            coin.style.transform = `scale(1.1)`;
            setTimeout(() => coin.style.transform = `scale(1)`, 100);

            // Добавление блесток
            createSparkles();

            // Проверка достижения цели
            if (clickCount === maxClicks) {
                lock.src = "unlocked.png"; // Меняем замок на открытый
            }
        }
    }

    // Функция создания блесток
    function createSparkles() {
        let sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        document.body.appendChild(sparkle);

        let x = coin.offsetLeft + Math.random() * coin.offsetWidth;
        let y = coin.offsetTop + Math.random() * coin.offsetHeight;
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        setTimeout(() => sparkle.remove(), 500);
    }

    // Обработчик клика по монете
    coin.addEventListener("click", handleClick);
});
