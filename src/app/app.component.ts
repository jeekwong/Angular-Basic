import { Component, OnInit } from '@angular/core';
import { AdItem } from './ad-banner/ad-item';
import { AdService } from './ad-banner/ad.service';
import { Hero } from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

  ads: AdItem[];

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}
