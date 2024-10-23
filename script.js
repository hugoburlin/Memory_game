const animalImages = {
    'lion': 'https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg',
    'tiger': 'https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg',
    'elephant': 'https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg',
    'giraffe': 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Giraffe_Mikumi_National_Park.jpg',
    'monkey': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Barbary_Macaque_%28Macaca_sylvanus%29.jpg',
    'zebra': 'https://upload.wikimedia.org/wikipedia/commons/0/03/Zebra_Botswana_edit02.jpg',
    'panda': 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG',
    'kangaroo': 'https://upload.wikimedia.org/wikipedia/commons/0/06/Kangaroo_Australia_01_11_2008_-_retouch.JPG'
};

// Create pairs of animals by duplicating the array
let animalPairs = Object.keys(animalImages).concat(Object.keys(animalImages));

// Shuffle the animal pairs array
animalPairs.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function createBoard() {
    animalPairs.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;

        const img = document.createElement('img');
        img.src = animalImages[animal];
        img.alt = animal;

        card.appendChild(img);
        card.addEventListener('click', flipCard);

        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // First card clicked
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // Second card clicked
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

createBoard();
