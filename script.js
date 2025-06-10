// ====== КОД ДЛЯ ИГРЫ "СИГАРЕТНЫЙ КЛИКЕР" ======
let cigarettesClicked = 0;

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
    document.getElementById('cigarette').addEventListener('click', (e) => {
        cigarettesClicked++;
        document.getElementById('clicks').textContent = cigarettesClicked;
        
        // Создаем эффект пепла
        const ash = document.createElement('div');
        ash.className = 'ash';
        ash.style.left = `${e.clientX - 5}px`;
        ash.style.top = `${e.clientY - 5}px`;
        document.body.appendChild(ash);
        setTimeout(() => ash.remove(), 1000);
        
        // Награда за каждые 10 кликов
        if (cigarettesClicked % 10 === 0) {
            dragonClaws++;
            localStorage.setItem('dragonClaws', dragonClaws);
            document.getElementById('game-claws').textContent = dragonClaws;
            
            // Эффект получения награды
            const reward = document.createElement('div');
            reward.className = 'reward-effect';
            reward.textContent = '+1 ДК';
            document.querySelector('.game-screen').appendChild(reward);
            setTimeout(() => reward.remove(), 1500);
        }
    });
}

function endClickerGame() {
    // Возвращаем основной интерфейс
    document.querySelector('.game-screen').remove();
    document.querySelector('.main').style.display = 'grid';
    updateUI();
}