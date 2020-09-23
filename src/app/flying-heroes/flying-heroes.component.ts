import { Component, OnInit } from '@angular/core';
import { HEROES } from '../hero';

@Component({
  selector: 'app-flying-heroes',
  templateUrl: './flying-heroes.component.html',
  styleUrls: ['./flying-heroes.component.css']
})
export class FlyingHeroesComponent implements OnInit {

  heroes: any[] = [];
  canFly = true;
  constructor() { }

  addHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    let hero = { name, canFly: this.canFly };
    this.heroes.push(hero);
    //this.heroes = this.heroes.concat(hero);
  }

  reset() { this.heroes = HEROES.slice(); }

  ngOnInit(): void {
  }

}
