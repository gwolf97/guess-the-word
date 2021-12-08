const guessedLetters = document.querySelector("ul")
const guessBtn = document.querySelector(".guess")
const input = document.querySelector("input")
const wordInProgress = document.querySelector(".word-in-progress")
const remaining = document.querySelector(".remaining")
const remainingNum = document.querySelector("span")
const message = document.querySelector(".message")
const playAgain = document.querySelector(".play-again")
const word = "magnolia"

const wordPlaceHolder = function(word){
    const letterPlaceHolder = [];
    for (const letter of word){
        letterPlaceHolder.push("●")
        wordInProgress.innerText = letterPlaceHolder.join("")
    }
}

wordPlaceHolder(word)

guessBtn.addEventListener("click", function(e){
    e.preventDefault();
    const captureInput = input.value;
    console.log(captureInput);
    input.value = "";
})