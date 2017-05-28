import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	playerOne: String;
	playerTwo: String;
	errorMessage: String = undefined;

	constructor(private router: Router) {
		
	 }

	ngOnInit() { }

	onSubmit(): void {
		if (this.playerOne.toLowerCase().trim() === this.playerTwo.toLowerCase().trim()) {
			this.errorMessage = 'You cannot play against yourself!';
		} else {
			this.router.navigate(['/round', this.playerOne, this.playerTwo]);
		}
	}

}
