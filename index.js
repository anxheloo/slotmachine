// 1. Deposit some money
// 2.Determine number of lines to bet on
// 3. Collect a bet amount
// 4.Spin the slot machine
// 5.Check if the user won
// 6.Give the user their winnings
// 7. play again 

/* 1 way to create a function
function deposit(){
 return 1;
}
const myfunc = deposit()
console.log(myfunc);
*/

/*
The code you provided is using the require function 
to import a module called "prompt-sync" and assign it
to a constant variable named prompt.
In JavaScript, require is a function commonly used in
Node.js environments to load external modules or 
libraries into your code. It allows you to access 
the functionality provided by those modules.
*/
const prompt = require("prompt-sync")();

// going to step 4,we enter the global nr of rows for the slot machine
const ROWS = 3;
// going to step 4,we enter the global nr of columns for the slot machine
const COLS = 3;

// 
const SYMBOL_COUNT = {
     "A":2,
     "B":4,
     "C":6,
     "D":8
}

const SYMBOL_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}



// Step 1.
const deposit = () => {
while(true) {
    depositAmount = prompt("Enter a deposit amount:")
    numberDepositAmount = Number(depositAmount);
  //   const numberDepositAmount = parseFloat(depositAmount)
  
      if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
          console.log("Invalid deposit amount, try again!")
      } else {
        return numberDepositAmount;
      }
    }
}

//Step 2.
const getNumberOfLines = ()=> {
    while(true) {
        lines = prompt("Enter the number of lines to bet on (1-3): ")
        numberOfLines = Number(lines);
      
          if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
              console.log("Invalid number of lines, try again!")
          } else {
            return numberOfLines;
          }
        }

}

//Step 3.
const getBet = (balance, lines)=>{
    while(true) {
        bet = prompt("Enter the bet per line: ")
        numberBet = Number(bet);
      
          if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines){
              console.log("Invalid bet, try again!")
          } 
          else {
            return numberBet;
          }
        }
}

//Step 4
const spin = () =>{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0; i< count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0; i<COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }

    return reels;
}

const transpose = (reels) =>{
    const rows = [];

    for(let i = 0; i< ROWS; i++){
        rows.push([]);
        for(let j = 0; j< COLS; j++){
            rows[i].push(reels[j][i])
        }
    }

    return rows;
}

const printRows = (rows)=> {
    for(const row of rows){
        let rowString = "";
        for(const[i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

//STEP 5
const getWinnings = (rows, bet, lines)=>{
    let winnings = 0;
    for(let row =0; row< lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
        return winnings;
    }
}

//STEP 7.
const game = ()=>{

    let balance = deposit();

    while(true){
        console.log("You havbe a balance of $ " + balance)
        const nrOfLines = getNumberOfLines();
        const mybet = getBet(balance, nrOfLines);
        
        balance -= mybet * nrOfLines;

        const myreels = spin();
        const transposed = transpose(myreels);
        console.log(myreels)
        console.log(transposed);
        printRows(transposed);
        const winningss = getWinnings(transposed, mybet, nrOfLines)

        balance += winningss;

        console.log("You won, $" + winningss.toString())

        if(balance <= 0){
            console.log("You ran out of money!")
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)?")
        if(playAgain != "y") break;
    }

}

game();

