const guessedLettersList = document.querySelector("ul")
const guessBtn = document.querySelector(".guess")
const input = document.querySelector("input")
const wordInProgress = document.querySelector(".word-in-progress")
const remaining = document.querySelector(".remaining")
const remainingNum = document.querySelector("span")
const message = document.querySelector(".message")
const playAgain = document.querySelector(".play-again")
const word = "magnolia"
const guessedLetters = []

const wordPlaceholder = function(word){
    const letterPlaceholder = []
    for (const letter of word){
        letterPlaceholder.push("●")
        wordInProgress.innerText = letterPlaceholder.join("")
    }
}
wordPlaceholder(word)

guessBtn.addEventListener("click", function(e){
    e.preventDefault()
    const capturedInput = input.value
    console.log(capturedInput)
    input.value = ""
    message.innerText= ""
    const validGuess = validateInput(capturedInput)
    if (validGuess){
        makeGuess(capturedInput)
    }
})

const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0){
        message.innerText = "Please enter at least one letter."
    }
    else if (input.length > 1){
        message.innerText = "Please enter only one letter."
    }
    else if (!input.match(acceptedLetter)){
        message.innerText = "Not sure what that was. Please try again with a letter."
    }
    else {
        return input
        }
}

const makeGuess = function(capturedInput){
    capturedInput = capturedInput.toUpperCase()
    if (guessedLetters.includes(capturedInput)){
        message.innerText = "You already guessed that letter. Try again."
    }
    else {
        guessedLetters.push(capturedInput)
        console.log(guessedLetters)
        guessedLettersPile()
        updateWordInProgress(guessedLetters)
}
}

const guessedLettersPile = function(){
    guessedLettersList.innerHTML = ""
    for (const letter of guessedLetters){
        const li = document.createElement("li")
        li.innerText = letter
        guessedLettersList.append(li)
    }
}

const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase()
    const wordArray = wordUpper.split("")
    const revealWord = []
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealWord.push(letter)
        }
        else {revealWord.push("●")}
    }
    wordInProgress.innerText= revealWord.join("")
    playerWon()
}

const playerWon = function(){
    if (word.toUpperCase === wordInProgress.innerText){
        message.classList.add("win")
        message.innerHTML=`<p class="highlight"> You guessed the correct word! Congrats!</p>`
    }
}