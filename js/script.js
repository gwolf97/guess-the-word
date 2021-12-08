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
    }
}