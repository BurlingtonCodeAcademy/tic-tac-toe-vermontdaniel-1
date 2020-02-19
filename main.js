//Variables from HTML*************************************************************************************************************************************
//Game setup variables------------------------------------------------------------------------------------------------------------------------------------
let startButton = document.getElementById('start');
let status = document.getElementById('status');
let player = status.textContent;

//Set Cells to Variables ---------------------------------------------------------------------------------------------------------------------------------
let cell0 = document.getElementById('cell-0');
let cell1 = document.getElementById('cell-1');
let cell2 = document.getElementById('cell-2');
let cell3 = document.getElementById('cell-3');
let cell4 = document.getElementById('cell-4');
let cell5 = document.getElementById('cell-5');
let cell6 = document.getElementById('cell-6');
let cell7 = document.getElementById('cell-7');
let cell8 = document.getElementById('cell-8');

//Winning Solutions **************************************************************************************************************************************

//cell0 = bottom left square
let winCombos = {
  rowZero: [cell0, cell1, cell2],
  rowOne: [cell3, cell4, cell5],
  rowTwo: [cell6, cell7, cell8],
  columnZero: [cell0, cell3, cell6],
  columnOne: [cell1, cell4, cell5],
  columnTwo: [cell2, cell5, cell8],
  diagonalZero: [cell6, cell4, cell8],
  diagonalOne: [cell2, cell4, cell6],
};

//Functions **********************************************************************************************************************************************

//Decides if an X or O is placed in a cell ---------------------------------------------------------------------------------------------------------------
function selectCell() {
  //Alerts If theres already an X or O
  if (event.target.textContent === 'X' || event.target.textContent === 'O') {
    alert('Please select an empty cell, ya cheater.');
    return;
  }
  //If Player X turn, can place X in cell
  else if (status.textContent === "Player X's turn") {
    event.target.textContent = 'X';
    status.textContent = "Player O's turn";
  }
  //If Player O turn, can place O in cell
  else if (status.textContent === "Player O's turn") {
    event.target.textContent = 'O';
    status.textContent = "Player X's turn";
  }
}

//Checks to see if there is a winner ---------------------------------------------------------------------------------------------------------------------
function winCheck() {
    
}

//Event Listeners ****************************************************************************************************************************************

//Start the game -----------------------------------------------------------------------------------------------------------------------------------------
startButton.addEventListener('click', () => {
  event.target.disabled = true;
  status.textContent = "Player X's turn";
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
