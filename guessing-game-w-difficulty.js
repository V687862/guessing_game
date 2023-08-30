const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let secretNumber;
let numAttempts;

const difficulties = {
  easy: {
    range: { min: 1, max: 10 },
    attempts: 5
  },
  medium: {
    range: { min: 1, max: 50 },
    attempts: 7
  },
  hard: {
    range: { min: 1, max: 100 },
    attempts: 5
  }
};

let checkGuess = guess => {
  if (guess === secretNumber) {
    console.log("Correct!");
    return true;
  }

  else if (guess < secretNumber) {
    console.log("Too low!");
    return false;
  }

  else if (guess > secretNumber) {
    console.log("Too high!");
    return false;
  }

}

let askGuess = () => {
  if (numAttempts <= 0) {
    console.log("You Lose");
    r1.close();
    return;
  }

  r1.question("Enter a guess: ", (guess) => {
    numAttempts--;
    let userGuess = Number(guess);
    if (checkGuess(userGuess)) {
      console.log("You win!");
      r1.close();
    } else {
      if (numAttempts > 0) {
        console.log(`Attempts left: ${numAttempts}`);
        askGuess();
      } else {
        console.log("You Lose");
        r1.close();
      }
    }
  });
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let askDifficulty = () => {
  r1.question("Choose a difficulty (easy, medium, hard): ", difficulty => {
    difficulty = difficulty.toLowerCase();
    if (difficulties[difficulty]) {
      let chosenDifficulty = difficulties[difficulty];
      numAttempts = chosenDifficulty.attempts;
      secretNumber = randomInRange(chosenDifficulty.range.min, chosenDifficulty.range.max);
      console.log(`I'm thinking of a number between ${chosenDifficulty.range.min} and ${chosenDifficulty.range.max}...`);
      askGuess();
    } else {
      console.log("Invalid difficulty choice. Please choose between easy, medium, or hard.");
      askDifficulty();
    }
  });
};

askDifficulty();
