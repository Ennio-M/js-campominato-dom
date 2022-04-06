// Inizializzazione variabili
const app = document.getElementById("app");
const container = document.getElementById("container");
const play = document.getElementById("play");
const p = document.createElement("p");
container.append(p);
let diff = 0;
const bombNum = 16;
let bombsArray = [];
let tries = 0;

// Invocazione funzione creazione griglia
play.addEventListener("click", createGrid);

// Funzione creazione griglia
function createGrid() {
    tries = 0;
    p.innerHTML = "";
    diff = parseInt(document.getElementById("diff").value);
    let numBox = Math.sqrt(diff);
    createBombs(diff);
    app.innerHTML = "";
    for(let i = 1; i <= diff; i++) {
        const box = createBox(i, numBox);
        app.append(box);
    }
}

// Funzione creazione celle
function createBox(i, numBox) {
    let box = document.createElement("div");
    box.setAttribute("class", "box");
    box.style.width = `calc((100% - ${numBox}*2px) / ${numBox})`;
    box.style.height = `calc((100% - ${numBox}*2px) / ${numBox})`;
    let boxCSS = window.getComputedStyle(app, null);
    let boxHeight = parseInt(boxCSS.getPropertyValue("height"));
    box.style.lineHeight = (boxHeight / numBox) + "px";
    box.classList.add("pointer");
    box.innerHTML = `<span>${i}</span>`;
    box.addEventListener("click", clickBox);
    return box;
}

//Funzione celle cliccabili
function clickBox() {
    if(bombsArray.includes(parseInt(this.innerText))) {
        this.style.backgroundColor = "#DC143C";
        revealBombs();
        p.innerHTML = `Peccato, dopo ${tries} tentativi hai perso, <a href="#" id="again">ritenta</a>!`
        const again = document.getElementById("again");
        again.addEventListener("click", createGrid)
    } else {
        this.style.backgroundColor = "#6495ED";
        tries++;
        // controllo in caso il giocatore clicchi su tutte le celle senza bomba
        if(tries === (diff - bombNum)) {
            p.innerHTML = `Complimenti, hai vinto! <br> <a href="#" id="again">Ritenta</a>`
            const again = document.getElementById("again");
            again.addEventListener("click", createGrid)
            revealBombs();
        }
    }
    this.classList.remove("pointer");
    this.removeEventListener("click", clickBox);
}

//Funzione creazione bombe
function createBombs(diff) {
    bombsArray = [];
    while(bombsArray.length < bombNum) {
        let bomb = getRndInteger(1, diff);
        if(!bombsArray.includes(bomb)) {
            bombsArray.push(bomb);
        }
    }
}

// Funzione rivelazione bombe
function revealBombs() {
    const boxes = document.querySelectorAll(".box");
    for(let i = 0; i < boxes.length; i++) {
        if(bombsArray.includes(parseInt(boxes[i].innerText))) {
            boxes[i].style.backgroundColor = "#DC143C"
            boxes[i].innerHTML = `<img src="./img/bomb.png" alt="Bomba">`
        }
        boxes[i].classList.remove("pointer");
        boxes[i].removeEventListener("click", clickBox)
    }
}

// Funzioni generali
// Estrazione numero casuale
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }