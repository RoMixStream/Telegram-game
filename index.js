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

    // Полный запрет двойного тапа и зума
    document.addEventListener("touchstart", (event) => {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    document.addEventListener("gesturestart", (event) => {
        event.preventDefault();
    });

    // Функция обработки кликов по монете
    function handleClick() {
        if (clickCount < maxClicks) {
            clickCount++;
            progressBar.style.width = (clickCount / maxClicks) * 100 + "%";
            counter.textContent = `${clickCount} / ${maxClicks}`;

            // Эффект дергания монеты
            coin.style.transform = `scale(1.15)`;
            setTimeout(() => coin.style.transform = `scale(1)`, 50);

            // Добавление блесток на монете
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

        // Корректное расположение блесток на монете
        let rect = coin.getBoundingClientRect();
        let x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 40;
        let y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 40;
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        setTimeout(() => sparkle.remove(), 500);
    }

    // Обработчик клика по монете
    coin.addEventListener("click", handleClick);
});
