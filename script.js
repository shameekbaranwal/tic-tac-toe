//DOM cache
const pvpButton = document.querySelector("#pvp")
const aiButton = document.querySelector("#ai")
const onlineButton = document.querySelector("#online")
const subheading = document.querySelector("#subheading")

const game = document.querySelector(`.game`)
const board = document.querySelector(".board")
const modeChoice = document.querySelector(`#mode-choice`)
const status = document.querySelector(`#status`)
const squares = document.querySelectorAll(`.square`)
const replay = document.querySelector(`#replay`)
const easy = document.querySelector("#easy")
const hard = document.querySelector("#hard")
const chooseText = document.querySelector(".choose-p")
const choiceDivs = document.querySelectorAll(".choose")
let themeButton = document.querySelector(".theme-button")

let DIFFICULTY = null

//Globals to control the state and info of the game
let winner = null
let tie = false
let xIsNext = true
let MODE = 0

fadeIn(pvpButton)
fadeIn(aiButton)
fadeIn(onlineButton)
disappear(easy)
disappear(hard)
disappear(chooseText)
disappear(game)

//Event listeners for the buttons on the home page to select modes
pvpButton.addEventListener("click", () => {
	MODE = "PLAYER"
	modeChoice.innerHTML = "Player vs Player"
	switchMode()
	updateGame()
})

aiButton.addEventListener("click", () => {
	MODE = "AI"
	switchMode(true)
})

easy.addEventListener("click", () => {
	modeChoice.innerHTML = "Player vs AI"
	DIFFICULTY = "EASY"
	disappear(easy)
	disappear(hard)
	disappear(chooseText)
	fadeIn(game)
	updateGame()
})

hard.addEventListener("click", () => {
	modeChoice.innerHTML = "Player vs AI"
	DIFFICULTY = "HARD"
	disappear(easy)
	disappear(hard)
	disappear(chooseText)
	fadeIn(game)
	updateGame()
})

//To transition from homepage to the game
function switchMode(flag) {
	disappear(pvpButton, true)
	disappear(aiButton, true)
	disappear(onlineButton, true)

	setTimeout(() => {
		disappear(subheading)
		if (flag === undefined) {
			choiceDivs.forEach((div) => div.parentElement.removeChild(div))
			fadeIn(game)
		} else if (flag === 1) {
			fadeIn(game)
			fadeIn(status)
			fadeIn(modeChoice)
			disappear(board, true)
			disappear(replay)
		} else {
			fadeIn(easy)
			fadeIn(hard)
			fadeIn(chooseText)
			// fadeIn(status)
			// fadeIn(modeChoice)
		}
	}, 150)
}

//button to restart the game
replay.addEventListener("click", () => {
	squares.forEach((sq) => {
		sq.innerHTML = ""
	})
	winner = null
	tie = null
	xIsNext = true
	updateGame()
})

//event listener for each button, coupled with a function to re-render game info upon click
squares.forEach((square) => {
	square.addEventListener("click", () => {
		if (square.innerHTML || winner) return
		square.innerHTML = xIsNext ? "X" : "O"
		xIsNext = !xIsNext
		updateGame()
		if (MODE === "AI" && !winner && !tie) {
			runAI()
		}
	})
})

//function to re-render game-info whenever any button is clicked
function updateGame() {
	sq = getSquaresArray()
	winner = checkIfWon(sq)
	tie = checkIfTie(sq, winner)
	status.innerHTML = winner ? `${winner} wins!` : xIsNext ? `X` : `O`
	if (tie) status.innerHTML = "tie"
}

//helper function to properly call the AI Player
function runAI() {
	setTimeout(() => {
		sq = getSquaresArray()
		aiMove = xIsNext ? ["O", "X"] : ["X", "O"]
		squares[getNextMove(sq, aiMove)].innerHTML = aiMove[1]

		xIsNext = !xIsNext

		updateGame()
	}, 300)
}

//function to help with animation -
function fadeIn(el, setDisplayTo) {
	el.classList.remove("off")
	el.classList.add("fade-in")
	setTimeout(() => {
		el.style.display = setDisplayTo || "block"
		el.classList.remove("fade-in")
	}, 200)
}

function disappear(el, toDelete) {
	el.classList.remove("fade-in")
	el.classList.add("off")
	setTimeout(() => {
		el.style.display = "none"
		el.classList.remove("off")
		if (toDelete) el.parentElement.removeChild(el)
	}, 200)
}

//helper functions
function getSquaresArray() {
	const sq = []
	squares.forEach((square) => {
		sq.push(square.innerHTML)
	})
	return sq
}

function checkIfWon(sq) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],

		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],

		[0, 4, 8],
		[2, 4, 6],
	]

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
			return sq[a]
		}
	}

	return null
}

//helper function to check for tie
function checkIfTie(sq, winner) {
	if (winner !== null) return false

	for (let i = 0; i < sq.length; i++) {
		square = sq[i]
		if (square === "") return false
	}

	return true
}

//adding a button for future updates
onlineButton.addEventListener("click", () => {
	MODE = "ONLINE"
	modeChoice.innerHTML = "Player vs Player (ONLINE)"
	status.innerHTML = "Coming soon."
	switchMode(1)
})

//for themes:
themeButton.addEventListener("click", () => {
	themeButton.style.cssText = `
	animation: kk 1 200ms ease-in-out;
	`
	setTimeout(() => {
		themeButton.style.cssText = `transform: translate(-125%, -100%);`
	}, 200)
})
