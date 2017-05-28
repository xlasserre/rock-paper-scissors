import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlayersService } from '../services/players.service';

@Component({
	selector: 'app-round',
	templateUrl: './round.component.html',
	styleUrls: ['./round.component.css'],
	providers: [PlayersService]
})
export class RoundComponent implements OnInit {

	playersNames: String[];
	players: {
		id: String, 
		name: String, 
		points: number, 
		currentPoints: number,
		playerNumber: number,
	}[] = [];
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

	constructor(private route: ActivatedRoute,
				private playersService: PlayersService) {
		this.players = [ {
			id: undefined, 
			name: '', 
			points: undefined, 
			currentPoints: 0,
			playerNumber: 1,
		}, {
			id: undefined, 
			name: '', 
			points: undefined, 
			currentPoints: 0,
			playerNumber: 2,
		} ];
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
		this.route.params.subscribe(params => {
			let p1 = params['playerOne'];
			let p2 = params['playerTwo'];

			this.playersService.getPlayer(p1)
				.subscribe(
					data => {
						let newPlayer = {
							playerNumber: 1,
							currentPoints: 0,
						};
						console.log(data);
					},
					error => { console.log(error); }
				);
		});
		console.log(this.playersNames);
		console.log(this.currentPlayer);
		console.log(this.currentRound);
		console.log(this.players);
		console.log(this.existingMoves);
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
			if (this.players[0]) {
				round.winner = this.players[0].name;
				this.players[0].currentPoints++;
			}
		} else { //player 1 did not win, check if player 2 won
			let player2MoveObject = this.getMoveChosen(2);

			if (player2MoveObject[0].kills === round.playerOneMove) {
				if (this.players[1]) {
					round.winner = this.players[1].name;
					this.players[1].currentPoints++;
				}
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
