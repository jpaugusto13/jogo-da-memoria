const screen = document.getElementById('screen');
let score = 0;
let segundos = 0;
let minutos = 0;
let tempoJogo;

window.addEventListener('load', () => {
    let div = "";
    div = `<div>`;
    div += `<h1>Jogo da Memoria</h1>`;
    div += `<div id="dashboard"><input id="player" placeholder="Digite seu nome"><button onclick="jogo()">start</button></div>`;
    div += `</div>`;

    screen.innerHTML = div;
})

function jogo() {
    let player = document.getElementById("player").value;
    if(player) {
        screen.innerHTML = '<div id="titulo"><h1>ESCOLHA SUA CARTA!</h1><div id="stopwatch">00:00</div></div><div id="game"></div>'

        dificuldade()
        mostrarPainel(player)
        embaralhar()
        tempoJogo = setInterval(stopwatch,1000)
    }
}

function mostrarPainel(player) {
    let painel = pickDashboard();
    let scores = pickScore()
<<<<<<< HEAD
    let cards = pickCards();
    let pontosFinais = cards.length/2

    let chat = document.getElementById("spam")

    score++;
    chat.innerHTML = `${player} entrou no saguão`;
=======
    painel.innerHTML = `<div id="displayPlayer">Nome do jogador: ${player}</div><div id="stopwatch">00:00<div>`
    scores.innerHTML = `<div id="pontos">PONTOS: 0/12</div>`
>>>>>>> 1fe26d07ade6eb2851e1f2f3dbe0e0488ad600e9
}



function girarCartas(index) {
    document.getElementById('carta'+index).classList.add("cartaFrontal");
    document.getElementById('carta'+index).removeAttribute("onclick");

    confirmarCartas(index);
    esconderCartas();
}

function esconderCartas() {
    let cartas = pickCards()
    let cartasViradas = document.querySelectorAll(".cartaFrontal");
    
    if(cartasViradas.length >= 2) {
        cartas.forEach(card => {
            card.removeAttribute("onclick")
        })
        let interval;
        interval = setInterval(() => {
            cartas.forEach((card,i) => {
                clearInterval(interval);

                card.classList.remove("cartaFrontal");

                adcionarAtributos()
                if(!card.classList.contains("encontrada")) {
                    card.style.backgroundImage = 'url'+'(assets/fundoCarta.png)';
                }
            })
        },800)
    }
}

function confirmarCartas(index) {
    let carta1 = document.getElementById('carta'+index);
    let carta2 = null;
    
    index%2==0 ? carta2 = document.getElementById('carta'+(index-1)) : carta2 = document.getElementById('carta'+(index+1))
    colocarImagens(index);

    if(carta1.classList.contains("cartaFrontal") && carta2.classList.contains("cartaFrontal")) {
        carta1.classList.add("encontrada");
        carta2.classList.add("encontrada");

        imagensEncontradas(index,carta1,carta2);
        atribuirPontos();
    }
    
    let cartasEncontradas = document.querySelectorAll('.encontrada');
    let cartas = pickCards();
    
    if(cartasEncontradas.length == cartas.length) {
        ganhar();
    }    
}

<<<<<<< HEAD

function dificuldade() {
    let cards = Array();
    const game = pickGame();

    for(let i = 1; i <= 24; i++) {
        cards.push(`<div class="carta" id="carta${i}"></div>`);
    }

    let comeco = cards.length + 1;
    let duplicaCarta = cards.length*2;

    for(let i = comeco; i <= duplicaCarta;i++) {
        cards.push(`<div class="carta" id="carta${i}"></div>`);
    }
    
    cards.forEach((card) => {
        game.innerHTML += card;
    })

    adcionarAtributos()
=======
function atribuirPontos() {
    let scores = document.getElementById("pontos");
    score++
    scores.innerHTML = `<div id="pontos">PONTOS: ${score}/12</div>`
>>>>>>> 1fe26d07ade6eb2851e1f2f3dbe0e0488ad600e9
}

function embaralhar() {
    let cards = pickCards();
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos;
    })
}



function colocarImagens(index) {
    let imagem = Math.ceil(index/2);
    let card = document.getElementById('carta'+index);
    
    card.style.backgroundImage = 'url'+'(assets/imgs/'+imagem+'.png)';
}

function imagensEncontradas(index,carta1,carta2) {
    let imagem = Math.ceil(index/2);
    
    carta1.style.backgroundImage = 'url'+'(assets/imgs/'+imagem+'.png)';
    carta2.style.backgroundImage = 'url'+'(assets/imgs/'+imagem+'.png)';
}







function adcionarAtributos() {
    let cards = pickCards()
    cards.forEach((card,i) => {
        card.setAttribute("onclick", `girarCartas(${i+1})`);
    })
}

function ganhar() {
    let interval;
    let cards = document.querySelectorAll(".encontrada");
    
    cards.forEach(card => {
        card.removeAttribute("onclick")
    })
    
    interval = setInterval(() => {
        clearInterval(tempoJogo)
        clearInterval(interval)
        alert("PARABENS VOCÊ TERMINOU EM: "+ document.getElementById('stopwatch').innerText)
    },100)
}

function stopwatch() {
    segundos++
    if(segundos >= 60) {
        minutos++
        segundos = 0
    }
    let cronometro = `${minutos <= 9 ? '0'+minutos : minutos}:${segundos <= 9 ? '0'+segundos : segundos}`
    document.getElementById('stopwatch').innerHTML = cronometro
}

function atribuirPontos() {
    let cards = pickCards();
    let pontosFinais = cards.length/2
    let scores = document.getElementById("pontos");
    score++;
    scores.innerHTML = `<div id="pontos">PONTOS: ${score}/${pontosFinais}</div>`;
}



function pickScore() {
    return document.getElementById("pontos");
}

function pickGame() {
    return document.getElementById("game");
}

function pickDashboard() {
    return document.getElementById("dashboardPlayer");
}

<<<<<<< HEAD
function pickCards() {
    return document.querySelectorAll('.carta');
=======
function pickDificuldade() {
    let cards = Array();
    const game = pickGame();
    for(let i = 1; i <= 12; i++) {
        cards.push(`<div class="carta" id="carta${i}"></div>`)
    }
    let começo = cards.length + 1;
    let duplicarArray = cards.length*2;

    for(let i = começo; i <= duplicarArray;i++) {
        cards.push(`<div class="carta" id="carta${i}"></div>`)
    }
    
    cards.forEach(card => {
        game.innerHTML += card;
    })
    
    return cards
}



function embaralhar() {
    let cards = document.querySelectorAll('.carta')
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
}

function ganhar() {
    let interval;
    let cards = document.querySelectorAll(".encontrada");

    cards.forEach(card => {
        card.removeAttribute("onclick")
    })

    interval = setInterval(() => {
        clearInterval(tempoJogo)
        clearInterval(interval)
        alert("PARABENS VOCÊ TERMINOU EM: "+ document.getElementById('stopwatch').innerText)
    },300)
}



function stopwatch() {
    let cronometro = ""
    segundos++
    if(segundos >= 60) {
        minutos++
        segundos = 0
    }
    cronometro = `${minutos <= 9 ? '0'+minutos : minutos}:${segundos <= 9 ? '0'+segundos : segundos}`
    document.getElementById('stopwatch').innerHTML = cronometro
    return cronometro
>>>>>>> 1fe26d07ade6eb2851e1f2f3dbe0e0488ad600e9
}