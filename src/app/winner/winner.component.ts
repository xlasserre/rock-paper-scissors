import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-winner',
	templateUrl: './winner.component.html',
	styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

	gameWinner: String;

	constructor(private route: ActivatedRoute) {
		
	 }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.gameWinner = params['gameWinner'];
		});
	}

}