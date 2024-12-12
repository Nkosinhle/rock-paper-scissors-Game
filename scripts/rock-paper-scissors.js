let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlay = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlay){
   
    intervalId = setInterval(() =>{
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;

    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';

  }else{
    clearInterval(intervalId);
    isAutoPlay = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () =>{
  playGame('rock');
})

document.querySelector('.js-paper-button').addEventListener('click', () =>{
  playGame('paper');
})

document.querySelector('.js-scissors-button').addEventListener('click', () =>{
  playGame('scissors');
})

document.body.addEventListener('keydown', (event) =>{
  if(event.key === 'r'){
    playGame('rock');
  } else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors')
  }else if(event.key === 'a'){
    autoPlay();
  }else if(event.key=== 'Backspace'){
    showResetConfirmation();
  }
});

document.querySelector('.js-auto-play-button').addEventListener('click', ()=> {
  autoPlay();
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML =`${result}`;

  document.querySelector('.js-moves').innerHTML = 
  `You <img class="move-image" src="images/${playerMove}-emoji.png">
  <img class="move-image" src="images/${computerMove}-emoji.png">
  Computer`;
};

document.querySelector('.js-reset-score-button').addEventListener('click', () =>{
  showResetConfirmation();
});

function showResetConfirmation(){
  document.querySelector('.js-reset-confirmation').innerHTML =`Are you sure you want to reset the score?
  <button class ="js-reset-yes
  ">Yes</button>
  <button class = "js-reset-no
  ">No</button>
  `;


document.querySelector('.js-reset-yes').addEventListener('click', () =>{
  resetScore();
  hideReset();
});

document.querySelector('.js-reset-no').addEventListener('click', () =>{
  hideReset();
})
}

function hideReset(){
  document.querySelector('.js-reset-confirmation').innerHTML = '';
}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

document.querySelector('.js-reset-score-button').addEventListener('click', ()=>{
  showResetConfirmation();
})

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}