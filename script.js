const mida = 10;
let matriu = [];
let mines = 15;
let resposta=[]
let numBanderes = 15
let cellsPolsats= 0

// Arrancada inicial
inicialitzarMatriu1();
renderitzar();

// Funció que calcula la primera matriu
function inicialitzarMatriu1() {

    for (let i = 0; i < mida; i++) {
        matriu[i] = [];
        resposta[i]=[];
        for (let j = 0; j < mida; j++) {
            matriu[i][j] = 0; // 0 = Negre / Apagat
            resposta[i][j] = '';
        }
    }
}

//Funció que calcularà on estan ubicades les mines
function colocarMines(){
    inicialitzarMatriu1();
    numBanderes = 15;
    document.getElementById("boto").innerHTML = "Reiniciar"
    document.getElementById("banderes").innerHTML = "🚩: 15"
    document.getElementById("missatges").innerHTML = "Hi ha 15 mines"
    for(let i=0; i < mines; i++) {
        let x=Math.trunc(mida*Math.random());
        let y=Math.trunc(mida*Math.random());
        console.log(x,y);
        if(matriu[x][y] === 0){
            matriu[x][y] = 1;
            resposta[x][y] = '*';
        } else{
            i--
        }

        matriu[x][y] = 1;
    }
    renderitzar();
}

// Funció que calcularà la segona matriu que surt cuando acaba la partida
function MostrarRespostes() {
    const container = document.getElementById('grid-container');
    container.innerHTML = "";
    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');

            if (resposta[i][j] === '*') {
                div.classList.add('bomba');
            } else {
                if (resposta[i][j] !== '') {
                    div.classList.add('active')

                    if (resposta[i][j] === 1) div.style.color = "#007fff"
                    if (resposta[i][j] === 2) div.style.color = "#008a41"
                    if (resposta[i][j] === 3) div.style.color = "#d50030"
                    if (resposta[i][j] === 4) div.style.color = "#1700df"
                    if (resposta[i][j] === 5) div.style.color = "#7600b1"
                    if (resposta[i][j] === 6) div.style.color = "#00a598"
                    if (resposta[i][j] === 7) div.style.color = "#000000"
                    if (resposta[i][j] === 8) div.style.color = "#737373"
                    if (resposta[i][j] === 0) div.style.color = "#ceebff"
                    div.innerText = resposta[i][j];

                }
            }
            container.appendChild(div);
        }
    }
}




// Aquesta funció "dibuixa" els DIVs a l'HTML
function renderitzar() {
    const container = document.getElementById('grid-container');
    container.innerHTML = ""; // Esborrem l'anterior

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');

            if (resposta[i][j] === "🚩") {
                div.classList.add('bandera');
                div.innerText= "🚩"
            }

            if(resposta[i][j] !== '*' && resposta[i][j] !== '' && resposta[i][j] !== "🚩") {
                div.classList.add('active')
                p = document.createElement("p")
                let numero = resposta[i][j]
                p.textContent = resposta[i][j];

                if (numero === 1) p.style.color = "#007fff"
                if (numero === 2) p.style.color = "#008a41"
                if (numero === 3) p.style.color = "#d50030"
                if (numero === 4) p.style.color = "#1700df"
                if (numero === 5) p.style.color = "#7600b1"
                if (numero === 6) p.style.color = "#00a598"
                if (numero === 7) p.style.color = "#000000"
                if (numero === 8) p.style.color = "#737373"
                if (numero === 0) p.style.color = "#ceebff"

                div.appendChild(p);
            } else{

                div.addEventListener('click', function () {

                    if (matriu[i][j] === 1) {
                        div.classList.add('bomba')
                        document.getElementById("missatges").innerHTML = "Has perdut!";
                        MostrarRespostes();
                    } else {
                        div.classList.add('active')

                        if(!div.classList.contains('bandera')){

                            if (resposta[i][j] === '' ) {


                                p = document.createElement("p")
                                let numero = calcular(i, j)
                                resposta[i][j] = numero;
                                p.textContent = numero;

                                if (numero === 1) p.style.color = "#007fff"
                                if (numero === 2) p.style.color = "#008a41"
                                if (numero === 3) p.style.color = "#d50030"
                                if (numero === 4) p.style.color = "#1700df"
                                if (numero === 5) p.style.color = "#7600b1"
                                if (numero === 6) p.style.color = "#00a598"
                                if (numero === 7) p.style.color = "#000000"
                                if (numero === 8) p.style.color = "#737373"
                                if (numero === 0) p.style.color = "#ceebff"

                                div.appendChild(p);


                                if (numero === 0){
                                    if (i-1>=0){
                                        resposta[i - 1][j - 1] = calcular(i - 1, j - 1);
                                        resposta[i - 1][j] = calcular(i - 1 , j);
                                        resposta[i - 1][j + 1] = calcular(i - 1, j + 1);
                                    }
                                    if (i+1<mida){
                                        resposta[i + 1][j + 1] = calcular(i + 1, j + 1);
                                        resposta[i + 1][j] = calcular(i + 1 , j);
                                        resposta[i + 1][j - 1] = calcular(i + 1, j - 1);
                                    }
                                    resposta[i][j - 1] = calcular(i , j - 1);
                                    resposta[i][j + 1] = calcular(i , j + 1);

                                    renderitzar();
                                }
                                analitzarFinal()

                            }

                        }

                    }

                })
                div.addEventListener('contextmenu', function () {
                    event.preventDefault();

                    if (div.classList.contains('bandera')) {
                        div.classList.remove('bandera');
                        div.innerText = "";
                        numBanderes++
                    }
                    else if (!div.classList.contains('active')) {
                        div.classList.add('bandera');
                        resposta[i][j] ="🚩"
                        div.innerText= "🚩"
                        numBanderes--
                    }
                    document.getElementById("banderes").innerHTML = "🚩: " + numBanderes;
                })
            }


            container.appendChild(div);

        }
    }

}

// Funció que calcula les cel·les d'avora
function calcular(i, j) {
    cellsPolsats++

    let comptador = 0
    if (matriu[i - 1]?.[j - 1] === 1) {
        comptador++
    }
    if (matriu[i + 1]?.[j + 1] === 1) {
        comptador++;
    }
    if (matriu[i]?.[j - 1] === 1) {
        comptador++;
    }
    if (matriu[i]?.[j + 1] === 1) {
        comptador++;
    }
    if (matriu[i - 1]?.[j] === 1) {
        comptador++;
    }
    if (matriu[i + 1]?.[j] === 1) {
        comptador++;
    }
    if (matriu[i - 1]?.[j + 1] === 1) {
        comptador++;
    }
    if (matriu[i + 1]?.[j - 1] === 1) {
        comptador++;
    }
    return comptador

}

// Nom explicatiu
function analitzarFinal(){

    let comptador = 0;
    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            if (resposta[i][j] !=='*' && resposta[i][j] !== '') {
                comptador++
            }
        }
    }

    console.log(comptador);

    if(comptador == mida*mida-mines){
        document.getElementById("missatges").innerHTML = "Has guanyat!";
        MostrarRespostes();
    }
}
