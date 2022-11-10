const screen = document.getElementById('screen');
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
        screen.innerHTML = `<div id="dashboardPlayer"></div><div id="game"></div>`;
        pickDificuldade()
    
        let cards = document.querySelectorAll(".carta");
        cards.forEach((card,i) => {
            card.setAttribute("onclick", `girarCartas(${i+1})`);
        })
        mostrarPainel(player)
        embaralhar()
    }
    tempoJogo = setInterval(stopwatch,1000)
}

function mostrarPainel(player) {
    let painel = pickDashboard();
    painel.innerHTML = `<div id="displayPlayer">Nome do jogador: ${player}</div><div id="stopwatch">00:00<div>`
    
}



function girarCartas(index) {
    
    document.getElementById('carta'+index).classList.add("cartaFrontal");
    document.getElementById('carta'+index).removeAttribute("onclick");
    
    confirmarCartas(index)
    esconderCartas()
}

function esconderCartas() {
    let cartas = document.querySelectorAll(".carta");
    let cartasViradas = document.querySelectorAll(".cartaFrontal");
    
    if(cartasViradas.length >= 2) {
        let interval;
        interval = setInterval(() => {
            cartas.forEach((card,i) => {
                clearInterval(interval)
                card.classList.remove("cartaFrontal");
                card.setAttribute("onclick", `girarCartas(${i+1})`);
            })
        },1000)
    }
}

function confirmarCartas(index) {
    let carta1;
    let carta2;
    
    if(index%2==0){
        carta1 = document.getElementById('carta'+index)
        carta2 = document.getElementById('carta'+(index-1))
    } else {
        carta1 = document.getElementById('carta'+index)
        carta2 = document.getElementById('carta'+(index+1))
    }
    
    if(carta1.classList.contains("cartaFrontal") && carta2.classList.contains("cartaFrontal")) {
        carta1.classList.add("encontrada");
        carta2.classList.add("encontrada");
    }
    
    let cartasEncontradas = document.querySelectorAll('.encontrada')
    let cartas = document.querySelectorAll('.carta')
    
    console.log(cartasEncontradas.length,cartas.length)
    if(cartasEncontradas.length == cartas.length) {
        ganhar()
    }    
}



function pickGame() {
    return document.getElementById("game");
}

function pickDashboard() {
    return document.getElementById("dashboardPlayer");
}

function pickDificuldade() {
    let cards = Array();
    const game = pickGame();
    for(let i = 1; i <= 4; i++) {
        cards.push(`<div class="carta" id="carta${i}"></div>`)
    }
    let começo = cards.length + 1;
    let duplicarArray = cards.length*2;
    
    console.log(duplicarArray)
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
    interval = setInterval(() => {
        clearInterval(tempoJogo)
        clearInterval(interval)
        alert("PARABENS VOCÊ TERMINOU EM: "+ document.getElementById('stopwatch').innerText)
    },500)
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
}