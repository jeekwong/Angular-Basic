import { Component } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

  color: string;

  addHero(newHero: string) {
    if(newHero) {
      this.heroes.push(newHero);
    }
  }

  birthday = new Date(1990, 1, 5);

  power = 5;
  factor = 1;

}
