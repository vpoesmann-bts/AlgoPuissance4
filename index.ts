console.log("Salut")

let grille : HTMLElement = document.getElementById("grille")

console.log(grille)

for (let i: number = 0 ; i < 6 ; i++) {
  let colonne: HTMLElement = document.createElement("div");
  for (let j: number = 0 ; j < 7 ; j++) {
    let newDiv : HTMLElement = document.createElement("div");
    colonne.appendChild(newDiv)
  }
  grille.appendChild(colonne)
}
