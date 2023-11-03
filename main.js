function createNumbersArray(count) {
    let arr = [];
    for (let i = 1; i <= count; i++) {
        arr.push(i);
        arr.push(i);  
    }
    return arr;
}

function shuffle(arr) {
    let i = arr.length;
    while (--i > 0) {
        let j = Math.floor(Math.random()*(i+1));
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
}

function createShuffledArray(count) {
    let arr = createNumbersArray(count);
    shuffle(arr);
    return arr;
}

function createCard(number) {
    let card = document.createElement('div');    
    card.textContent = number;
    card.classList.add('card');

    card.addEventListener('click', function() {
        let uncoveredCard = document.querySelectorAll('.uncovered');
        if (uncoveredCard.length > 1) {
            for (let i of uncoveredCard) {
                i.classList.toggle('uncovered');
                i.style.pointerEvents = "auto";
            }
        }
        else {uncoveredCard = document.querySelector('.uncovered')}
        card.classList.toggle('uncovered');
        card.style.pointerEvents = "none";

        if (uncoveredCard) {       
            if (uncoveredCard.textContent === card.textContent) {
                card.classList.add('successfully-uncovered');
                card.style.pointerEvents = "none";
                uncoveredCard.classList.add('successfully-uncovered');
                uncoveredCard.style.pointerEvents = 'none';
                card.classList.toggle('uncovered');
                uncoveredCard.classList.toggle('uncovered')
            }
        }
    })

    return card;
}

function restartGame(container, element=undefined) {
    container.classList.remove('grid')
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    if (element) {document.body.removeChild(element)}
    createFormAndButton(container)
}

function createButtonReplay(container) {
    let button = document.createElement('button');
    button.classList.add('btn', 'btn-success');
    button.textContent = 'Начать новую игру'
    button.addEventListener('click', function() {
        restartGame(container, button)
    })
    return button;
}

function createFormAndButton(container) {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let button = document.createElement('button');
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper')
    form.classList.add('form')
    input.classList.add('input')
    input.placeholder = 'Количество карточек по вертикали/горизонтали';
    button.textContent = 'Начать игру';
    button.classList.add('btn', 'btn-primary')
    form.append(input);
    form.append(button);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let count = input.value;
        if (count % 2 != 0 || count < 2 || count > 10) {
            count = 4;
        }
        container.style.setProperty('--count', count)
        container.removeChild(wrapper);
        startGame(count * (count / 2), container)
    })

    wrapper.append(form);
    container.appendChild(wrapper);
}

function startGame(count, container) {
    container.classList.add('grid')
    let arr = createShuffledArray(count);
    for (let i of arr) {
        let card = createCard(i);
        card.addEventListener('click', function() {
            if (document.querySelectorAll('.successfully-uncovered').length === count * 2) {
                let button = createButtonReplay(container);
                document.body.appendChild(button);
                clearTimeout();
            }
        })
        container.appendChild(card);
    }
    setTimeout(function() {
        alert('Время вышло');
        restartGame(container)
    }, 60000);
}

document.addEventListener('DOMContentLoaded', () => {
    let container = document.querySelector(`.container`);
    createFormAndButton(container);
});

