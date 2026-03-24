const mida = 10;
let matriu = [];
let mines = 15;

// Arrancada inicial
inicialitzarMatriu();
renderitzar();


function inicialitzarMatriu() {
    for (let i = 0; i < mida; i++) {
        matriu[i] = [];
        for (let j = 0; j < mida; j++) {
            matriu[i][j] = 0; // 0 = Negre / Apagat
        }
    }
}

//Funció que calcularà on estan ubicades les mines
function colocarMines(){
    inicialitzarMatriu();
    for(let i=0; i < mines; i++) {
        let x=Math.trunc(mida*Math.random());
        let y=Math.trunc(mida*Math.random());
        console.log(x,y);
        if(matriu[x][y] === 0){
            matriu[x][y] = 1;
        } else{
            i--
        }

        matriu[x][y] = 1;
    }
    renderitzar();
}



// function netejar() {
//     inicialitzarMatriu();
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
            if (matriu[i][j] === 2) {
                div.classList.add('active');
            }
            else if (matriu[i][j] === 1) {
                div.classList.add('bomba');
            }
            div.addEventListener('click', function () {

                if (matriu[i][j] === 1) {
                    alert('boom')
                    inicialitzarMatriu();
                } else {
                    calcular()
                    console.log(comptador);
                }
                renderitzar();
            })

            container.appendChild(div);
        }
    }

    }

    function calcular(){
        let comptador=0
        if(matriu[i-1][j-1]){
            comptador++
        }
        if(matriu[i+1][j+1]){
            comptador++;
        }
        if(matriu[i][j-1]){
            comptador++;
        }
        if(matriu[i][j+1]){
            comptador++;
        }
        if(matriu[i-1][j]){
            comptador++;
        }
        if(matriu[i+1][j]){
            comptador++;
        }

    }

