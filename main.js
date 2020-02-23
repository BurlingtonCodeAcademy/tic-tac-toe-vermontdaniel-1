//Variables **********************************************************************************************************************************************

//Game setup variables------------------------------------------------------------------------------------------------------------------------------------
let onePlayerButton = document.getElementById('player-one'); //Button
let twoPlayerButton = document.getElementById('player-two'); //Button
let status = document.getElementById('status'); // Used to display text above buttons
let resetButton = document.getElementById('reset'); //button
let gameBoard = document.getElementsByClassName('board'); // class, contains all cell <div>s
let inputPlayerOne = document.getElementById('player-one-name'); // input field
let inputPlayerTwo = document.getElementById('player-two-name'); // input field
let timeDiv = document.getElementById('time'); // Used to display time
let playerOneName = ''; // stores player one name
let playerTwoName = ''; // stores player two name
let secOnes = 0; //second in ones spot for game timer
let secTens = 0; //second in tens spot for game timer
let minOnes = 0; //minute in ones spot for game timer
let minTens = 0; //minute in tens spot for game timer
let hourOnes = 0; //hour in ones spot for game timer
let hourTens = 0; //hour in tens spot for game timer
let timeInterval = '';

//Set Cells to Variables ---------------------------------------------------------------------------------------------------------------------------------
const cell0 = document.getElementById('cell-0');
const cell1 = document.getElementById('cell-1');
const cell2 = document.getElementById('cell-2');
const cell3 = document.getElementById('cell-3');
const cell4 = document.getElementById('cell-4');
const cell5 = document.getElementById('cell-5');
const cell6 = document.getElementById('cell-6');
const cell7 = document.getElementById('cell-7');
const cell8 = document.getElementById('cell-8');

//Winning Solutions **************************************************************************************************************************************

//cell0 = bottom left square
const winCombos = {
  rowZero: [cell0, cell1, cell2],
  rowOne: [cell3, cell4, cell5],
  rowTwo: [cell6, cell7, cell8],
  columnZero: [cell0, cell3, cell6],
  columnOne: [cell1, cell4, cell7],
  columnTwo: [cell2, cell5, cell8],
  diagonalZero: [cell6, cell4, cell2],
  diagonalOne: [cell8, cell4, cell0],
};

//Functions **********************************************************************************************************************************************

//Decides if an X or O is placed in a cell ---------------------------------------------------------------------------------------------------------------
function selectCell() {
  // Sanitize clicks -------------------------------------------------------------------------------------------------------------------------------------
  //Alerts If theres already an X or O
  if (event.target.textContent === 'X' || event.target.textContent === 'O') {
    alert('Please select an empty cell.');
  }

  //Stops player one from starting without player two
  if (playerTwoName === '' && playerOneName !== '') {
    alert('Please wait for Player Two to select a name.');
  }

  //If Player One's turn ---------------------------------------------------------------------------------------------------------------------------------
  else if (status.textContent === `Player: ${playerOneName}'s turn!`) {
    // On click place an X
    event.target.textContent = 'X';

    // Change to player two
    status.textContent = `Player: ${playerTwoName}'s turn!`;

    //Checks if after click, player X wins
    winCheck();
    if (winCheck() === true) {
      status.textContent = `Player: ${playerOneName} has won!`;
    }
  }

  //If Player Two's turn ---------------------------------------------------------------------------------------------------------------------------------
  else if (status.textContent === `Player: ${playerTwoName}'s turn!`) {
    // On click place an O
    event.target.textContent = 'O';

    // Change to Player One
    status.textContent = `Player: ${playerOneName}'s turn!`;

    //Checks if after click, player O wins
    winCheck();
    if (winCheck() === true) {
      status.textContent = `Player: ${playerTwoName} has won!`;
    }
  }
}

//Checks to see if there is a winner ---------------------------------------------------------------------------------------------------------------------
function winCheck() {
  //for every index in every element in the array created by winCombos keys
  for (let combo of Object.values(winCombos)) {
    //Does not set off alert when all cells are blank
    if (combo[0].textContent !== '') {
      //If they are all equal the same thing
      if (combo[0].textContent === combo[1].textContent && combo[1].textContent === combo[2].textContent) {
        // Strike a line through the characters
        combo[0].style.setProperty('color', 'gold');
        combo[1].style.setProperty('color', 'gold');
        combo[2].style.setProperty('color', 'gold');
        clearInterval(timeInterval);
        return true;
      }
    }
  }
}

// Game Timer --------------------------------------------------------------------------------------------------------------------------------------------
function gameTimer() {
  // keeps track of seconds in ones place ----------------------------------------------------------------------------------------------------------------
  if (secOnes <= 9) {
    secOnes += 1;
    timeDiv.textContent = `${hourTens}${hourOnes}:${minTens}${minOnes}:${secTens}${secOnes}`;
    //reset to 0, add 1 to secTens
    if (secOnes === 10) {
      secOnes = 0;
      secTens += 1;
    }
  }

  // keeps track of seconds in tens place ----------------------------------------------------------------------------------------------------------------
  if (secTens <= 5) {
    timeDiv.textContent = `${hourTens}${hourOnes}:${minTens}${minOnes}:${secTens}${secOnes}`;
  }
  // reset to 0, add 1 to minOnes
  else if (secTens === 6) {
    secTens = 0;
    minOnes += 1;
  }

  // keeps track of minutes in ones place ----------------------------------------------------------------------------------------------------------------
  if (minOnes <= 9) {
    timeDiv.textContent = `${hourTens}${hourOnes}:${minTens}${minOnes}:${secTens}${secOnes}`;
  }
  //reset to 0, add 1 to minTens
  else if (minOnes === 10) {
    minOnes = 0;
    minTens += 1;
  }

  // keeps track of minutes in tens place ----------------------------------------------------------------------------------------------------------------
  if (minTens <= 5) {
    timeDiv.textContent = `${hourTens}${hourOnes}:${minTens}${minOnes}:${secTens}${secOnes}`;
  }
  // reset to 0, add 1 to hourOnes
  else if (minTens === 6) {
    minTens = 0;
    hourOnes += 1;
  }

  // keeps track of hours in ones place ------------------------------------------------------------------------------------------------------------------
  if (hourOnes <= 9) {
    timeDiv.textContent = `${hourTens}${hourOnes}:${minTens}${minOnes}:${secTens}${secOnes}`;
  }
  // reset to 0, add 1 to hourTens
  else if (hourOnes === 10) {
    hourOnes = 0;
    hourTens += 1;
  }

  // Keeps Track of hours in tens place ------------------------------------------------------------------------------------------------------------------
  if (hourTens <= 9) {
    timeDiv.textContent = `${hourTens}${hourOnes}:${minTens}${minOnes}:${secTens}${secOnes}`;
  }
  //Stops if it becomes greater than 9
  else if (hourTens === 10) {
    timeDiv.textContent = 'I think you have spent way too much time playing a single tic tac toe game.';
  }
}

//Event Listeners ****************************************************************************************************************************************

//Assign Player One's Name -------------------------------------------------------------------------------------------------------------------------------
inputPlayerOne.addEventListener('keypress', enter => {
  //if Enter is pressed
  if (enter.key === 'Enter') {
    // Player one's name === input text
    playerOneName = inputPlayerOne.value;

    // Sets up game to read status correctly
    status.textContent = `Player: ${playerOneName}'s turn!`;

    // removes input box
    inputPlayerOne.style.setProperty('display', 'none');
  }
  
  //Starts timer
  if (playerOneName !== '' && playerTwoName !== '') {
    timeInterval = setInterval(gameTimer, 1000);
  }
});

//Assign Player Two's Name -------------------------------------------------------------------------------------------------------------------------------
inputPlayerTwo.addEventListener('keypress', enter => {
  //If Enter is pressed
  if (enter.key === 'Enter') {
    // player two's name === input text
    playerTwoName = inputPlayerTwo.value;

    // removes input box
    inputPlayerTwo.style.setProperty('display', 'none');
  }

  //Starts timer
  if (playerOneName !== '' && playerTwoName !== '') {
    timeInterval = setInterval(gameTimer, 1000);
  }
});

//Start two Player game ----------------------------------------------------------------------------------------------------------------------------------
twoPlayerButton.addEventListener('click', () => {
  //timeDiv.textContent = `${hourTens}${hourOnes}:${minTens}${minOnes}:${secTens}${secOnes}`;

  //Disable two player button
  event.target.disabled = true;

  //Disable one player button
  onePlayerButton.disabled = true;

  //Show input text fields
  inputPlayerOne.style.setProperty('display', 'block');
  inputPlayerTwo.style.setProperty('display', 'block');
});

//Start one Player game ----------------------------------------------------------------------------------------------------------------------------------
onePlayerButton.addEventListener('click', () => {
  // disables one player button
  event.target.disabled = true;

  // disables two player button
  twoPlayerButton.disabled = true;

  //starts timer
  setInterval(gameTimer, 1000);
});

//Reset the game -----------------------------------------------------------------------------------------------------------------------------------------
resetButton.addEventListener('click', () => {
  //remove status content
  status.textContent = '';

  //resets One Player button
  onePlayerButton.disabled = false;

  //resets two Player
  twoPlayerButton.disabled = false;

  //forces webapp to reload to restart game
  window.location.reload();
});

//Selecting a cell ---------------------------------------------------------------------------------------------------------------------------------------
cell0.addEventListener('click', selectCell);
cell1.addEventListener('click', selectCell);
cell2.addEventListener('click', selectCell);
cell3.addEventListener('click', selectCell);
cell4.addEventListener('click', selectCell);
cell5.addEventListener('click', selectCell);
cell6.addEventListener('click', selectCell);
cell7.addEventListener('click', selectCell);
cell8.addEventListener('click', selectCell);
