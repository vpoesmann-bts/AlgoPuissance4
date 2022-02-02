const NB_COLUMNS: number = 7;
const NB_ROWS: number = 6;
const PLAYER_COLOR = ["yellow", "red"]

let playerTurn: number = 1

let HTMLGrid : HTMLElement = document.getElementById("grid")
let grid : number[][] = []

// Création de la grille HTML
for (let i: number = 0 ; i < NB_ROWS ; i++) {
  let row: HTMLElement = document.createElement("div");
  row.classList.add("row")

  for (let j: number = 0 ; j < NB_COLUMNS ; j++) {
    let cell: HTMLElement = document.createElement("div");
    cell.classList.add("cell");

    cell.id = i + "," + j

    cell.addEventListener("click", function(event) {
      playTurn(j)
    })
    row.appendChild(cell)
  }

  HTMLGrid.appendChild(row)
}

for (let i: number = 0 ; i < NB_ROWS ; i++) {
  grid.push([])
  for (let j: number = 0 ; j < NB_COLUMNS ; j++) {
    grid[i].push(0)
  }
}

function insertToken(column) {
  if (grid[0][column] != 0) {
    return -1
  }

  for (let i : number = 0 ; i < NB_ROWS - 1 ; i++) {
    if (grid[i+1][column] != 0) {
      grid[i][column] = playerTurn
      return i;
    }
  }

  grid[NB_ROWS -1][column] = playerTurn
  return NB_ROWS -1
}

function playTurn(insertedColumn) {
  let insertedRow: number = insertToken(insertedColumn)

  if (insertedRow == -1) {
    return;
  }

  let targetedCell = getCellByCoordinates(insertedRow, insertedColumn)
  targetedCell.classList.remove("yellow", "red")
  targetedCell.classList.add(PLAYER_COLOR[playerTurn - 1]);
  changeTurn()
  console.log(grid)
}

function getCellByCoordinates(row, column) {
  return document.getElementById(row + "," + column)
}

function changeTurn() {
  if (playerTurn == 1) {
    playerTurn = 2
  } else {
    playerTurn = 1
  }
}
