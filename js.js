const screen = document.getElementById('screen');
const dashboard = document.getElementById('dashboard');

window.addEventListener('load', () => {
    let div = "";
    div = `<div>`;
    div += `<h1>Jogo da Memoria</h1>`;
    div += `<div id="dashboard"><input id="player" placeholder="Digite seu nome"><button onclick="startGame()">start</button></div>`;
    div += `</div>`;

    screen.innerHTML = div;
})

function startGame() {
    let player = document.getElementById("player").value;
    if(player) {
        screen.innerHTML = "";
        screen.innerHTML += `<div id="dashplayer"><p>Nome do Jogador: ${player}</div>`
        screen.innerHTML += `<div id="game"></div>`

        let cards = Array();

        for(let i = 1; i <= 4; i++) {
            cards.push(`<div onclick="flipcard(${i})" class="card" id="card${i}"></div>`);
            cards.push(`<div onclick="flipcard(${i},'s')" class="card" id="scard${i}"></div>`);
        }
        
        let game = document.getElementById("game");

        game.innerHTML = ""
        cards.forEach(card => {
            game.innerHTML += card;
        });

        cards = document.querySelectorAll('.card');
        embaralhar(cards)
    }
}

function flipcard(index,duplicate) {
    if(duplicate != undefined) {
        document.getElementById('scard'+index).classList.add("frontCard");
    } else {
        document.getElementById('card'+index).classList.add("frontCard");
    }
    click(index);
}
let tclick = 0;

function click(card) {
    if(tclick !=1) {
        tclick++;
    } else {
        if(document.getElementById('card'+card).classList.contains("frontCard") && document.getElementById('scard'+card).classList.contains("frontCard")) {
            document.getElementById('scard'+card).classList.add("selected");
            document.getElementById('card'+card).classList.add("selected");
        }
        
        let interval;
        interval = setInterval(() => {
            let divs = document.querySelectorAll('.card');

            for(let i = 0; i < divs.length; i++) {
                divs[i].classList.remove("frontCard");
            }
            clearInterval(interval)
        }, 800);
        tclick = 0;
    }
}

function vitoria() {
    if(document.querySelectorAll('.card').length == document.querySelectorAll('.selected').length) {
        alert("PARABENS VOCÊ GANHOU")
    }
}

function embaralhar(cards) {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
}
