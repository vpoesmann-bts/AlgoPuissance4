const NB_COLUMNS: number = 7;
const NB_ROWS: number = 6;

let grille : HTMLElement = document.getElementById("grille")

// Création de la grille HTML
for (let i: number = 0 ; i < NB_ROWS ; i++) {
  let colonne: HTMLElement = document.createElement("div");
  colonne.classList.add("row")

  for (let j: number = 0 ; j < NB_COLUMNS ; j++) {
    let newDiv : HTMLElement = document.createElement("div");
    newDiv.classList.add("cell");

    colonne.appendChild(newDiv)
  }

  grille.appendChild(colonne)
}
