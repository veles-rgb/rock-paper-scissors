let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
let winner = null;
let winnerScore = null;
let loserScore = null;

const playerBtn = document.querySelector(".player-btn");
const playerDisplay = document.querySelector("#player-display h2")
const computerDisplay = document.querySelector("#computer-display h2")
const playerScoreTxt = document.querySelector("#player-score h2")
const computerScoreTxt = document.querySelector("#computer-score h2")
const roundResult = document.querySelector(".round-result")
const roundResultTxt = document.querySelector(".round-result h2")

const getComputerChoice = function() {
    let choice = null;
    choice = Math.floor(Math.random() * 3);
    if (choice === 0) {
        choice = "rock";
        computerDisplay.innerHTML = '<i class="fa-solid fa-hand-back-fist"></i>';
    } else if (choice === 1) {
        choice = "paper";
        computerDisplay.innerHTML = '<i class="fa-solid fa-scroll"></i>';
    } else {
        choice = "scissors";
        computerDisplay.innerHTML = '<i class="fa-solid fa-scissors">';
    }
    
    return choice;
};

function getPlayerChoice(btn) {
    const btnId = btn.getAttribute('id');
    if (btnId === "rock") {
        return "rock";
    } else if (btnId === "paper") {
        return "paper";
    } else if (btnId === "scissors") {
        return "scissors";
    }
    return null;
}

const setPlayerDisplay = function(playerChoice) {
    if (playerChoice === "rock") {
        playerDisplay.innerHTML = '<i class="fa-solid fa-hand-back-fist">';
    } else if (playerChoice === 'paper') {
        playerDisplay.innerHTML = '<i class="fa-solid fa-scroll"></i>';
    } else if (playerChoice === 'scissors') {
        playerDisplay.innerHTML = '<i class="fa-solid fa-scissors"></i>';
    }
};

const checkWinner = function() {
    if (playerScore > computerScore) {
        winner = "Player";
        winnerScore = playerScore
        loserScore = computerScore
        return winner;
    } else if (computerScore > playerScore) {
        winner = "Computer";
        winnerScore = computerScore
        loserScore = playerScore
        return winner;
    };
};

const playRound = function(computerChoice, playerChoice) {
    const newH2 = document.createElement("h2");
    if (
        (computerChoice == "rock" && playerChoice == "scissors") ||
        (computerChoice == "scissors" && playerChoice == "paper") ||
        (computerChoice == "paper" && playerChoice == "rock")
    ) {
        computerScore++;
        roundResult.appendChild(newH2);
        newH2.textContent = `Round ${currentRound}: Computer wins the round (${computerChoice} beats ${playerChoice})`;
    } else if (
        (playerChoice == "rock" && computerChoice == "scissors") ||
        (playerChoice == "scissors" && computerChoice == "paper") ||
        (playerChoice == "paper" && computerChoice == "rock")
    ) {
        playerScore++;
        roundResult.appendChild(newH2);
        newH2.textContent = `Round ${currentRound}: Player wins the round (${playerChoice} beats ${computerChoice})`;
    } else if (computerChoice == playerChoice || playerChoice == computerChoice) {
        roundResult.appendChild(newH2);
        newH2.textContent = `Round ${currentRound}: Round tie!`;
    } else {
        console.log("Invalid input.");
    };
    roundResult.insertBefore(newH2, roundResult.firstChild);
};

const checkScore = function() {
    const newH2 = document.createElement("h2");
    if (playerScore == 5 || computerScore == 5) {
        checkWinner()
        roundResult.appendChild(newH2);
        newH2.textContent = `${winner} wins the game: ${winnerScore} to ${loserScore}`
        roundResult.insertBefore(newH2, roundResult.firstChild)
        document.querySelectorAll(".player-btn").forEach(pbtn => {
            pbtn.disabled = true;
        })
        addResetBtn();
    } else {
        return
    };
}

const addResetBtn = function() {
    const replayButton = document.createElement("button")
    roundResult.appendChild(replayButton);
    replayButton.textContent = "REPLAY";
    replayButton.classList.add("replay-btn");
    replayButton.addEventListener("click", () => {
        resetGame()
    })
    roundResult.insertBefore(replayButton, roundResult.firstChild);
}

const resetGame = function() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
    playerScoreTxt.textContent = `Player: ${playerScore}`;
    computerScoreTxt.textContent = `Computer: ${computerScore}`;
    playerDisplay.textContent = "";
    computerDisplay.textContent = "";
    document.querySelectorAll(".player-btn").forEach(pbtn => {
        pbtn.disabled = false;
    })
    while (roundResult.firstChild) {
        roundResult.removeChild(roundResult.firstChild);
    }
};

document.querySelectorAll(".player-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const playerChoice = getPlayerChoice(btn);
        setPlayerDisplay(playerChoice);
        playRound(getComputerChoice(), playerChoice);
        playerScoreTxt.textContent = `Player: ${playerScore}`;
        computerScoreTxt.textContent = `Computer: ${computerScore}`;
        currentRound++;
        checkScore();
    });
});