//Variables from HTML*************************************************************************************************************************************

//Game setup variables------------------------------------------------------------------------------------------------------------------------------------
let onePlayerButton = document.getElementById('player-one'); //Button
let twoPlayerButton = document.getElementById('player-two'); //Button
let status = document.getElementById('status'); // Used to display text above buttons
let resetButton = document.getElementById('reset'); //button
let gameBoard = document.getElementsByClassName('board'); // class, contains all cell <div>s
let inputPlayerOne = document.getElementById('player-one-name'); // input field
let inputPlayerTwo = document.getElementById('player-two-name'); // input field
let playerOneName = null; // stores player one name
let playerTwoName = null; // stores player two name

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
  //Alerts If theres already an X or O
  if (event.target.textContent === 'X' || event.target.textContent === 'O') {
    alert('Please select an empty cell.');
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
        combo[0].style.setProperty('text-decoration', 'line-through');
        combo[1].style.setProperty('text-decoration', 'line-through');
        combo[2].style.setProperty('text-decoration', 'line-through');
        return true;
      }
    }
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
});

//Start two Player game ----------------------------------------------------------------------------------------------------------------------------------
twoPlayerButton.addEventListener('click', () => {
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
  event.target.disabled = true;
  twoPlayerButton.disabled = true;
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
