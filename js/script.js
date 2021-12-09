const guessedLettersList = document.querySelector("ul")
const guessBtn = document.querySelector(".guess")
const input = document.querySelector("input")
const wordInProgress = document.querySelector(".word-in-progress")
const remaining = document.querySelector(".remaining")
const remainingNum = document.querySelector("span")
const message = document.querySelector(".message")
const playAgain = document.querySelector(".play-again")
let word = "magnolia"
let guessedLetters = []
let remainingGuesses = 8;

const getWord = async function(){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length)
    word = wordArray[randomIndex].trim()
    wordPlaceholder(word)
}
getWord()

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
        updateGuessesRemaining(capturedInput)
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

const updateGuessesRemaining = function (capturedInput) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(capturedInput)) {
      message.innerText = `Sorry, the word has no ${capturedInput}.`;
      remainingGuesses = remainingGuesses - 1;
    } else {
      message.innerText = `Good guess! The word has the letter ${capturedInput}.`;
      playerWon()
    }
  
    if (remainingGuesses === 0) {
      message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
      remainingNum.innerHTML = `0 guessess`
      startOver()
    } else if (remainingGuesses === 1) {
      remainingNum.innerText = `${remainingGuesses} guess`;
    } else {
      remainingNum.innerText = `${remainingGuesses} guesses`;
    }
  };


const playerWon = function(){
    if (word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win")
        message.innerHTML =`<p class="highlight"> You guessed the correct word! Congrats!</p>`
        startOver()
    }
}

const startOver = function(){
    guessBtn.classList.add("hide")
    remaining.classList.add("hide")
    guessedLettersList.classList.add("hide")
    playAgain.classList.remove("hide")
}

playAgain.addEventListener("click", function(){
    message.classList.remove("win")
    message.innerText = ""
    remainingGuesses = 8
    guessedLetters = []
    remainingNum.innerText = `${remainingGuesses} guesses`
    remaining.classList.remove("hide")
    guessedLettersList.remove("hide")
    guessBtn.classList.remove("hide")
    playAgain.classList.add("hide")
    getWord()
})