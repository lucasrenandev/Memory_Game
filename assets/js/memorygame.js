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
// ORDENANDO O ARRAY DE FORMA ALEATÓRIA
cardArray.sort(() => 0.5 - Math.random()).splice(0, cardArray)

// SELECIONANDO OS ELEMENTOS HTML
const cardContainerDisplay = document.getElementById("cardContainer")
const resultContainerDisplay = document.getElementById("resultContainer")
const resultDisplay = document.getElementById("result")
const buttonRefresh = document.getElementById("refresh")
const title = document.getElementById("title")
const paragraph = document.getElementById("paragraph")
const errorDisplay = document.getElementById("error")

// VARIÁVEIS DE APOIO PARA O JOGO
let cardsChosen = []
let cardsChosenIds = []
let cardsWon = []
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
// CHAMANDO A FUNÇÃO CRIAR CARDS
createCards()

// FUNÇÃO PARA JOGAR NOVAMENTE 
buttonRefresh.addEventListener("click", function() {
    location.reload()
})

// FUNÇÃO PARA OS EVENTOS DO JOGO
function checkMatch() {
    const cards = document.querySelectorAll("#cardContainer img")
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if(optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute("src", "assets/images/blank.png")
        cards[optionTwoId].setAttribute("src", "assets/images/blank.png")
        window.alert("Você clicou na mesma imagem!")
    }
    
    else if(cardsChosen[0] == cardsChosen[1]) {
        cards[optionOneId].setAttribute("src", "assets/images/white.png")
        cards[optionTwoId].setAttribute("src", "assets/images/white.png")
        cards[optionOneId].removeEventListener("click", flipCard)
        cards[optionTwoId].removeEventListener("click", flipCard)
        cardsWon.push(cardsChosen)
        window.alert("ACERTOU!!!")
    }

    else {
        cards[optionOneId].setAttribute("src", "assets/images/blank.png")    
        cards[optionTwoId].setAttribute("src", "assets/images/blank.png")
        cardsError.push(cardsChosen)
        window.alert("ERROU, tente novamente!")    
    }

    resultDisplay.textContent = cardsWon.length
    errorDisplay.textContent = cardsError.length
    cardsChosen = []
    cardsChosenIds = []

    if(cardsWon.length == cardArray.length / 2) {
        resultDisplay.textContent = cardsWon.length
        cardContainerDisplay.style.display = "none"
        title.textContent = "Fim de Jogo!"
        title.style.fontSize = "2.5em"
        paragraph.style.display = "none"
        resultContainerDisplay.style.flexDirection = "column"
        resultContainerDisplay.style.gap = "10px"
        buttonRefresh.style.display = "block"
    }
}

// FUNÇÃO PARA SELECIONAR OS CARDS POR IDS
function flipCard() {
    const cardId = this.getAttribute("data-id")
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute("src", cardArray[cardId].img)
    
    if(cardsChosen.length == 2){
        setTimeout(checkMatch, 200)
    }

    if(cardsChosen.length == 1) {
        paragraph.style.visibility = "hidden"
    }

}