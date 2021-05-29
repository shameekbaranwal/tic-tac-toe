//The AI will communicate with the board through this file.
//All the minimax logic will be located here.

function getNextMove(squares, letters) {
	//global DIFFICULTY will store whether the minimax algorithm will be used or will the computer play random moves
	if (DIFFICULTY === 'EASY') {
		//helper function that gives us an array of all the playable spots in sq
		function getEmptySpots(sq) {
			const s = []
			for (let i in sq) {
				if (!sq[i]) s.push(i)
			}
			return s
		}
		const emptySpots = getEmptySpots(squares)
		//these two lines will make an AI that plays random squares
		const p = emptySpots[Math.floor(Math.random() * emptySpots.length)]
		return p
	}

	let bestScore = -Infinity
	let move = null

	//letters = ['X', 'O'] if user is X and AI is O, and vice versa.

	squares.forEach((square, index) => {
		if (square === '') {
			squares[index] = letters[1]
			score = minimax(squares, 0, false)
			//AI has played for its spot, so the minmax call is NOT for the maximizing player now, it's for the User, hence false
			squares[index] = '' //reset the mutation to prevent bugs
			if (score > bestScore) {
				bestScore = score
				move = index //this would be the move with the maximum score associated with it (which would be just 1 in this case, with no consideration for the length of the path either. But this same algorithm can be reused in connect-four)
			}
		}
	})

	console.log(`AI has played ${move}`)
	return move

	function minimax(sq, depth, isMaximizing) {
		const winner = checkIfWon(sq)
		const tie = checkIfTie(sq, winner)
		if (tie) return 0
		if (winner === letters[0]) return -1
		if (winner === letters[1]) return +1

		//"O" / AI is the maximising player
		if (isMaximizing) {
			let bestScore = -Infinity
			sq.forEach((square, index) => {
				if (square === '') {
					sq[index] = letters[1]
					bestScore = Math.max(
						bestScore,
						minimax(sq, depth + 1, false),
					)
					sq[index] = '' //reset the mutation to prevent bugs
				}
			})
			return bestScore
			//"X" / User is the minimising player
		} else {
			let bestScore = Infinity
			sq.forEach((square, index) => {
				if (square === '') {
					sq[index] = letters[0]
					bestScore = Math.min(
						bestScore,
						minimax(sq, depth + 1, true), //true because User has played, so time for Player.
					)
					sq[index] = '' //reset the mutation to prevent bugs
				}
			})
			return bestScore
		}
	}
}
