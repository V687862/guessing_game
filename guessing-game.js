const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let secretNumber;
let numAttempts;

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

let askRange = () => {
  r1.question("Enter a Minimum Number: ", min => {
    r1.question("Enter Maximum Number: ", max => {
      min = Number(min);
      max = Number(max);
      console.log(`I'm thinking of a number between ${min} and ${max}...`);
      secretNumber = randomInRange(Number(min), Number(max));
      askGuess();
    });
  });
};
let askLimit = () => {
  r1.question("Enter the number of attempts you'd like: ", attempts => {
    numAttempts = Number(attempts);
    askRange();
  });
}
askLimit();
