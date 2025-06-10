// ======== ИГРА "СИГАРЕТНЫЙ КЛИКЕР" ========
let cigarettesClicked = 0;

function startClickerGame() {
    // Скрываем основной интерфейс
    document.querySelector('.main').style.display = 'none';
    
    // Создаем игровое поле
    const gameHTML = `
        <div class="game-screen">
            <h2>Уничтожь сигареты!</h2>
            <p>Кликов: <span id="clicks">0</span></p>
            <div id="cigarette" style="width: 50px; height: 100px; background: #eee; margin: 20px auto; cursor: pointer;"></div>
            <button class="btn" onclick="endGame()">Вернуться</button>
        </div>
    `;
    document.querySelector('.container').innerHTML += gameHTML;

    // Логика кликов
    document.getElementById('cigarette').addEventListener('click', () => {
        cigarettesClicked++;
        document.getElementById('clicks').textContent = cigarettesClicked;
        
        // Анимация "взрыва" сигареты
        const cig = document.getElementById('cigarette');
        cig.style.transform = 'scale(1.1)';
        setTimeout(() => cig.style.transform = 'scale(1)', 200);
        
        // Каждые 10 кликов = +1 ДК
        if (cigarettesClicked % 10 === 0) {
            dragonClaws++;
            localStorage.setItem('dragonClaws', dragonClaws);
            alert(`+1 Драконьий Коготь! Теперь их: ${dragonClaws}`);
        }
    });
}

function endGame() {
    // Возвращаем основной интерфейс
    document.querySelector('.game-screen').remove();
    document.querySelector('.main').style.display = 'grid';
    updateUI();
}