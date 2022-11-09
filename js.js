let screen = document.getElementById('screen');

for(let i = 1; i <= 4; i++) {
    screen.innerHTML += `<div onclick="flipcard(${i})" class="card backCard" id="card${i}"></div>`
    screen.innerHTML += `<div onclick="flipcard(${i},'t')" class="card backCard" id="scard${i}"></div>`
}
const cards = document.querySelectorAll('.card')

let tclick = 0;

function flipcard(card,s) {
    if(s != undefined) {
        document.getElementById('scard'+card).classList.remove("backCard");
        document.getElementById('scard'+card).classList.add("frontCard");
    } else {
        document.getElementById('card'+card).classList.add("frontCard");
        document.getElementById('card'+card).classList.remove("backCard");
    }
    click(card);
}

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
            let divs = document.querySelectorAll('.card')
            for(let i = 0; i < divs.length; i++) {
                divs[i].classList.remove("frontCard");
            }
            clearInterval(interval)
        }, 1000);
        tclick = 0;
    }
}

cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
})