// Inizializzazione variabili elementi
const app = document.getElementById("app");
const play = document.getElementById("play");

// Invocazione funzione creazione griglia
play.addEventListener("click", createGrid);

// Funzione creazione griglia
function createGrid() {
    const diff = parseInt(document.getElementById("diff").value);
    let numBox = Math.sqrt(diff);
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
    this.style.backgroundColor = "#6495ED";
    this.classList.remove("pointer");
    this.removeEventListener("click", clickBox);
}