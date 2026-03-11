const mida = 10;
let matriu = [];

function inicialitzarMatriu() {
    for (let i = 0; i < mida; i++) {
        matriu[i] = [];
        for (let j = 0; j < mida; j++) {
            matriu[i][j] = 0; // 0 = Negre / Apagat
        }
    }
}

function netejar() {
    inicialitzarMatriu();
    renderitzar();
}

// Aquesta funció "dibuixa" els DIVs a l'HTML
function renderitzar() {
    const container = document.getElementById('grid-container');
    container.innerHTML = ""; // Esborrem l'anterior

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');

            // Si a la matriu hi ha un 1, afegim la classe 'active' (color verd)
            if (matriu[i][j] === 1) {
                div.classList.add('active');
            }

            container.appendChild(div);
        }
    }
}

// Arrancada inicial
netejar();