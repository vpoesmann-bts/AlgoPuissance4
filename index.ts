// Constantes définissant la taille de la grille horizontalement et verticalement
// On définit ces nombres sous forme de constant pour éviter les "magic numbers"
const NB_COLUMNS: number = 7;
const NB_ROWS: number = 6;

// Cette constante sert à identifier la couleur de jetons de chaque joueur
const PLAYER_COLOR = ["yellow", "red"]

// Variable permettant de définir le joueur qui doit jouer (valeurs possibles 1 ou 2)
let playerTurn: number = 1
let scores: number[] = [0, 0]

// Grille graphique
let HTMLGrid : HTMLElement = document.getElementById("grid")
// Grille logique
// Les valeurs possibles sont
// - 0 pour vide
// - 1 pour jeton jaune
// - 2 pour jeton rouge
let grid : number[][] = []

// Création de la grille HTML
for (let i: number = 0 ; i < NB_ROWS ; i++) {
  // Ajout d'une div ligne
  let row: HTMLElement = document.createElement("div");
  row.classList.add("row")

  for (let j: number = 0 ; j < NB_COLUMNS ; j++) {
    // Ajout d'une div cellule
    let cell: HTMLElement = document.createElement("div");
    cell.classList.add("cell");

    // Identifiant unique pour chaque cellule, au format colonne,ligne (Ex : 4,5)
    cell.id = i + "," + j

    // L'écouteur d'événement va lancer la fonction playTurn lorsque l'on clique sur une cellule
    cell.addEventListener("click", function(event) {
      playTurn(j)
    })
    row.appendChild(cell)
  }

  HTMLGrid.appendChild(row)
}

// Création de la grille logique
for (let i: number = 0 ; i < NB_ROWS ; i++) {
  // Ajout d'une ligne
  grid.push([])
  for (let j: number = 0 ; j < NB_COLUMNS ; j++) {
    // Ajout d'une cellule vide (valeur 0)
    grid[i].push(0)
  }
}

// Fonction qui tente d'ajouter un jeton dans la colonne j
// Retourne -1 si la fonction n'a pas pu insérer de jeton (colonne pleine)
// Retourne le numéro de ligne où l'insertion s'est produite sinon
function insertToken(column) {
  // On teste si la colonne est pleine
  if (grid[0][column] != 0) {
    return -1
  }

  // On parcours la colonne pour trouver où le jeton va se placer
  for (let i : number = 0 ; i < NB_ROWS - 1 ; i++) {
    if (grid[i+1][column] != 0) {
      grid[i][column] = playerTurn
      return i;
    }
  }

  // Insertion du jeton à la colonne tout en bas car il n'a pas été inséré plus haut
  grid[NB_ROWS -1][column] = playerTurn
  return NB_ROWS -1
}

// Fonction qui insert graphiquement le jeton
function insertHTMLToken(row, column) {
  let targetedCell = getCellByCoordinates(row, column)
  targetedCell.classList.remove("yellow", "red")
  targetedCell.classList.add(PLAYER_COLOR[playerTurn - 1]);
}

// Fonction qui joue un tour complet de jeu
function playTurn(insertedColumn) {
  // On tente d'insérer le jeton
  let insertedRow: number = insertToken(insertedColumn)

  // Si le jeton n'a pas pu être inséré, on arrête et on attend une nouvelle tentative du joueur
  if (insertedRow == -1) {
    return;
  }

  // On insert le jeton graphiquement
  insertHTMLToken(insertedRow, insertedColumn)

  // On vérifie si le joueur a gagné grâce à son coup
  if (checkVictory()) {
    updateScores()
    alert("Victoire !")
    // TODO Display victory message
    // "Le joueur X a gagné ! Le score est de Y-Z"
    // TODO Cleanup and restart game

  }

  // On change le tour du joueur
  changeTurn()
}

// Permet de récupérer une cellule HTML par son identifiant row,column
function getCellByCoordinates(row, column) {
  return document.getElementById(row + "," + column)
}

// Permet de changer de tour de jeu
function changeTurn() {
  if (playerTurn == 1) {
    playerTurn = 2
  } else {
    playerTurn = 1
  }
}

function updateScores() {
  // TODO Update scores array
}

// Permet de vérifier la victoire d'un joueur
function checkVictory() : boolean {
  // Pour chaque cellule
  for (let i: number = 0 ; i < NB_ROWS ; i++) {
    for (let j: number = 0 ; j < NB_COLUMNS ; j++) {
      // On vérifie si elle est alignée avec 3 autres jetons
      // horizontalement, verticalement, et diagonalement
      if(checkHorizontal(i, j) ||
         checkVertical(i, j) ||
         checkDiagonalLeft(i, j) ||
         checkDiagonalRight(i, j)) {
        return true
      }
    }
  }

  return false
}

// Vérification horizontale
function checkHorizontal(row, column) {
  if (grid[row][column] == 0 ||
      column + 3 > NB_COLUMNS - 1) {
    return false
  }

  for (let i : number = 0 ; i < 4 ; i++) {
    if (grid[row][column + i] != playerTurn) {
      return false
    }
  }

  return true
}

// Vérification verticale
function checkVertical(row, column) {
  // TODO Check vertical alignment
  return false
}

// Vérification diagonale vers la gauche 
function checkDiagonalLeft(row, column) {
  if (grid[row][column] == 0 ||
      column - 3 < 0 ||
      row + 3 > NB_ROWS - 1) {
    return false
  }

  for (let i : number = 0 ; i < 4 ; i++) {
    if (grid[row + i][column - i] != playerTurn) {
      return false
    }
  }

  return true
}

// Vérification diagonale vers la droite
function checkDiagonalRight(row, column) {
  if (grid[row][column] == 0 ||
      column + 3 > NB_COLUMNS - 1 ||
      row + 3 > NB_ROWS - 1) {
    return false
  }

  for (let i : number = 0 ; i < 4 ; i++) {
    if (grid[row + i][column + i] != playerTurn) {
      return false
    }
  }

  return true

}
