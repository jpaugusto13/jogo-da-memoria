const screen = document.getElementById('screen');
let score = 0;
let segundos = 0;
let minutos = 0;
let tempoJogo;

window.addEventListener('load', () => {
    let div = "";
    div = '<div>';
    div += '<h1>Jogo da Memoria</h1>';
    div += '<div id="dashboard"><input id="player" placeholder="Digite seu nome"><button id="play" onclick="jogo()">ENCONTRAR PARTIDA</button></div>';
    div += '</div>';

    screen.innerHTML = div;
})

function jogo() {
    let player = document.getElementById("player").value;
    if(player) {
        screen.innerHTML = '<div id="titulo"><h1>ESCOLHA SUA CARTA!</h1><div id="stopwatch">00:00</div></div><div id="game"></div>'
        document.getElementById("dashmain").style.opacity = 1

        dificuldade()
        mostrarPainel(player)
        embaralhar()
        tempoJogo = setInterval(stopwatch,1000)
    }
}

function mostrarPainel(player) {
    document.getElementById("titulo").innerHTML = '<div id="titulo"><h1>ESCOLHA SUA CARTA!</h1><div id="stopwatch">00:00</div></div>'
    let painel = pickDashboard();
    let scores = pickScore()
    let cards = pickCards();
    let pontosFinais = cards.length/2

    let chat = document.getElementById("spam")

    score++;
    chat.innerHTML = `${player} entrou no saguão`;
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
            cartas.forEach((card) => {
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
        
        let cartas = document.querySelectorAll(".carta");
        let cartasEncontradas = document.querySelectorAll(".encontrada");

        if(cartasEncontradas.length == cartas.length) {
            ganhar()
        }
    }
}


function dificuldade() {
    let cards = Array();
    const game = pickGame();

    for(let i = 1; i <= 21 /*multiplo de 3 */; i++) {
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
    
    interval = setInterval(() => {
        clearInterval(tempoJogo);
        clearInterval(interval);
        alert("PARABENS VOCÊ TERMINOU EM: "+ document.getElementById('stopwatch').innerText);
    },300);
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

function pickCards() {
    return document.querySelectorAll('.carta');
}

function verCartas() {
    cards = pickCards();
    let interval;

    cards.forEach(card => {
        card.classList.add("cartaFrontal");
        card.removeAttribute("onclick")
    });

    for(let i = 1;i<=cards.length;i++){
        let carta1;
        let carta2;
        if(i%2!=0){
            carta1 = document.getElementById("carta"+i)
            carta2 = document.getElementById("carta"+Number(i+1))
            console.log(carta1,carta2)
            imagensEncontradas(i,carta1,carta2)
        }
    }

    interval = setInterval(() => {
        clearInterval(interval)
        adcionarAtributos()
        esconderCartas()
    },2000)
}