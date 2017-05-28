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

	constructor(private router: Router) {
		
	 }

	ngOnInit() { }

	onSubmit(): void {
		this.router.navigate(['/round', this.playerOne, this.playerTwo]);
	}

}
