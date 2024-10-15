// Get random computer choice for Rock, Paper or Scissors
function getComputerChoice() {
    let choice = null;
    choice = Math.floor(Math.random() * 3);
    if (choice == 0) {
        choice = "ROCK";
        return choice;
    } else if (choice == 1) {
        choice = "PAPER";
        return choice;
    } else {
        choice = "SCISSORS";
        return choice;
    }
}

// Prompt user to choose between Rock, Paper or Scissors
function getHumanChoice() {
    choice = prompt("Choose Rock, Paper or Scissors!").toUpperCase();
    if (choice == "ROCK") {
        return choice;
    } else if (choice == "PAPER") {
        return choice;
    } else if (choice == "SCISSORS") {
        return choice;
    } else {
        alert("Invalid input, please choose between Rock, Paper or Scissors");
    }
}

// Play a single round logic
function playRound(computerChoice, humanChoice) {
    if (
        (computerChoice == "ROCK" && humanChoice == "SCISSORS") ||
        (computerChoice == "SCISSORS" && humanChoice == "PAPER") ||
        (computerChoice == "PAPER" && humanChoice == "ROCK")
    ) {
        console.log(`Round lost! ${computerChoice} beats ${humanChoice}`);
        computerScore++;
        console.log(`Computer Score: ${computerScore}`);
        console.log(`Your score: ${humanScore}`);
        console.log(" ");
        return;
    } else if (
        (humanChoice == "ROCK" && computerChoice == "SCISSORS") ||
        (humanChoice == "SCISSORS" && computerChoice == "PAPER") ||
        (humanChoice == "PAPER" && computerChoice == "ROCK")
    ) {
        console.log(`Round win! ${humanChoice} beats ${computerChoice}`);
        humanScore++;
        console.log(`Computer Score: ${computerScore}`);
        console.log(`Your score: ${humanScore}`);
        console.log(" ");
        return;
    } else if (computerChoice == humanChoice || humanChoice == computerChoice) {
        console.log("Round tie! No one gains points.");
        console.log(" ");
        return;
    } else {
        console.log("Invalid input, please choose between Rock, Paper or Scissors");
        console.log(" ");
        playRound(getComputerChoice(), getHumanChoice());
        return;
    }
}

function checkWinner(computer, human) {
    if (computer > human) {
        console.log("You lost the game! Better luck next time chum.");
        return;
    } else if (human > computer) {
        console.log("You won the game! Good job!");
        return;
    } else {
        console.log("Its a tie game!");
        return;
    }
}

// Play entire game logic
function playGame() {
    humanScore = 0;
    computerScore = 0;
    for (let i = 0; i < 5; i++) {
        playRound(getComputerChoice(), getHumanChoice());
    }
    checkWinner(computerScore, humanScore);
}

playGame();