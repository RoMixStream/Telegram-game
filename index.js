let clickCount = 0;
const coin = document.getElementById("coin");
const progressBar = document.getElementById("progress");
const counter = document.getElementById("counter");
const lockIcon = document.getElementById("lock-icon");

coin.addEventListener("click", () => {
    clickCount++;
    
    // Обновление прогресса
    let progress = (clickCount / 100) * 100;
    progressBar.style.width = `${progress}%`;
    counter.textContent = `${clickCount} / 100`;

    // Анимация прыжка монеты
    coin.style.transform = "scale(1.1)";
    setTimeout(() => {
        coin.style.transform = "scale(1)";
    }, 100);

    // Добавление блесток
    createSparkle();

    // Проверка достижения 100 кликов
    if (clickCount >= 100) {
        lockIcon.src = "unlocked.png"; // Открываем замок
    }
});

// Функция создания блесток
function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    document.body.appendChild(sparkle);
    
    // Устанавливаем случайное положение около монеты
    const rect = coin.getBoundingClientRect();
    sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
    sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;

    setTimeout(() => {
        sparkle.remove();
    }, 800);
}

// CSS для блесток
const style = document.createElement("style");
style.textContent = `
    .sparkle {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: gold;
        border-radius: 50%;
        opacity: 1;
        animation: sparkleAnimation 0.8s ease-out;
    }

    @keyframes sparkleAnimation {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
`;
document.head.appendChild(style);

document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

document.addEventListener("mousedown", function(event) {
    event.preventDefault();
});

document.addEventListener("touchstart", function(event) {
    event.preventDefault();
});

document.addEventListener("selectstart", function(event) {
    event.preventDefault();
});

document.addEventListener("dragstart", function(event) {
    event.preventDefault();
});
