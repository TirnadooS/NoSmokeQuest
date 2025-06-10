// Данные игры
let daysWithoutSmoking = 0;
let dragonClaws = 0;

const motivations = [
    `Ты заработал ${daysWithoutSmoking * 2} ДК!`,
    "Драконьи Когти твои! Продолжай!",
    "Каждый день без курения = +2 ДК!",
    "Никотин крадёт твои Когти! Не сдавайся!"
];

const rewards = [
    { days: 1, text: "🎖️ Новичок", unlocked: false },
    { days: 3, text: "🏅 Боец", unlocked: false },
    { days: 7, text: "🏆 Победитель", unlocked: false }
];

// Загрузка сохранений
function loadProgress() {
    daysWithoutSmoking = parseInt(localStorage.getItem('noSmokeDays')) || 0;
    dragonClaws = parseInt(localStorage.getItem('dragonClaws')) || 0;
    
    document.getElementById('days').textContent = daysWithoutSmoking;
    document.getElementById('dk-amount').textContent = dragonClaws;
    document.getElementById('progress').style.width = `${daysWithoutSmoking * 10}%`;
}

// Добавление дня
function addDay() {
    daysWithoutSmoking++;
    dragonClaws += 2;
    
    localStorage.setItem('noSmokeDays', daysWithoutSmoking);
    localStorage.setItem('dragonClaws', dragonClaws);
    
    updateUI();
}

// Покупка улучшения
function buyPowerUp() {
    if (dragonClaws >= 5) {
        dragonClaws -= 5;
        localStorage.setItem('dragonClaws', dragonClaws);
        alert("Сила +5! Теперь ты сильнее!");
        updateUI();
    } else {
        alert("Недостаточно Драконьих Когтей!");
    }
}

// Обновление интерфейса
function updateUI() {
    document.getElementById('days').textContent = daysWithoutSmoking;
    document.getElementById('dk-amount').textContent = dragonClaws;
    document.getElementById('progress').style.width = `${daysWithoutSmoking * 10}%`;
    
    // Рандомная мотивация
    const randomIndex = Math.floor(Math.random() * motivations.length);
    document.getElementById('motivation').textContent = motivations[randomIndex];
    
    // Проверка наград
    rewards.forEach(reward => {
        if (daysWithoutSmoking >= reward.days && !reward.unlocked) {
            reward.unlocked = true;
            alert(`Получена награда: ${reward.text}`);
        }
    });
}

// Запуск игры
function startGame(gameName) {
    alert(`Игра "${gameName}" в разработке! Скоро будет доступна.`);
    // window.location.href = `games/${gameName}.html`;
}

// Инициализация
window.onload = loadProgress;