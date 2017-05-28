import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-round',
	templateUrl: './round.component.html',
	styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

	players: {
		id: String, 
		name: String, 
		points: number, 
		currentPoints: number,
		playerNumber: number,
	}[];
	existingMoves: {
		"move": String,
		"kills": String
	}[];
	currentPlayer: number;
	currentRound: number;
	rounds: {
		roundNumber: number,
		playerOneMove: String,
		playerTwoMove: String,
		winner: String
	}[] = [];
	lastSelectedMove: String;

	constructor() {
		this.createNewRound(1);
		this.currentPlayer = 1;
		this.existingMoves = [
			{
				"move": "Rock",
				"kills": "Scissors"
			},
			{
				"move": "Scissors",
				"kills": "Paper"
			},
			{
				"move": "Paper",
				"kills": "Rock"
			}
		];
	 }

	ngOnInit() {
		console.log(this.currentPlayer);
		console.log(this.currentRound);
		console.log(this.players);
	}

	/*
	 * Checks if player two played, and continues the round,
	 * or starts a new one
	 */
	nextPlayerOrRound(): void {
		if (!this.rounds[this.currentRound - 1].playerTwoMove) { //if player two did not play, round continues
			this.rounds[this.currentRound - 1].playerOneMove = this.lastSelectedMove;
			this.currentPlayer = 2;
		} else { //round finished, find winner and start a new one or finish
			this.rounds[this.currentRound - 1].playerTwoMove = this.lastSelectedMove;
			this.checkRoundWinner();
			this.nextRoundOrFinish();
		}
	}

	nextRoundOrFinish(): void {
		
		//check if round has not reached 3
		if (this.currentRound < 3) { //next round, add points
			//create new round
			this.createNewRound(this.currentRound + 1);
			this.currentPlayer = 1;
		} else { //if more than third round, check if tie or not
			if (this.players[0].currentPoints === this.players[1].currentPoints) { //if tie, continue
				//create new round
				this.createNewRound(this.currentRound + 1);
				this.currentPlayer = 1;
			} else { //not tie, there is a winner
				if (this.players[0].currentPoints > this.players[1].currentPoints) { //player 1 won
					//save data

					//go to winner page
				} else { //player 2 won

				}
			}
		}
	}

	/*
	 * Creates a new round, and adds it to the rounds array
	 */
	createNewRound(roundNumber: number) : void {
		let newRound = {
			roundNumber: roundNumber,
			playerOneMove: undefined,
			playerTwoMove: undefined,
			winner: undefined
		} 
		this.rounds.push(newRound);
		//update current round number
		this.currentRound = roundNumber;
	}

	/*
	 * Checks who won the round
	 */
	checkRoundWinner() : void {
		let round = this.rounds[this.currentRound - 1];
		let player1MoveObject = this.getMoveChosen(1);

		if (player1MoveObject[0].kills === round.playerTwoMove) { //player 1 won round
			round.winner = this.players[0].name;
			this.players[0].currentPoints++;
		} else { //player 1 did not win, check if player 2 won
			let player2MoveObject = this.getMoveChosen(2);

			if (player2MoveObject[0].kills === round.playerOneMove) {
				round.winner = this.players[1].name;
				this.players[1].currentPoints++;
			} else { //tie
				round.winner = 'tie';
			}
		}


	}

	/*
	 * Gets the move that the player has chosen
	 * from the existing moves list to know what
	 * move it kills
	 */
	getMoveChosen(playerNumber : number) : Object {
		let round = this.rounds[this.currentRound - 1];
		return this.existingMoves.filter(function(moveObj){
			if (playerNumber === 1) return moveObj.move === round.playerOneMove;
			else return moveObj.move === round.playerTwoMove;
		});
	}

}
