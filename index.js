let taps = 0;
const maxTaps = 100;
const coin = document.getElementById("coin");
const counter = document.getElementById("counter");
const progressBar = document.getElementById("progress-bar");
const unlockMessage = document.getElementById("unlock-message");
const bgMusic = document.getElementById("bg-music");

coin.addEventListener("click", () => {
    taps++;
    counter.textContent = `Taps: ${taps}`;
    progressBar.value = taps;

    // Добавляем анимацию монеты
    coin.style.transform = `scale(1.1)`;
    setTimeout(() => coin.style.transform = `scale(1)`, 100);

    // Запускаем музыку при первом клике
    if (taps === 1) {
        bgMusic.play();
    }

    // Проверяем разблокировку
    if (taps >= maxTaps) {
        unlockMessage.classList.remove("hidden");
    }
});
