const pvpButton = document.querySelector("#pvp")
const aiButton = document.querySelector("#ai")
const subheading = document.querySelector("#subheading")

const game = document.querySelector(`.game`)
const modeChoice = document.querySelector(`#mode-choice`)
const status = document.querySelector(`#status`)
const squares = document.querySelectorAll(`.square`)
const replay = document.querySelector(`#replay`)

let winner = null
let tie = false

let xIsNext = true

let MODE = 0

pvpButton.addEventListener("click", () => {
	MODE = "PLAYER"
	modeChoice.innerHTML = "Player vs Player"
	switchMode()
	runGame()
})

aiButton.addEventListener("click", () => {
	MODE = "AI"
	modeChoice.innerHTML = "Player vs AI"
	switchMode()
	runGame()
})

function switchMode() {
	subheading.classList.add("off")
	pvpButton.classList.add("off")
	aiButton.classList.add("off")

	setTimeout(() => {
		subheading.parentElement.removeChild(subheading)
		pvpButton.parentElement.removeChild(pvpButton)
		aiButton.parentElement.removeChild(aiButton)
		game.classList.add("on")
	}, 100)
}

replay.addEventListener("click", () => {
	squares.forEach((sq) => {
		sq.innerHTML = ""
	})
	winner = null
	tie = null
	xIsNext = true
	runGame()
})

squares.forEach((square) => {
	square.addEventListener("click", () => {
		if (square.innerHTML || winner) return
		square.innerHTML = xIsNext ? "X" : "O"
		xIsNext = !xIsNext
		winner = checkWinner()
		tie = checkTie()
		runGame()
	})
})

function runGame() {
	if (MODE === "PLAYER") {
		status.innerHTML = winner ? `${winner} wins!` : xIsNext ? `X` : `O`
		if (tie) status.innerHTML = "tie"
	}
}

function checkWinner() {
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
		if (
			squares[a].innerHTML &&
			squares[a].innerHTML === squares[b].innerHTML &&
			squares[a].innerHTML === squares[c].innerHTML
		)
			return squares[a].innerHTML
	}

	return null
}

function checkTie() {
	if (winner !== null) return false

	for (let i = 0; i < squares.length; i++) {
		square = squares[i]
		if (square.innerHTML === "") {
			console.log("bruh")
			return false
		}
	}

	return true
}
