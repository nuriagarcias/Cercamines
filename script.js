const mida = 10;
let matriu = [];
let mines = 15;
let resposta=[]
let numBanderes = 15

// Arrancada inicial
inicialitzarMatriu1();
renderitzar();


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
    numBanderes = 14;
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

function MostrarRespostes() {
    const container = document.getElementById('grid-container');
    container.innerHTML = ""; // Esborrem l'anterior

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');

            if (resposta[i][j] === '*') {
                div.classList.add('bomba');
            } else {
                if (resposta[i][j] !== '') {
                    div.classList.add('active')
                    div.innerText = resposta[i][j];
                }
            }
            container.appendChild(div);
        }
    }
}


// function netejar() {
//     inicialitzarMatriu1();
//
//     renderitzar();
// }

// Aquesta funció "dibuixa" els DIVs a l'HTML
function renderitzar() {
    const container = document.getElementById('grid-container');
    container.innerHTML = ""; // Esborrem l'anterior

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');

            // Si a la matriu hi ha un 1, afegim la classe 'active' (color verd)
            // if (matriu[i][j] === 2) {
            //     div.classList.add('active');
            // }
            // else if (matriu[i][j] === 1) {
            //     div.classList.add('bombaAmagada');
            // }
            div.addEventListener('click', function () {

                if (matriu[i][j] === 1) {
                    div.classList.add('bomba')
                    document.getElementById("missatges").innerHTML = "Has perdut!";
                    MostrarRespostes();
                } else {
                    div.classList.add('active')
                    if (resposta[i][j] === '') {
                        p=document.createElement("p")
                        let numero= calcular(i,j)
                        resposta[i][j] = numero;
                        p.textContent= numero;
                        if(numero === 1){
                            p.style.color = "#0053a6"
                        }
                        div.appendChild(p);
                    }
                    //calcular(i,j)

                    // console.log(calcular(i,j));
                }
                //renderitzar();
            })
            div.addEventListener('contextmenu', function () {
                event.preventDefault();

               if (div.classList.contains('bandera')) {
                   div.classList.remove('bandera');
                   div.innerText = "";
                   numBanderes++
               }
               else{
                   div.classList.add('bandera');
                   div.innerText= "🚩"
                   numBanderes--
               }
               document.getElementById("banderes").innerHTML = "🚩: " + numBanderes; //renderitzar();
            })

            container.appendChild(div);
        }
    }

}

function calcular(i, j) {
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

