const NB_COLUMNS: number = 7;
const NB_ROWS: number = 6;


let grilleHTML : HTMLElement = document.getElementById("grille")
let grille : number[][] = []

// Création de la grille HTML
for (let i: number = 0 ; i < NB_ROWS ; i++) {
  let colonne: HTMLElement = document.createElement("div");
  colonne.classList.add("row")

  for (let j: number = 0 ; j < NB_COLUMNS ; j++) {
    let newDiv : HTMLElement = document.createElement("div");
    newDiv.classList.add("cell");

    colonne.appendChild(newDiv)
  }

  grilleHTML.appendChild(colonne)
}

for (let i: number = 0 ; i < NB_ROWS ; i++) {
  grille.push([])
  for (let j: number = 0 ; j < NB_COLUMNS ; j++) {
    grille[i].push(0)
  }
}

console.log(grille)
