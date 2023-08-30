const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let secretNumber = 8;

let checkGuess = guess => {
  if(guess === secretNumber){
    console.log("Correct!");
    return true;
  }

  else if(guess < secretNumber){
    console.log("Too low!");
    return false;
  }

  else if(guess > secretNumber){
    console.log("Too high!");
    return false;
  }

}

let askGuess = () => {

  r1.question("Enter a guess: ", guess => {
    let userGuess = Number(guess);
    if(checkGuess(userGuess)){
      console.log("You win!");
      r1.close();
    }

    else{
      askGuess();
    }
  })
}

askGuess();
