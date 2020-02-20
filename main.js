//Variables from HTML*************************************************************************************************************************************

//Game setup variables------------------------------------------------------------------------------------------------------------------------------------
let startButton = document.getElementById('start');
let status = document.getElementById('status');
let resetButton = document.getElementById('reset');
let gameBoard = document.getElementsByClassName('board');
//let arrayGameBoard = Array.from(gameBoard.children);

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
  //If Player X turn, can place X in cell
  else if (status.textContent === "Player X's turn") {
    event.target.textContent = 'X';
    status.textContent = "Player O's turn";
    //Checks if after click, player X wins
    winCheck();
    if (winCheck() === true) {
      status.textContent = 'Player X has won!';
    }
  }
  //If Player O turn, can place O in cell
  else if (status.textContent === "Player O's turn") {
    event.target.textContent = 'O';
    status.textContent = "Player X's turn";
    //Checks if after click, player O wins
    winCheck();
    if (winCheck() === true) {
      status.textContent = 'Player O has won!';
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
        combo[0].style.setProperty('text-decoration', 'line-through');
        combo[1].style.setProperty('text-decoration', 'line-through');
        combo[2].style.setProperty('text-decoration', 'line-through');

        return true;
      }
    }
  }
}

//Event Listeners ****************************************************************************************************************************************

//Start the game -----------------------------------------------------------------------------------------------------------------------------------------
startButton.addEventListener('click', () => {
  event.target.disabled = true;
  status.textContent = "Player X's turn";
});

//Reset the game -----------------------------------------------------------------------------------------------------------------------------------------
resetButton.addEventListener('click', () => {
  //remove status content
  status.textContent = '';
  //resets start button
  startButton.disabled = false;
  //forces webapp to reload to restart game
  window.location.reload()

  //might use
  //for (let cell of arrayGameBoard) {
  //  console.log(cell)
  //  cell.textContent = '';
  //}
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
