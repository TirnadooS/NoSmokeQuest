// Данные игры
let daysWithoutSmoking = 0;
let dragonClaws = 0;
let cigarettesClicked = 0;

const motivations = [
    `Ты заработал ${Math.floor(daysWithoutSmoking * 1.5)} ДК!`,
    "Драконьи Когти твои! Продолжай!",
    "Каждый день без курения = +2 ДК к твоей силе!",
    "Никотин крадёт твои Когти! Не поддавайся!"
];

// Инициализация
function init() {
    loadProgress();
    setRandomMotivation();
}

// Загрузка прогресса
function loadProgress() {
    const savedDays = localStorage.getItem('noSmokeDays');
    const savedClaws = localStorage.getItem('dragonClaws');
    
    if (savedDays) daysWithoutSmoking = parseInt(savedDays);
    if (savedClaws) dragonClaws = parseInt(savedClaws);
    
    updateUI();
}

// Обновление интерфейса
function updateUI() {
    document.getElementById('days').textContent = daysWithoutSmoking;
    document.getElementById('dk-amount').textContent = dragonClaws;
    document.getElementById('progress').style.width = `${Math.min(daysWithoutSmoking * 5, 100)}%`;
}

// Случайная мотивация
function setRandomMotivation() {
    const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
    document.getElementById('motivation').textContent = randomMotivation;
}

// Добавить день
function addDay() {
    daysWithoutSmoking++;
    dragonClaws += 2;
    localStorage.setItem('noSmokeDays', daysWithoutSmoking);
    localStorage.setItem('dragonClaws', dragonClaws);
    updateUI();
    setRandomMotivation();
}

// Покупка улучшения
function buyPowerUp() {
    if (dragonClaws >= 5) {
        dragonClaws -= 5;
        localStorage.setItem('dragonClaws', dragonClaws);
        alert("Сила +5! Теперь ты можешь уничтожать 2 сигареты за клик!");
        updateUI();
    } else {
        alert("Недостаточно Драконьих Когтей!");
    }
}

// ======== ИГРА "СИГАРЕТНЫЙ КЛИКЕР" ========
function startClickerGame() {
    // Скрываем основной интерфейс
    document.querySelector('.main').style.display = 'none';
    
    // Создаем игровое поле
    const gameHTML = `
        <div class="game-screen">
            <h2>Уничтожь сигареты!</h2>
            <p>Кликов: <span id="clicks">0</span></p>
            <p>Драконьих Когтей: <span id="game-claws">${dragonClaws}</span> ДК</p>
            <div id="cigarette"></div>
            <button class="btn" onclick="endClickerGame()">Вернуться</button>
        </div>
    `;
    document.querySelector('.container').innerHTML += gameHTML;

    // Логика кликов
    document.getElementById('cigarette').addEventListener('click', () => {
        cigarettesClicked++;
        document.getElementById('clicks').textContent = cigarettesClicked;
        
        // Анимация
        const cig = document.getElementById('cigarette');
        cig.style.transform = 'scale(1.1)';
        setTimeout(() => cig.style.transform = 'scale(1)', 200);
        
        // Награда
        if (cigarettesClicked % 10 === 0) {
            dragonClaws++;
            localStorage.setItem('dragonClaws', dragonClaws);
            document.getElementById('game-claws').textContent = dragonClaws;
        }
    });
}

function endClickerGame() {
    // Возвращаем основной интерфейс
    document.querySelector('.game-screen').remove();
    document.querySelector('.main').style.display = 'grid';
    updateUI();
}

// Игра "Дыхание дракона" (заглушка)
function startDragonGame() {
    alert("Эта игра ещё в разработке! Попробуй кликер.");
}

// Запуск
window.onload = init;