const NB_COLUMNS: number = 7;
const NB_ROWS: number = 6;


let HTMLGrid : HTMLElement = document.getElementById("grid")
let grid : number[][] = []

// Création de la grille HTML
for (let i: number = 0 ; i < NB_ROWS ; i++) {
  let row: HTMLElement = document.createElement("div");
  row.classList.add("row")

  for (let j: number = 0 ; j < NB_COLUMNS ; j++) {
    let cell: HTMLElement = document.createElement("div");
    cell.classList.add("cell");


    cell.addEventListener("click", function(event) {
      console.log(j)
      insertToken(j)
      console.log(grid)
      cell.classList.add("yellow");
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
  for (let i : number = 0 ; i < NB_ROWS - 1 ; i++) {
    if (grid[i+1][column] != 0) {
      grid[i][column] = 1
      return;
    }
  }

  grid[NB_ROWS -1][column] = 1
}

console.log(grid)
