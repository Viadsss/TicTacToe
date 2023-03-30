const menuSection = document.querySelector('.menu');
const gameSection = document.querySelector('.page');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const playerText = document.getElementById('playerText');
const boxes = Array.from(document.getElementsByClassName('box'));
const gameBoard = document.querySelector('.gameboard');

let currentPlayer = 'X';
let winnerFound = false;
let firstPlayerScore = 0;
let secondPlayerScore = 0;
let selectedMode = 'AI';
let boardData = [
  '', '', '',
  '', '', '',
  '', '', ''
]


startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame)
gameBoard.addEventListener('click', addMove);


function init() {
  gameMode();
}

function gameMode() {
  let cardOptions = document.querySelector('.card-options');
  let imageMode = document.querySelector('.player__second');
  let aiMode = document.querySelector('.ai-mode');
  let playerMode = document.querySelector('.player-mode');

  cardOptions.addEventListener('click', (e) => {
    let mode = cardOptions.dataset.mode
    mode = e.target.innerText;

    if (mode === 'AI') {
      imageMode.src = "https://giphy.com/embed/xT77XUw1XMVGIxgove";
      aiMode.style.color = 'black';
      playerMode.style.color = '#CECECE';
    } else {
      imageMode.src = "https://giphy.com/embed/l41lGnxllmN3YqOyI";
      playerMode.style.color = 'black';
      aiMode.style.color = '#CECECE';
    }
    selectedMode = mode;
  });

}

function startGame() {
  menuSection.style.display = "none";
  gameSection.style.display = "block";
  let imageMode = gameSection.querySelector('.player__second');
  if (selectedMode === 'AI') {
    imageMode.src = "https://giphy.com/embed/xT77XUw1XMVGIxgove";
  } else {
    imageMode.src = "https://giphy.com/embed/l41lGnxllmN3YqOyI";
  }

}

function addMove(event) {
  id = parseInt(event.target.id);
  if (boardData[id] === '' && boxes[id].textContent === '') {
    boardData[id] = currentPlayer;
    
    if (currentPlayer === 'X') {
      boxes[id].classList.add('red-box')
    } else {
      boxes[id].classList.add('blue-box');
    }
    
    boxes[id].textContent = currentPlayer;

    winStatus();
    switchPlayer();

    if (selectedMode === 'AI' && !winnerFound) {
      fillRandom(boardData);
      winStatus();
      switchPlayer(); 
    }
    checkDraw();
  
  }
}

function switchPlayer() {
  currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
}

function checkDraw() {
  let filled = boardData.every(item => item !== '');

  if (filled && !winnerFound) {
    playerText.textContent = "It's a DRAW!";
  } else if (!winnerFound) {
    playerText.textContent = `It's ${currentPlayer} turn`;
  }
}

function winStatus() {
  let winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  winPatterns.some((pattern) => {
    [a, b, c] = pattern;

    if (boardData[a] !== '') {
      if (boardData[a] === boardData[b] && boardData[b] === boardData[c]) {
        playerText.textContent = `${currentPlayer} Wins!`;
        winnerFound = true;
        updateScore();
        stopGame();
        return true;
      }
    }
    return false;
  });

}

function updateScore() {
  let playerOne = gameSection.querySelector('.player-1');
  let playerTwo = gameSection.querySelector('.player-2');

  if (currentPlayer === 'X') {
    firstPlayerScore += 1;
    playerOne.innerText = firstPlayerScore;
  } else {
    secondPlayerScore += 1;
    playerTwo.innerText = secondPlayerScore;
  }
}

function stopGame() {
  if (winnerFound) {
    gameBoard.removeEventListener('click', addMove);
  }
}


function restartGame() {
  boxes.forEach((box) => {
    box.classList.remove('red-box');
    box.classList.remove('blue-box');
    box.textContent = '';
  })

  boardData = [
    '', '', '',
    '', '', '',
    '', '', ''
  ]

  playerText.textContent = "Tic Tac Toe";
  currentPlayer = 'X';
  winnerFound = false;

  gameBoard.addEventListener('click', addMove);
}

function fillRandom(boardData) {
  const randomIndex = Math.floor(Math.random() * boardData.length);
  let filled = boardData.every(item => item !== '');


  if (boardData[randomIndex] === '') {
    boardData[randomIndex] = currentPlayer;
    boxes[randomIndex].classList.add('blue-box');
    boxes[randomIndex].textContent = currentPlayer;
  } else if (!filled) {
    fillRandom(boardData);
  }


}


init();

