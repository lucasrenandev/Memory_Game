// SELECIONANDO OS OBJETOS E ATRIBUINDO EM UM ARRAY
const cardArray = [
    {
        name: "cheeseburger",
        img: "assets/images/cheeseburger.png"
    },
    {
        name: "fries",
        img: "assets/images/fries.png"
    },
    {
        name: "hotdog",
        img: "assets/images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "assets/images/ice-cream.png"
    },
    {
        name: "milkshake",
        img: "assets/images/milkshake.png"
    },
    {
        name: "pizza",
        img: "assets/images/pizza.png"
    },
    {
        name: "cheeseburger",
        img: "assets/images/cheeseburger.png"
    },
    {
        name: "fries",
        img: "assets/images/fries.png"
    },
    {
        name: "hotdog",
        img: "assets/images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "assets/images/ice-cream.png"
    },
    {
        name: "milkshake",
        img: "assets/images/milkshake.png"
    },
    {
        name: "pizza",
        img: "assets/images/pizza.png"
    },

]
// ORDENANDO DE FORMA ALEATÓRIA O ARRAY
cardArray.sort(() => 0.5 - Math.random()).splice(0, cardArray)

// SELECIONANDO OS ELEMENTOS HTML
const cardContainerDisplay = document.getElementById("cardContainer")
const resultDisplay = document.getElementById("result")
const buttonRefresh = document.getElementById("refresh")
const title = document.getElementById("title")
const paragraph = document.getElementById("paragraph")
const errorDisplay = document.getElementById("error")
const resultContainerDisplay = document.getElementById("resultContainer")

// VARIÁVEIS DE APOIO PARA O JOGO
let cardsEscolhido = []
let cardsEscolhidoIds = []
let cardsGanho = []
let cardsError = []

// FUNÇÃO PARA CRIAR OS CARDS DINÂMICAMENTE
function createCards() {
    for(let i = 0; i < cardArray.length; i++) {
        const card = document.createElement("img")
        card.setAttribute("src", "assets/images/blank.png")
        card.setAttribute("data-id", i)
        card.addEventListener("click", flipCard)
        cardContainerDisplay.appendChild(card)
    }

}
// CHAMANDO A FUNÇÃO CRIAR OS CARDS
createCards()

// FUNÇÃO PARA O RECARREGAMENTO DA PÁGINA 
buttonRefresh.addEventListener("click", function() {
    location.reload()
})

// FUNÇÃO PARA OS EVENTOS DO JOGO
function checkMatch() {
    const cards = document.querySelectorAll("#cardContainer img")
    const optionOneId = cardsEscolhidoIds[0]
    const optionTwoId = cardsEscolhidoIds[1]

    if(optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute("src", "assets/images/blank.png")
        cards[optionTwoId].setAttribute("src", "assets/images/blank.png")
        window.alert("Você clicou na mesma imagem!")
    }
    
    else if(cardsEscolhido[0] == cardsEscolhido[1]) {
        cards[optionOneId].setAttribute("src", "assets/images/white.png")
        cards[optionTwoId].setAttribute("src", "assets/images/white.png")
        cards[optionOneId].removeEventListener("click", flipCard)
        cards[optionTwoId].removeEventListener("click", flipCard)
        cardsGanho.push(cardsEscolhido)
        window.alert("ACERTOU!!!")
    }

    else {
        cards[optionOneId].setAttribute("src", "assets/images/blank.png")    
        cards[optionTwoId].setAttribute("src", "assets/images/blank.png")
        cardsError.push(cardsEscolhido)
        window.alert("ERROU, tente novamente!")    
    }

    resultDisplay.textContent = cardsGanho.length
    errorDisplay.textContent = cardsError.length
    cardsEscolhido = []
    cardsEscolhidoIds = []

    if(cardsGanho.length == cardArray.length / 2) {
        resultDisplay.textContent = cardsGanho.length
        cardContainerDisplay.style.display = "none"
        title.style.display = "none"
        paragraph.style.display = "none"
        resultContainerDisplay.style.flexDirection = "column"
        resultContainerDisplay.style.gap = "10px"
        resultContainerDisplay.style.fontSize = "1.8em"
        buttonRefresh.style.display = "block"
    }
}

// FUNÇÃO PARA SELECIONAR OS CARDS POR IDS
function flipCard() {
    const cardId = this.getAttribute("data-id")
    cardsEscolhido.push(cardArray[cardId].name)
    cardsEscolhidoIds.push(cardId)
    this.setAttribute("src", cardArray[cardId].img)

    if(cardsEscolhido.length == 2){
        setTimeout(checkMatch, 150)
    }

    if(cardId.length == 1) {
        paragraph.style.visibility = "hidden"
    }
}