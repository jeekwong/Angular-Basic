import { Pipe, PipeTransform } from '@angular/core';
import { Flyer, Hero } from './hero';

@Pipe({
  name: 'flyingHeroes',
  pure: false
})
export class FlyingHeroesPipe implements PipeTransform {

  transform(allHeroes: Flyer[]) {
    return allHeroes.filter(hero => hero.canFly);
  }

}
