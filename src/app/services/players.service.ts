import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class PlayersService {
    
	private playersNames = new Subject<String[]>();
	private winner = new Subject<string>();

	playersNames$ = this.playersNames.asObservable();
	winner$ = this.winner.asObservable();

	publishPlayers(data: String[]) {
		console.log(data);
		this.playersNames.next(data);
	
	}
	publishWinner(data: string) {
		this.winner.next(data);
	}
}