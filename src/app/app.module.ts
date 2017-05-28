import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RoundComponent } from './round/round.component';
import { HomeComponent } from './home/home.component';
import { WinnerComponent } from './winner/winner.component';

import { PlayersService } from './services/players.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'round/:playerOne/:playerTwo',
    component: RoundComponent
  },
  {
    path: 'winner',
    component: WinnerComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RoundComponent,
    HomeComponent, 
    WinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ PlayersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
